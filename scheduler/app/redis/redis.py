import redis as _redis


class RedisManager:
    _instance = None
    FLIGHTS = 0
    WEATHERS = 1

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.redis_connection = None
        return cls._instance

    def set_connection(self, host, port):
        self._instance.redis_connection = _redis.StrictRedis(host=host,
                                                             port=port)

    def select(self, db):
        self.redis_connection.select(db)

    def get(self, key):
        return self.redis_connection.get(key)

    def set(self, key, value):
        self.redis_connection.set(key, value)


redis = RedisManager()
