import json
from datetime import datetime

import requests

from app.logger.logger import log
from app.producer.producer import live_weather_producer
from app.redis.redis import redis
from config import WEATHER_API_DOMAIN, WEATHER_DATA_COLUMNS, WEATHER_API_KEY


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
    params = {"tm": now, "dtm": 3, "stn": 113, "help": 0,
              "authKey": WEATHER_API_KEY, }

    url = WEATHER_API_DOMAIN + '?' + '&'.join(
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
                                  value=json.dumps(json_data), key=now)
