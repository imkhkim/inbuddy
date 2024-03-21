import os

import pandas as pd
import requests

from datetime import datetime
from app.redis.redis import RedisManager
from app.logger.logger import Logger

global API_KEY

DOMAIN = "https://apihub.kma.go.kr/api/typ01/url/amos.php"


def _request():
    params = {
        "tm": 202211301200,  # YYYYMMDDhhmm
        "dtm": 60,
        "stn": 113,
        "help": 1,
        "authKey": API_KEY,
    }

    url = DOMAIN + '?' + '&'.join(
            [f"{key}={value}" for key, value in params.items()])


#       TODO: url 검증, params 의미 확인, redis set
#       https://apihub.kma.go.kr/apiList.do?seqApi=14&seqApiSub=259

def fetch():
    _request()
