import logging
import os


def _create_or_get_default_path():
    path = os.path.join(os.path.dirname(__file__), 'logs')
    return path


class Logger:
    _instance = None
    format = '%(asctime)s - %(levelname)-5s - %(message)s'
    date_format = "%Y-%m-%d %H:%M:%S"

    def __new__(cls, filepath=None, console_log_level=logging.INFO,
            file_log_level=logging.DEBUG):

        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.logger = logging.getLogger("schedule-logger")
            cls._instance.logger.setLevel(logging.DEBUG)

            if filepath is None:
                filepath = _create_or_get_default_path()
            # 로그 파일 핸들러 설정
            file_handler = logging.FileHandler(filepath)
            file_handler.setLevel(file_log_level)

            # 콘솔 핸들러 설정
            console_handler = logging.StreamHandler()
            console_handler.setLevel(console_log_level)

            # 로그 포매터 설정
            formatter = logging.Formatter(fmt=cls.format,
                                          datefmt=cls.date_format)

            file_handler.setFormatter(formatter)
            console_handler.setFormatter(formatter)

            # 핸들러를 로거에 추가
            cls._instance.logger.addHandler(file_handler)
            cls._instance.logger.addHandler(console_handler)
        return cls._instance

    def info(self, message):
        self.logger.info(message)

    def debug(self, message):
        self.logger.debug(message)

    def error(self, message):
        self.logger.error(message)

    def set_log_level(self, level):
        self.logger.setLevel(level)

    def get_logs_of_level_or_above(self, level):
        logs = []
        for handler in self.logger.handlers:
            if handler.level >= level:
                logs.extend(handler.stream.getvalue().splitlines())
        return logs
