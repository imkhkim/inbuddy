import requests
import json

from datetime import datetime
from app.redis.redis import redis
from app.logger.logger import log

DOMAIN = "https://apihub.kma.go.kr/api/typ01/url/amos.php"

COLUMNS = ["S", "TM", "L_VIS", "R_VIS", "L_RVR", "R_RVR", "CH_MIN", "TA", "TD",
           "HM", "PS", "PA", "RN", "예비1", "예비2", "WD02", "WD02_MAX", "WD02_MIN",
           "WS02", "WS02_MAX", "WS02_MIN", "WD10", "WD10_MAX", "WD10_MIN",
           "WS10", "WS10_MAX", "WS10_MIN"]

global API_KEY


def _parse_json(text):
    result = []
    for line in text.split('\n'):
        line = line.strip()
        if line is None or len(line) == 0:
            break
        if not line.startswith('#'):
            data = line.split()
            record = {column: int(value) for column, value in
                      zip(COLUMNS, data)}

            result.append(record)

    return result


def _request(now):
    params = {
        "tm": now,
        "dtm": 3,
        "stn": 113,
        "help": 0,
        "authKey": API_KEY,
    }

    url = DOMAIN + '?' + '&'.join(
            [f"{key}={value}" for key, value in params.items()])

    response = requests.get(url).text

    return _parse_json(response)


def fetch():
    now = datetime.now().strftime("%Y%m%d%H%M")

    response = _request(now)

    if response is None:
        log.warning("Failed to Fetch Weather Data")
        return

    for document in response:
        redis.select(redis.WEATHERS)
        redis.set(document["TM"],
                  json.dumps(document, indent=4, ensure_ascii=False))
        log.info("Fetched Weather Data")
