import os

import uvicorn
from uvicorn.config import LOGGING_CONFIG

from app.logger.logger import log
from dotenv import load_dotenv
from app.scheduler.scheduler import scheduler
from app.redis.redis import redis
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
    KAFKA_BROKER_PORTS = os.getenv("KAFKA_BROKER_PORTS")

    servers = ','.join(
            [f"{KAFKA_HOST}:{PORT}" for PORT in KAFKA_BROKER_PORTS.split(',')])

    live_flight_producer.set_producer(
            servers=servers,
            client_id="live_flight")
    live_weather_producer.set_producer(
            servers=servers,
            client_id="live_weather")
    batch_flight_producer.set_producer(
            servers=servers,
            client_id="batch_weather")
    batch_weather_producer.set_producer(
            servers=servers,
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

    log_config = {
        "version": 1,
        "formatters": {
            "default": {
                "()": "colorlog.ColoredFormatter",
                "format": "%(log_color)s%(asctime)s - %(levelname)-5s - %(message)s",
                "datefmt": "%Y-%m-%d %H:%M:%S",
                "log_colors": {
                    'DEBUG': 'cyan',
                    'INFO': 'white',
                    'WARNING': 'yellow',
                    'ERROR': 'red',
                    'CRITICAL': 'red,bg_white',
                },
            },
        },
        "handlers": {
            "default": {
                "formatter": "default",
                "class": "logging.StreamHandler",
                "stream": "ext://sys.stdout",
            },
        },
        "loggers": {
            "uvicorn.error": {"handlers": ["default"], "level": "INFO"},
            "uvicorn.access": {"handlers": ["default"], "level": "INFO"},
        },
    }

    uvicorn.run(app, log_config=log_config)
