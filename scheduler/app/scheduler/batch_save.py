import json
from datetime import datetime, timedelta

from config import resource_lock, BATCH_FLIGHT_TOPIC, BATCH_WEATHER_TOPIC
from app.logger.logger import log
from app.producer.producer import batch_flight_producer, batch_weather_producer
from app.redis.redis import redis


def flight_save():
    old_flight_data_key = (datetime.now() - timedelta(days=2)).strftime(
            "%Y%m%d") + 'D'

    with resource_lock:
        redis.select(redis.FLIGHTS_API)
        old_flight_data = redis.get(old_flight_data_key)
        redis.delete(old_flight_data_key)

        log.info(f"Old Flight Data: {old_flight_data_key} Deleted From Redis")

    old_flight_data = {} if old_flight_data is None else json.loads(
            old_flight_data)

    old_flight_csv_data = ""
    for document in old_flight_data:
        old_flight_csv_data += ','.join(list(document.values())) + '\n'

    batch_flight_producer.produce(topic=BATCH_FLIGHT_TOPIC,
                                  value=old_flight_csv_data,
                                  key=old_flight_data_key)


def weather_save():
    yesterday = datetime.combine(datetime.today() - timedelta(days=1),
                                 datetime.min.time())
    date = yesterday - timedelta(days=1)

    old_weather_data_key = date.strftime("%Y%m%d")
    old_weather_data = []

    with resource_lock:
        redis.select(redis.WEATHERS_BATCH)

        while date < yesterday:
            data_key = date.strftime("%Y%m%d%H%M")
            data = redis.get(data_key)
            redis.delete(data_key)

            if data is not None:
                data = data.decode("utf-8")
                old_weather_data.append(data)

            date += timedelta(minutes=1)

        log.info(f"Old Weather Data: {old_weather_data_key} Deleted From Redis")

    if old_weather_data:
        batch_weather_producer.produce(topic=BATCH_WEATHER_TOPIC,
                                       value='\n'.join(
                                               old_weather_data).encode(),
                                       key=old_weather_data_key)


def save():
    flight_save()
    weather_save()
