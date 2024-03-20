import datetime
import json

from app.redis.redis import RedisManager
from app.logger.logger import Logger
from fastapi import FastAPI, status
from fastapi.responses import JSONResponse

app = FastAPI()
logger = Logger()


@app.get("/")
async def root():
    return JSONResponse(content={"message": "Hello World"},
                        status_code=status.HTTP_200_OK)


@app.get("/api/flights/{flight_type}")
def flights(flight_type):
    redis = RedisManager()
    today = (datetime.datetime.today().strftime('%Y%m%d'))
    redis.select(redis.FLIGHTS)

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


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
