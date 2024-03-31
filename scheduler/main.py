import uvicorn

from app.app import app
from app.logger.logger import log
from app.producer.producer import live_weather_producer, live_flight_producer, \
    batch_flight_producer, batch_weather_producer
from app.redis.redis import redis
from app.scheduler.batch_produce import save
from app.scheduler.flight_data_fetcher import fetch as flight_fetch
from app.scheduler.flight_data_fetcher import \
    fetch_scheduled as flight_fetch_scheduled

from app.scheduler.scheduler import scheduler
from app.scheduler.weather_data_fetcher import fetch as weather_fetch
from config import *

if __name__ == "__main__":
    redis.set_connection(REDIS_HOST, REDIS_PORT)

    servers = ','.join(
            [f"{KAFKA_HOST}:{PORT}" for PORT in KAFKA_BROKER_PORTS.split(',')])

    live_flight_producer.set_producer(servers=servers,
                                      client_id="live_data")
    live_weather_producer.set_producer(servers=servers,
                                       client_id="live_data")
    batch_flight_producer.set_producer(servers=servers,
                                       client_id="batch_data")
    batch_weather_producer.set_producer(servers=servers,
                                        client_id="batch_data")

    log.info("Starting scheduler")
    scheduler.create("flights_departure", flight_fetch, trigger="cron",
                     minute='*')

    scheduler.create("flights_departure_scheduled", flight_fetch_scheduled,
                     trigger="cron", hour="0-5", minute=0, second=15)

    scheduler.create("weather", weather_fetch, trigger="cron", minute='*',
                     second=30)

    scheduler.create("batch_save", save, trigger="cron", hour=0, minute=0,
                     second=45)

    scheduler.start("flights_departure")
    scheduler.start("flights_departure_scheduled")
    scheduler.start("weather")
    scheduler.start("batch_save")

    log.info("Scheduler started")

    uvicorn.run(app, log_config=UVICORN_LOG_CONFIG)
