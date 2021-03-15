import logging
from PythonConfig import VPy
import time

logging.basicConfig(filename='findbolig.log', encoding='utf-8', level=logging.INFO)

def Error(errorMessage):
    logging.error("{0} {1}".format(GetTime(),errorMessage))
    if VPy:
        print(errorMessage)

def Debug(debugMessage):
    if VPy:
        print(debugMessage)
        logging.debug("{0} {1}".format(GetTime(),debugMessage))

def Info(infoMessage):
    logging.info("{0} {1}".format(GetTime(),infoMessage))
    if VPy:
        print(infoMessage)

def GetTime():
    return time.strftime("%Y%m%d-%H%M%S")