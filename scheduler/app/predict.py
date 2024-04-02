from logger.logger import log
import pandas as pd

from config import INPUT_COLUMNS
from redis_manager.redis import redis
from scheduler.weather_data_fetcher import get_last_received_time

global model, encoder
encoded_columns = None


def set_model(_model, _encoder):
    global model, encoder
    model = _model
    encoder = _encoder
    log.info("ML Model set")


"""
'airline',
'flight_code',
'destination',
'cause',

'temperature',
'wind_speed_10m_avg_kt',
'cumulative_precipitation_mm',
'mor_10m_avg_km',
'term',
"""


def predict(flight_code):
    global encoded_columns

    # flight_data를 실제로 redis에서 가져오기
    # 그러기 위해서 flight fetcher가 저장할 때 key:document 형식으로 저장해야함

    flight_data = {"departure_date": "20240403", "airline": "칼리타항공",
                   "flight_code": "K4818", "destination": "ANC(앵커리지)",
                   "departure_time_plan": "00:05",
                   "departure_time_expected": ":", "departure_time_real": ":",
                   "division": "화물", "flight_status": "", "cause": ""}

    weather_data = {"S": 113, "TM": 202404030112, "L_VIS": 10000,
                    "R_VIS": -99999, "L_RVR": 2000, "R_RVR": -99999,
                    "CH_MIN": 15600, "TA": 136, "TD": 74, "HM": 66, "PS": 10091,
                    "PA": 10082, "RN": 0, "예비1": -99999, "예비2": -99999,
                    "WD02": 50, "WD02_MAX": 80, "WD02_MIN": 30, "WS02": 11,
                    "WS02_MAX": 15, "WS02_MIN": 8, "WD10": 50, "WD10_MAX": 70,
                    "WD10_MIN": 20, "WS10": 11, "WS10_MAX": 17, "WS10_MIN": 5}

    df = pd.DataFrame(columns=INPUT_COLUMNS)

    df['airline'] = flight_data['flight_code'][:2]
    df['flight_code'] = flight_data['flight_code']
    df['destination'] = flight_data['destination'][:3]
    df['cause'] = '기타' if flight_data['cause'] == '' else flight_data['cause']

    df['temperature'] = weather_data['TA'] / 10
    df['wind_speed_10m_avg_kt'] = weather_data['WS10'] * 0.194384
    df['cumulative_precipitation_mm'] = weather_data['RN'] * 10

    #  df에 값 채우기

    encoded_data = encoder.transform(df)
    encoded_df = pd.DataFrame(encoded_data.toarray())

    # encoded_columns = encoder.named_transformers_['encoder'].columns.tolist()

    y_pred = model.predict(encoded_df)

    return y_pred
