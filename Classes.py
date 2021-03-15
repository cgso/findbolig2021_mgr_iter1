#Module that declares both general shared Classes and ORMClasses

from PythonConfig import VPy
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import and_
from sqlalchemy import func
import Logger

#Declaring Base Class - assuming singleton behavior for each instantion of base from Base()
Base = declarative_base()


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

    #
    def GetQueryURL(self):
        baseUrl = 'https://findbolig.nu/ledigeboliger/liste.aspx?&adr={address_querystring}&rentmax={rent_max_querystring}&m2min={minsqm_querystring}&showrented=1&showyouth=0&showlimitedperiod=1&showunlimitedperiod=1&showOpenDay=0&page=1&pagesize=100'
        queryUrl = baseUrl.format(address_querystring = self.address, rent_max_querystring = self.priceMax, minsqm_querystring = self.minSqm)

        return queryUrl

    #Used for returning file when using repr() on object
    def __repr__(self):
        baseRepr = '<AptQuery (title={title}, priceMax={priceMax}, address={address}, minSqm={minSqm})>'
        return baseRepr.format(title=self.title, priceMax=self.priceMax, address=self.address, minSqm = self.minSqm) 
        
    def __str__(self):
        baseRepr = '<AptQuery (title={title}, priceMax={priceMax}, address={address}, minSqm={minSqm})>'
        return baseRepr.format(title=self.title, priceMax=self.priceMax, address=self.address, minSqm = self.minSqm) 

class AptQueries:
    def __init__(self, apartmentQueryList = []):
        self.apartmentQueryList = apartmentQueryList

    def ListToString(self):
        return ''.join(str(aptQuery) for aptQuery in self.apartmentQueryList)

    def GetList(self):
        return self.apartmentQueryList


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

    appliedStatusCode = Column(Integer)
    appliedDateTime = Column(DateTime)
    
    def __init__(self, title, extId, rent=None, sqm=None, availablefrom=None, streetAddress=None,
    postalcode=None,city=None, apartmentURL = None, numberOfRooms = None, emailSent = False, emailSentDateTime = None, appliedStatusCode = 0, appliedDateTime = None):
        
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


        self.appliedStatusCode = appliedStatusCode #Integer
        #0 Indicates no action yet (default value)
        #1 Indicates apartment was already applied
        #2 Indicates apartment has been correctly applied
        #3 Apartment was applied but "Ansoeg" button was not disabled afterwards
        #4 Apartment was not applied - WetRun was False (should not be applied)
        
        self.appliedDateTime = appliedDateTime

    def __repr__(self):
        return "<Apartment(streetAddress='%s',rent='%s', sqm='%s', availableFrom='%s', apartmentURL='%s', emailSentDateTime='%s', emailSent='%s')>" % (self.streetAddress, self.rent,self.sqm,self.availableFrom,self.apartmentURL,self.emailSentDateTime, self.emailSent)

    def __str__(self):
        return "<Apartment(streetAddress='%s',rent='%s', sqm='%s', availableFrom='%s', apartmentURL='%s', emailSentDateTime='%s', emailSent='%s')>" % (self.streetAddress, self.rent,self.sqm,self.availableFrom,self.apartmentURL,self.emailSentDateTime, self.emailSent)


    #Only meaningful when persisting, which requires that the object has been loaded from a session
    def SetEmailSentTimeStamp(self):
        self.emailSent = True
        self.emailSentDateTime = func.now()

    def SetApplied(self, appliedStatusCode):
        self.appliedStatusCode = appliedStatusCode
        self.appliedDateTime = func.now()


#TODO Implement SQLAlchemy Load and Save Operations into this class - to store a regular list of Apartment objects.
class ApartmentList:
    def __init__(self):
        self.apartmentList = []
        'type apartmentList: list[Apartment]'

    def SetList(self, apartmentList):
        self.apartmentList = apartmentList

    #Appends an external apartment to self.apartmentList while checking for conflicting extId
    def AppendApartmentNoConflict(self, newApartment):
        for existingApartment in self.apartmentList:
            if existingApartment.extId == newApartment.extId:
                return False
        self.apartmentList.append(newApartment)
        if VPy:
            Logger.Debug("Appartment appended (Checked for Conflict): " + repr(newApartment))
        return True

    #Appends an apartment without checking for conflcit.
    def AppendApartmentToList(self, newApartment):
        if VPy:
            Logger.Debug("Appartment appended (No Check of Conflict): " + repr(newApartment))
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
    
    def SetEmailSent(self):
        for apartment in self.apartmentList:
            apartment.SetEmailSentTimeStamp()

    def ListToString(self):
        return ''.join(str(apartment) for apartment in self.apartmentList)