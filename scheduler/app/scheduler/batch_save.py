import json
from datetime import datetime, timedelta

from app.logger.logger import log
from app.producer.producer import batch_flight_producer, batch_weather_producer
from app.redis.redis import redis


def flight_save():
    redis.select(redis.FLIGHTS_API)

    old_flight_data_key = (datetime.now() - timedelta(days=2)).strftime(
            "%Y%m%d") + 'D'

    old_flight_data = redis.get(old_flight_data_key)
    old_flight_data = {} if old_flight_data is None else json.loads(
            old_flight_data)

    batch_flight_producer.produce(topic="batch_flight",
                                  value=json.dumps(old_flight_data),
                                  key=old_flight_data_key)

    redis.delete(old_flight_data_key)

    log.info(f"Old Flight Data: {old_flight_data_key} Deleted From Redis")


def weather_save():
    redis.select(redis.WEATHERS_BATCH)

    today = datetime.combine(datetime.today(), datetime.min.time())
    yesterday = today - timedelta(days=1)

    old_weather_data_keys = []
    old_weather_data_key = yesterday.strftime("%Y%m%d")
    old_weather_data = []

    date = yesterday
    while date < today:
        data_key = date.strftime("%Y%m%d%H%M")
        data = redis.get(data_key)

        if data is not None:
            data = data.decode("utf-8")
            old_weather_data.append(data)
            old_weather_data_keys.append(data_key)

        date += timedelta(minutes=1)

    if old_weather_data:
        batch_weather_producer.produce(topic="batch_weather", value='\n'.join(
                old_weather_data).encode(), key=old_weather_data_key)

    redis.delete_many(*old_weather_data_keys)

    log.info(f"Old Weather Data: {old_weather_data_key} Deleted From Redis")


def save():
    flight_save()
    weather_save()
