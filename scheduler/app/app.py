import datetime
import json

from redis_manager.redis import redis
from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from app.models import PredictRequestEntity, PredictResponseEntity
from app.predict import predict

app = FastAPI()


@app.get("/")
async def root():
    return JSONResponse(content={"message": "Hello World"},
                        status_code=status.HTTP_200_OK)


@app.get("/api2/flights/{flight_type}")
def flights(flight_type):
    today = (datetime.datetime.today().strftime('%Y%m%d'))
    redis.select(redis.FLIGHTS_API)

    data = {}
    status_code = status.HTTP_400_BAD_REQUEST
    if flight_type == 'arrive':
        data = redis.get(today + 'A')
        data = json.loads(data.decode() if data else '{}')
        status_code = status.HTTP_200_OK
    elif flight_type == 'departure':
        data = redis.get(today + 'D')
        data = json.loads(data.decode() if data else '{}')
        status_code = status.HTTP_200_OK
    return JSONResponse(content=data, status_code=status_code)


@app.post("/api2/predict")
def delay_predict(flight_info: PredictRequestEntity):
    flight_code = flight_info.flight_code

    result = predict(flight_code)

    http_status, message, data = 200, "예측 성공", result

    if result is None:
        http_status, message, data = 400, "예측 실패", None

    return PredictResponseEntity(status=http_status, message=message, data=data)
