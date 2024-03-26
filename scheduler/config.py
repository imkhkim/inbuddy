import os
from dotenv import load_dotenv

load_dotenv()

# Flight API
FLIGHT_API_DOMAIN = "https://www.airportal.go.kr/life/airinfo/RbHanList.jsp"
FLIGHT_DATA_COLUMNS = ["날짜", "항공사", "편명", "도착지", "계획", "예상", "출발", "구분", "현황",
                       "사유"]

# Weather API
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
WEATHER_API_DOMAIN = "https://apihub.kma.go.kr/api/typ01/url/amos.php"
WEATHER_DATA_COLUMNS = ["S", "TM", "L_VIS", "R_VIS", "L_RVR", "R_RVR", "CH_MIN",
                        "TA", "TD",
                        "HM", "PS", "PA", "RN", "예비1", "예비2", "WD02",
                        "WD02_MAX", "WD02_MIN",
                        "WS02", "WS02_MAX", "WS02_MIN", "WD10", "WD10_MAX",
                        "WD10_MIN",
                        "WS10", "WS10_MAX", "WS10_MIN"]

# Database
REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")

# Message Broker
KAFKA_HOST = os.getenv("KAFKA_HOST")
KAFKA_BROKER_PORTS = os.getenv("KAFKA_BROKER_PORTS")

# Logger
LOG_FORMAT = "%(log_color)s%(asctime)s - %(levelname)-5s - %(message)s"
LOG_DATE_FORMAT = "%Y-%m-%d %H:%M:%S"
LOG_COLORS = {
    'DEBUG': 'cyan',
    'INFO': 'white',
    'WARNING': 'yellow',
    'ERROR': 'red',
    'CRITICAL': 'red,bg_white',
}

UVICORN_LOG_CONFIG = {
    "version": 1,
    "formatters": {
        "default": {
            "()": "colorlog.ColoredFormatter",
            "format": LOG_FORMAT,
            "datefmt": LOG_DATE_FORMAT,
            "log_colors": LOG_COLORS,
        },
        "simple": {
            "format": LOG_FORMAT.replace('%(log_color)s', '').replace(
                    '%(reset)s', ''),
            "datefmt": LOG_DATE_FORMAT
        },
    },
    "handlers": {
        "default": {
            "formatter": "default",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stdout",
        },
        "file": {
            "class": "logging.FileHandler",
            "formatter": "simple",
            "filename": "app/logger/inbuddy.log",
        },
    },
    "loggers": {
        "uvicorn.error": {"handlers": ["default"], "level": "INFO"},
        "uvicorn.access": {"handlers": ["default"], "level": "INFO"},
        "inbuddy.scheduler": {"handlers": ["default", "file"],
                              "level": "DEBUG"},
    },
}
