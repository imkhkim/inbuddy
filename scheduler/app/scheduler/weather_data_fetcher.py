import io

import requests
import json
import csv

from datetime import datetime
from app.redis.redis import redis
from app.logger.logger import log
from app.producer.producer import live_weather_producer

DOMAIN = "https://apihub.kma.go.kr/api/typ01/url/amos.php"

COLUMNS = ["S", "TM", "L_VIS", "R_VIS", "L_RVR", "R_RVR", "CH_MIN", "TA", "TD",
           "HM", "PS", "PA", "RN", "예비1", "예비2", "WD02", "WD02_MAX", "WD02_MIN",
           "WS02", "WS02_MAX", "WS02_MIN", "WD10", "WD10_MAX", "WD10_MIN",
           "WS10", "WS10_MAX", "WS10_MIN"]

global API_KEY


def test():
    global API_KEY
    API_KEY = "_n1x6n-5Sji9cep_uVo4Uw"
    redis.set_connection("localhost", 6379)
    live_weather_producer.set_producer("localhost:9093", "live_weather")


def _parse_json(text):
    result = []
    for line in text.split('\n'):
        line = line.strip()
        if line is None or len(line) == 0:
            break
        if line.startswith('#'):
            continue

        data = line.split()
        record = {column: int(value) for column, value in zip(COLUMNS, data)}

        result.append(record)

    return result


def _parse_csv(text):
    result = []
    for line in text.split('\n'):
        line = line.strip()
        if line is None or len(line) == 0:
            break
        if line.startswith('#'):
            continue

        data = line.split()
        result.append(data)

    return result


def _request(now):
    params = {
        "tm": now,
        "dtm": 3,
        "stn": 113,
        "help": 0,
        "authKey": API_KEY,
    }

    url = DOMAIN + '?' + '&'.join(
            [f"{key}={value}" for key, value in params.items()])

    response = requests.get(url).text

    csv_data = _parse_csv(response)
    json_data = _parse_json(response)

    return csv_data, json_data


def fetch():
    now = datetime.now().strftime("%Y%m%d%H%M")

    csv_data, json_data = _request(now)

    if csv_data is None or json_data is None:
        log.warning("Failed to Fetch Weather Data")
        return

    for document in json_data:
        redis.select(redis.WEATHERS_API)
        redis.set(document["TM"],
                  json.dumps(document, indent=4, ensure_ascii=False))

    for line in csv_data:
        redis.select(redis.WEATHERS_BATCH)
        redis.set(line[1], ','.join(line))

    log.info("Fetched Weather Data")

    live_weather_producer.produce(topic="live_weather",
                                  value=json.dumps(json_data))


test()
fetch()
