from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sqlite3

#Declaring Base Class - assuming singleton behavior for each instantion of base from Base()
Base = declarative_base()
engine = create_engine('sqlite:///findbolig_alchemy.db')

#Generic SingleTon pattern that can be used as metaclasses to make otherwise normal classes into singletons.... 
class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]
        
#Class will act as Singleton when instantied - metaclass=Singleton defines the metaclass for the class
class BaseSingleton(metaclass=Singleton):
    def __init__(self):
        self.Base = declarative_base()
        






#Example implementation - to be performed in Classes instead. Must refernece SQLAlchemTest.py

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    fullname = Column(String(50))
    nickname = Column(String(50))

    #Built-in Python function for string repr of objects
    def __repr__(self):
        return "<User(name='%s', fullname='%s', nickname='%s')>" % (self.name, self.fullname, self.nickname)

Base.metadata.create_all(engine)

user = User(name = 'de',fullname="Ed Jones")

Session = sessionmaker(bind=engine)
session = Session()

session.add(user)

our_user = session.query(User).filter_by(name='de').first()
print(our_user)

our_user.fullname = "Test"
session.commit()
our_user = session.query(User).filter_by(name='de').count()
print(our_user)