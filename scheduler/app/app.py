import datetime

from app.redis.redis import RedisManager
from app.logger.logger import Logger
from fastapi import FastAPI, status
from fastapi.responses import JSONResponse

app = FastAPI()
logger = Logger()
redis = RedisManager()


@app.get("/")
async def root():
    return JSONResponse(content={"message": "Hello World"},
                        status_code=status.HTTP_200_OK)


@app.get("/api/flights/{flight_type}")
async def flights(flight_type):
    today = (datetime.datetime.today().strftime('%Y%m%d'))
    redis.select(redis.FLIGHTS)

    response = None
    status_code = status.HTTP_400_BAD_REQUEST
    if flight_type == 'arrive':
        response = redis.get(today + 'A')
        status_code = status.HTTP_200_OK
    elif flight_type == 'departure':
        response = redis.get(today + 'D')
        status_code = status.HTTP_200_OK
    return JSONResponse(content=response, status_code=status_code)


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
