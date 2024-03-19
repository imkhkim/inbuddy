import redis


class RedisManager:
    _instance = None
    FLIGHTS = 0
    WEATHERS = 1

    def __new__(cls, host='localhost', port=6379):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.redis_connection = redis.StrictRedis(host=host,
                                                               port=port)
        return cls._instance

    def select(self, db):
        self.redis_connection.select(db)

    def get(self, key):
        return self.redis_connection.get(key)

    def set(self, key, value):
        self.redis_connection.set(key, value)
