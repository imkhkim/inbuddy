import os

import uvicorn

from app.scheduler.scheduler import ScheduleManager
from app.redis.redis import RedisManager
from app.logger.logger import Logger
from app.scheduler.flight_data_fetcher import fetch
from app.app import app

from dotenv import load_dotenv

if __name__ == "__main__":
    load_dotenv()

    REDIS_HOST = os.getenv("REDIS_HOST")
    REDIS_PORT = os.getenv("REDIS_PORT")

    logger = Logger()
    redis = RedisManager(REDIS_HOST, REDIS_PORT)
    scheduler = ScheduleManager()

    scheduler.create("flights_departure", func=fetch, interval=60)
    # scheduler.create("flights_arrive", func=fetch, interval=60)
    scheduler.start("flights_departure")

    log_config = uvicorn.config.LOGGING_CONFIG
    log_config["formatters"]["default"]["fmt"] \
        = log_config["formatters"]["access"]["fmt"] \
        = logger.format

    log_config["formatters"]["access"]["datefmt"] \
        = log_config["formatters"]["default"]["datefmt"] \
        = logger.date_format

    uvicorn.run(app)
