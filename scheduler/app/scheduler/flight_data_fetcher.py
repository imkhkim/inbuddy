import requests
import pandas as pd

from datetime import datetime, timedelta
from bs4 import BeautifulSoup
from app.logger.logger import log
from app.producer.producer import live_flight_producer
from app.redis.redis import redis
from config import FLIGHT_API_DOMAIN, FLIGHT_DATA_COLUMNS, LIVE_FLIGHT_TOPIC, \
    FLIGHTS_FETCH_SIZE, resource_lock

PREFIX = "ddrivetip('"
SUFFIX = "에 의한"

_DATE_FORMAT = "%Y%m%d"


def _request(date_format, dep_arr='D'):
    def _extract(row):
        row_data = [date_format]
        for i in range(0, len(row), 2):
            string = str(row[i])
            c = BeautifulSoup(string, 'html.parser')
            text = c.text.strip()
            row_data.append(text)

            if i == 14:
                success = '출발' if dep_arr == 'D' else '도착'
                row_data.append(string[
                                string.find(PREFIX) + len(PREFIX):string.find(
                                        SUFFIX)] if text != success else '')

        map(lambda x: x.encode('cp949', 'ignore').decode('cp949'), row_data)
        return row_data

    cat = pd.DataFrame(columns=FLIGHT_DATA_COLUMNS)

    params = {"gubun": "c_getList", "depArr": dep_arr,
              "current_date": date_format,
              "airport": "RKSI", "al_icao": "", "fp_id": ""}

    url = FLIGHT_API_DOMAIN + '?' + '&'.join(
            [f"{key}={value}" for key, value in params.items()])

    response = requests.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')

    indent_one = soup.select("FORM > table > tr > TD > table > tr > td")
    indent_two = soup.select("FORM > table > tr > TD > table > td")
    tds = soup.select("FORM > table > td")

    # append rows
    loc = len(cat)
    cat.loc[loc] = _extract(indent_one)
    cat.loc[loc].apply(lambda row: row.encode("cp949").decode("cp949"))
    loc += 1
    cat.loc[loc] = _extract(indent_two)
    cat.loc[loc].apply(lambda row: row.encode("cp949").decode("cp949"))
    loc += 1
    for index in range(0, len(tds), 15):
        cat.loc[loc] = _extract(tds[index:index + 15])
        cat.loc[loc].apply(lambda row: row.encode("cp949").decode("cp949"))
        loc += 1

    cat = cat.reset_index(drop=True)
    return cat.to_json(orient="records", force_ascii=False)


def fetch(date=datetime.today()):
    date_format = date.strftime(_DATE_FORMAT)

    response_departure = _request(date_format)
    # response_arrive = request(date, 'A')

    if response_departure is None:
        log.warning("Failed to Fetch Flight(Departure) Data")
        return

    log.info("Fetched Flight(Departure) Data")

    with resource_lock:
        redis.select(redis.FLIGHTS_API)
        redis.set(date_format + 'D', response_departure)

    live_flight_producer.produce(topic=LIVE_FLIGHT_TOPIC,
                                 value=response_departure,
                                 key=date_format + 'D')


def fetch_scheduled(start_date=datetime.now() + timedelta(
        days=datetime.now().hour * FLIGHTS_FETCH_SIZE + 1),
        fetch_size=FLIGHTS_FETCH_SIZE):
    with resource_lock:
        redis.select(redis.SCHEDULED_FLIGHTS_API)
        redis.delete(datetime.today().strftime(_DATE_FORMAT) + 'D')

    date = start_date
    end_date = start_date + timedelta(days=fetch_size)

    log.debug(
            f"Trying to Fetch Scheduled Flight(Departure) Data Between {start_date.strftime(_DATE_FORMAT)} and {end_date.strftime(_DATE_FORMAT)}")

    while date < end_date:
        date_format = date.strftime(_DATE_FORMAT)

        response_departure = _request(date_format)

        with resource_lock:
            redis.select(redis.SCHEDULED_FLIGHTS_API)
            redis.set(date_format + 'D', response_departure)

        if response_departure is None:
            log.debug(
                    f"No Scheduled Flight(Departure) Data After {date_format}")
            break

        date = date + timedelta(days=1)

    if start_date < date:
        log.info(
                f"Fetched Scheduled Flight(Departure) Data Between {start_date.strftime(_DATE_FORMAT)} and {date.strftime(_DATE_FORMAT)}")
    else:
        log.info(
                f"No Scheduled Flight(Departure) Data After {start_date.strftime(_DATE_FORMAT)}")
