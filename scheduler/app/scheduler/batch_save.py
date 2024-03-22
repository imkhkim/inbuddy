import json
from datetime import datetime, timedelta

from app.redis.redis import redis
from app.logger.logger import log


def test():
    redis.set_connection('localhost', 6379)


def flight_save():
    redis.select(redis.FLIGHTS_API)

    old_flight_data_key = (datetime.now() - timedelta(days=2)).strftime(
            "%Y%m%d") + 'D'

    old_flight_data = redis.get(old_flight_data_key)

    # DB or HDFS에 old_flight_data를 저장하는 로직 작성
    #
    #
    #
    # old_flight_data는 bytes 형식으로 되어있습니다.
    # list나 dictionary 형식으로 바꾸기 위해서는 json.loads(old_flight_data) 를 수행해야 합니다.

    log.info(f"Old Flight Data: {old_flight_data_key} Saved At HDFS")

    redis.delete(old_flight_data_key)

    log.info(f"Old Flight Data: {old_flight_data_key} Deleted From Redis")


def weather_save():
    redis.select(redis.WEATHERS_API)

    today = datetime.now()
    yesterday = today - timedelta(days=1)

    date = yesterday
    while date < today:
        old_weather_data_key = date.strftime("%Y%m%d%H%M")
        old_weather_data = redis.get(old_weather_data_key)
        log.info(f"Old Weather Data: {old_weather_data}")
        # DB or HDFS에 old_weather_data를 저장하는 로직 작성
        #
        #
        #
        # old_flight_data는 bytes 형식으로 되어있습니다.
        # list나 dictionary 형식으로 바꾸기 위해서는 json.loads(old_flight_data) 를 수행해야 합니다.

    return None


def save():
    # flight_save()
    weather_save()


test()
save()
