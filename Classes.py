#Module that declares both general shared Classes and ORMClasses


#Maybe this will destroy singleton behavior of ORMEngine because it references both with "import .." and "from .. import ..."
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import and_
from sqlalchemy import func
import datetime
import sqlite3

#Declaring Base Class - assuming singleton behavior for each instantion of base from Base()
Base = declarative_base()
engine = create_engine('sqlite:///findbolig_alchemy_dev1.db')


#Declaring Session - assuming singleton behavior for each instantions of session from Session()
#12-Mar-2021: Correction - singleton behavior is not valid - new instantions are problematic, because they do not save e.g. modified objects.
Session = sessionmaker(bind=engine)

#Querying with one session object and comitting with another, does not really store the results. This is a problem, hence why I am creating a global session object.
session = Session()



class AptQuery (Base):
    __tablename__ = "aptqueries"

    id = Column(Integer, primary_key=True)
    title = Column(String(50))
    minSqm = Column(Integer)
    priceMax = Column(Integer)
    address = Column(String(50))
    
    def __init__(self, title, priceMax, address, minsqm):
        self.title = title
        self.priceMax = priceMax
        self.address = address
        self.minSqm = minsqm

    def GetQueryURL(self):

        baseUrl = 'https://findbolig.nu/ledigeboliger/liste.aspx?&adr={address_querystring}&rentmax={rent_max_querystring}&m2min={minsqm_querystring}&showrented=1&showyouth=0&showlimitedperiod=1&showunlimitedperiod=1&showOpenDay=0&page=1&pagesize=100'
        queryUrl = baseUrl.format(address_querystring = self.address, rent_max_querystring = self.priceMax, minsqm_querystring = self.minSqm)

        return queryUrl

    def PersistAptQueryNoConflict(self):
        #TRYING WITH GLOBAL SESSION
        #session = Session()
        
        #First trying so if an apartment exists with extId = newApartment.extId - otherwise don't store
        existingAptObj = session.query(AptQuery).filter(and_(AptQuery.address == self.address,AptQuery.minSqm == self.minSqm,AptQuery.priceMax==self.priceMax)).first()
        if existingAptObj:
            return False
        else:
            session.add(self)
            session.commit()
            return True

    def EmptyAptQueryTable():
        AptQuery.__table__.drop(engine)
        Base.metadata.create_all(engine)

class AptQueries:
    def __init__(self):
        self.apartmentQueryList = []
    
    #Loads all AptQueries from the default session()
    def LoadPersisted(self):
        #TRYING WITH GLOBAL SESSION
        #session = Session()
        result = session.query(AptQuery).all()
        self.apartmentQueryList = result

    def PrintApartmentQueries(self):
        for aptQuery in self.apartmentQueryList:
            print(aptQuery.title)


class Apartment (Base):
    __tablename__ = "apartments"

    id = Column(Integer, primary_key=True)
    title = Column(String(50))
    extId = Column(String(20))
    sqm = Column(Integer)
    rent = Column(Integer)
    availableFrom = Column(String(20))
    streetAddress = Column(String(80))
    postalcode = Column(Integer)
    city = Column(String(50))
    apartmentURL = Column(String(200))
    norooms = Column(Integer)
    emailSent = Column(Boolean)
    emailSentDateTime = Column(DateTime)

    
    def __init__(self, title, extId, rent=None, sqm=None, availablefrom=None, streetAddress=None,
    postalcode=None,city=None, apartmentURL = None, numberOfRooms = None, emailSent = False, emailSentDateTime = None):
        
        self.title = title
        self.rent = rent
        self.sqm = sqm
        self.availableFrom = availablefrom
        self.extId = extId
        self.streetAddress = streetAddress
        self.postalcode = postalcode
        self.city = city
        self.apartmentURL = apartmentURL
        self.norooms = numberOfRooms
        self.emailSent = emailSent
        self.emailSentDateTime = emailSentDateTime

    def __repr__(self):
        return "<Apartment(streetAddress='%s',rent='%s', sqm='%s', availableFrom='%s', apartmentURL='%s', emailSentDateTime='%s')>" % (self.streetAddress, self.rent,self.sqm,self.availableFrom,self.apartmentURL,self.emailSentDateTime)

    #Persists object to the session - which is defined in the top of this module
    def PersistApartmentNoConflict(self):
        #TRYING WITH GLOBAL SESSION
        #session = Session()
        #First trying so if an apartment exists with extId = newApartment.extId - otherwise don't store
        existingAptObj = session.query(Apartment).filter_by(extId=self.extId).first()
        if existingAptObj:
            return False
        else:
            session.add(self)
            session.commit()
            return True

    #
    #Only meaningful when persisting, which requires that the object has been loaded from a session
    def SetEmailSentTimeStamp(self):
        self.emailSent = True
        self.emailSentDateTime = func.now()
        #TRYING WITH GLOBAL SESSION
        #session = Session()
        session.commit()

    def EmptyApartmentTable():
        Apartment.__table__.drop(engine)
        Base.metadata.create_all(engine)
    





#TODO Implement SQLAlchemy Load and Save Operations into this class - to store a regular list of Apartment objects.
class ApartmentList:
    def __init__(self):
        self.apartmentList = []
        'type apartmentList: list[Apartment]'

    #Appends an external apartment to self.apartmentList while checking for conflicting extId
    def AppendApartmentNoConflict(self, newApartment):
        for existingApartment in self.apartmentList:
            if existingApartment.extId == newApartment.extId:
                return False
        self.apartmentList.append(newApartment)
        return True

    #Appends an apartment without checking for conflcit.
    def AppendApartmentToList(self, newApartment):
        self.apartmentList.append(newApartment)
    
    def IsEmpty(self):
        if len(self.apartmentList) == 0:
            return True
        else:
            return False
    
    def GetNoApartmentsInList(self):
        return len(self.apartmentList)

    def GetList(self):
        ':rtype apartmentList: list[Apartment]'
        return self.apartmentList

    def GetDictList(self):
        dictList = []
        for apartment in self.apartmentList:
            dictList.append(apartment.__dict__)
        return dictList

    #Appends an external list of apartments into self with no conflict
    #Returns number of appended appartments
    def AppendApartmentListNoConflict(self, extApartmentList):
        ':type extApartmentList: ApartmentList'
        appendedApartments = 0
        for extApartment in extApartmentList.GetList():
            #Check if appartment was appended and increment appendedApartments w/ one if so
            if self.AppendApartmentNoConflict(extApartment):
                appendedApartments = appendedApartments + 1
        return appendedApartments

    def PersistListToDBNoConflict(self):
        persistedApartments = 0
        for apartment in self.apartmentList:
            result = apartment.PersistApartmentNoConflict()
            if result:
                persistedApartments = persistedApartments + 1
        return persistedApartments
    
    #Update all Apartment objects to set a SetEmailSentTimeStamp
    def PersistEmailSent(self):
        for apartment in self.apartmentList:
            apartment.SetEmailSentTimeStamp()

    def LoadPersistedApartmentsWithNoEmailTimeStamp(self):
        #TRYING WITH GLOBAL SESSION
        #session = Session()
        result = session.query(Apartment).filter(Apartment.emailSent == False)
        self.apartmentList = result

    def LoadPersistedApartments(self):
        #TRYING WITH GLOBAL SESSION
        #session = Session()
        result = session.query(Apartment).all()
        self.apartmentList = result
    


Base.metadata.create_all(engine)