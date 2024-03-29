import json
import requests

from datetime import datetime, timedelta
from app.logger.logger import log
from app.producer.producer import live_weather_producer
from app.redis.redis import redis
from config import WEATHER_API_DOMAIN, WEATHER_DATA_COLUMNS, WEATHER_API_KEY, \
    LIVE_WEATHER_TOPIC, resource_lock

_last_received = None
_FORMAT = "%Y%m%d%H%M"


def _parse_json(text):
    result = []
    for line in text.split('\n'):
        line = line.strip()
        if line is None or len(line) == 0:
            break
        if line.startswith('#'):
            continue

        data = line.split()
        record = {column: int(value) for column, value in
                  zip(WEATHER_DATA_COLUMNS, data)}

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
    minutes = 3 if _last_received is None else round(
            (now - _last_received).total_seconds() / 60) - 1
    log.debug(f"Weather Data Delta Time: {minutes} minutes")

    params = {"tm": now.strftime(_FORMAT), "dtm": minutes, "stn": 113,
              "help": 0,
              "authKey": WEATHER_API_KEY}

    url = WEATHER_API_DOMAIN + '?' + '&'.join(
            [f"{key}={value}" for key, value in params.items()])

    response = requests.get(url).text

    csv_data = _parse_csv(response)
    json_data = _parse_json(response)

    return csv_data, json_data


def fetch():
    global _last_received

    now = datetime.now().replace(second=0, microsecond=0)

    csv_data, json_data = _request(now)

    if csv_data is None or json_data is None:
        log.warning("Failed to Fetch Weather Data")
        return

    log.info("Fetched Weather Data")

    with resource_lock:
        redis.select(redis.WEATHERS_BATCH)
        for line in csv_data:
            redis.set(line[1], ','.join(line))

        redis.select(redis.WEATHERS_API)
        for document in json_data:
            dump = json.dumps(document, ensure_ascii=False)
            redis.set(document["TM"], dump)

            key = str(document["TM"])
            _last_received = datetime.strptime(key, _FORMAT)
            live_weather_producer.produce(topic=LIVE_WEATHER_TOPIC,
                                          value=dump,
                                          key=key)
