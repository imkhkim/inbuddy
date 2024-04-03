import json
import requests

from datetime import datetime
from logger.logger import log
from redis_manager.redis import redis
from config import SUB_WEATHER_API_KEY, SUB_WEATHER_API_URL

_DATE_FORMAT_MINUTE = "%Y%m%d%H%M"
_TIME_FORMAT = "%H%M"


def fetch(now):
    params = {"serviceKey": SUB_WEATHER_API_KEY,
              "numOfRows": 1000,
              "pageNo": 1,
              "from_time": now.strftime(_TIME_FORMAT),
              "to_time": 2400,

              "type": "json",
              }
    url = SUB_WEATHER_API_URL + '?' + '&'.join(
            [f"{key}={value}" for key, value in params.items()])
    return
