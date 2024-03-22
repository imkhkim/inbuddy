from apscheduler.schedulers.background import BackgroundScheduler
from app.logger.logger import Logger


class ScheduleManager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.schedulers = {}
            cls._instance.logger = Logger()
        return cls._instance

    def create(self, name, func, interval):
        _scheduler = BackgroundScheduler(timezone='Asia/Seoul')
        _scheduler.add_job(func, trigger='interval', seconds=interval, id=name)
        self.schedulers[name] = _scheduler

    def add_job(self, name, func, *args, **kwargs):
        if name in self.schedulers:
            self.schedulers[name].add_job(func, *args, **kwargs)
        else:
            self.logger.error(f"Scheduler '{name}' does not exist.")

    def start(self, name):
        if name in self.schedulers:
            self.schedulers[name].start()
        else:
            self.logger.error(f"Scheduler '{name}' does not exist.")

    def stop(self, name):
        if name in self.schedulers:
            self.schedulers[name].shutdown()
        else:
            self.logger.error(f"Scheduler '{name}' does not exist.")


scheduler = ScheduleManager()
