import os
import logging
import colorlog


def _create_or_get_default_path():
    path = os.path.join(os.path.dirname(__file__), 'logs')
    return path


class Logger:
    _instance = None
    format = '%(log_color)s%(asctime)s - %(levelname)-5s - %(message)s'
    date_format = "%Y-%m-%d %H:%M:%S"
    log_colors = {
        'DEBUG': 'cyan',
        'INFO': 'green',
        'WARNING': 'yellow',
        'ERROR': 'red',
        'CRITICAL': 'red,bg_white',
    }

    def __new__(cls, filepath=None, console_log_level=logging.DEBUG,
            file_log_level=logging.INFO):

        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.logger = logging.getLogger("schedule-logger")
            cls._instance.logger.setLevel(logging.DEBUG)
            cls._instance.logger.handlers.clear()

            if filepath is None:
                filepath = _create_or_get_default_path()

            file_handler = logging.FileHandler(filepath)
            file_handler.setLevel(file_log_level)

            console_handler = colorlog.StreamHandler()
            console_handler.setLevel(console_log_level)

            formatter = colorlog.ColoredFormatter(fmt=cls.format,
                                                  datefmt=cls.date_format,
                                                  log_colors=cls.log_colors)

            file_handler.setFormatter(logging.Formatter(
                    fmt=cls.format.replace('%(log_color)s', '').replace(
                            '%(reset)s', ''),
                    datefmt=cls.date_format))
            console_handler.setFormatter(formatter)

            cls._instance.logger.addHandler(file_handler)
            cls._instance.logger.addHandler(console_handler)

        return cls._instance

    def info(self, message):
        self.logger.info(message)

    def warning(self, message):
        self.logger.warning(message)

    def debug(self, message):
        self.logger.debug(message)

    def error(self, message):
        self.logger.error(message)

    def set_log_level(self, level):
        self.logger.setLevel(level)


log = Logger()
