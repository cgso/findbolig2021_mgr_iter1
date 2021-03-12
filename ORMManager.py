from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sqlite3

#Declaring Base Class - assuming singleton behavior for each instantion of base from Base()
Base = declarative_base()
engine = create_engine('sqlite:///findbolig_alchemy_dev1.db')
#Declaring Session - assuming singleton behavior for each instantions of session from Session()
Session = sessionmaker(bind=engine)

def BaseCreateAll():
    Base.metadata.create_all(engine)

#Generic SingleTon pattern that can be used as metaclasses to make otherwise normal classes into singletons.... 
class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]
        
#Class will act as Singleton when instantied - metaclass=Singleton defines the metaclass for the class
#Not sure if needed... 
class BaseSingleton(metaclass=Singleton):
    def __init__(self):
        self.Base = declarative_base()

