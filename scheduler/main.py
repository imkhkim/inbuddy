import os

import uvicorn

from dotenv import load_dotenv
from app.scheduler.scheduler import scheduler
from app.redis.redis import redis
from app.logger.logger import log
from app.scheduler.flight_data_fetcher import fetch as flight_fetch
from app.scheduler.weather_data_fetcher import fetch as weather_fetch
from app.scheduler import weather_data_fetcher

from app.app import app

global REDIS_HOST

if __name__ == "__main__":
    load_dotenv()

    REDIS_HOST = os.getenv("REDIS_HOST")
    REDIS_PORT = os.getenv("REDIS_PORT")
    weather_data_fetcher.API_KEY = os.getenv("WEATHER_API_KEY")

    redis.set_connection(REDIS_HOST, REDIS_PORT)

    scheduler.create("flights_departure", func=flight_fetch,
                     interval=60)
    # scheduler.create("flights_arrive", func=fetch, interval=60)
    scheduler.start("flights_departure")

    scheduler.create("weather", func=weather_fetch, interval=60)
    scheduler.start("weather")

    uvicorn_log_config = uvicorn.config.LOGGING_CONFIG
    uvicorn_log_config["formatters"]["default"]["fmt"] \
        = uvicorn_log_config["formatters"]["access"]["fmt"] \
        = log.format

    uvicorn_log_config["formatters"]["access"]["datefmt"] \
        = uvicorn_log_config["formatters"]["default"]["datefmt"] \
        = log.date_format

    uvicorn.run(app)
