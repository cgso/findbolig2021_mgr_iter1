from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sqlite3

Base = declarative_base()
engine = create_engine('sqlite:///testalchemy.db')


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
our_user = session.query(User).filter_by(name='ed').first()
print(our_user)