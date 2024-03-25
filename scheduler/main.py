import os

import uvicorn

from dotenv import load_dotenv
from app.scheduler.scheduler import scheduler
from app.redis.redis import redis
from app.logger.logger import log
from app.scheduler.flight_data_fetcher import fetch as flight_fetch
from app.scheduler.weather_data_fetcher import fetch as weather_fetch
from app.scheduler.batch_save import save
from app.scheduler import weather_data_fetcher
from app.producer.producer import live_weather_producer, live_flight_producer, \
    batch_flight_producer, batch_weather_producer
from app.app import app

if __name__ == "__main__":
    load_dotenv()

    REDIS_HOST = os.getenv("REDIS_HOST")
    REDIS_PORT = os.getenv("REDIS_PORT")
    weather_data_fetcher.API_KEY = os.getenv("WEATHER_API_KEY")

    redis.set_connection(REDIS_HOST, REDIS_PORT)

    KAFKA_HOST = os.getenv("KAFKA_HOST")
    KAFKA_FLIGHT_BROKER_PORT = os.getenv("KAFKA_FLIGHT_BROKER_PORT")
    KAFKA_WEATHER_BROKER_PORT = os.getenv("KAFKA_WEATHER_BROKER_PORT")

    live_flight_producer.set_producer(
            server=f"{KAFKA_HOST}:{KAFKA_FLIGHT_BROKER_PORT}",
            client_id="live_flight")
    live_weather_producer.set_producer(
            server=f"{KAFKA_HOST}:{KAFKA_WEATHER_BROKER_PORT}",
            client_id="live_weather")
    batch_flight_producer.set_producer(
            server=f"{KAFKA_HOST}:{KAFKA_FLIGHT_BROKER_PORT}",
            client_id="batch_weather")
    batch_weather_producer.set_producer(
            server=f"{KAFKA_HOST}:{KAFKA_WEATHER_BROKER_PORT}",
            client_id="batch_weather")

    log.info("Starting scheduler...")
    scheduler.create("flights_departure", flight_fetch, trigger="cron",
                     minute='*')

    scheduler.create("weather", weather_fetch, trigger="cron", minute='*')

    scheduler.create("batch_save", save, trigger="cron", hour=0, minute=0)

    scheduler.start("flights_departure")
    scheduler.start("weather")
    scheduler.start("batch_save")

    log.info("Scheduler started.")

    uvicorn_log_config = uvicorn.config.LOGGING_CONFIG
    uvicorn_log_config["formatters"]["default"]["fmt"] \
        = uvicorn_log_config["formatters"]["access"]["fmt"] \
        = log.format

    uvicorn_log_config["formatters"]["access"]["datefmt"] \
        = uvicorn_log_config["formatters"]["default"]["datefmt"] \
        = log.date_format

    uvicorn.run(app)
