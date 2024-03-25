from app.logger.logger import log


def ack(err, msg):
    if err is not None:
        log.error(f"Produce Failed: {err.str()}")
    else:
        log.info(f"Produce Success: {msg}")
