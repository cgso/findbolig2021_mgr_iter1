from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import and_, or_
from sqlalchemy import func
from PythonConfig import WetRun

from Classes import AptQuery, Apartment, ApartmentList, AptQueries, Base

engine = create_engine('sqlite:///findbolig_prod.db' if WetRun else 'sqlite:///findbolig_alchemy_dev1.db')
Session = sessionmaker(bind=engine)
session = Session()
Base.metadata.create_all(engine)

def Commit():
    session.commit()

def AptQuerySaveObjNoConflict(aptQuery):
    #First trying so if an aptquery exists based similarity in address minSqm and priceMax
    existingAptObj = session.query(AptQuery).filter(and_(AptQuery.address == aptQuery.address,AptQuery.minSqm == aptQuery.minSqm,AptQuery.priceMax==aptQuery.priceMax)).first()
    if existingAptObj:
            return False
    else:
        session.add(aptQuery)
        Commit()
        return True

def AptQueryTableDrop():
    AptQuery.__table__.drop(engine)
    Commit()
    Base.metadata.create_all(engine)


#TODO What to do with commit after loading apartments from a session(). REMEMBER to use same session object. Consider globalizing session()

def AptQueriesLoadAll():
    return AptQueries(session.query(AptQuery).all())

def ApartmentSaveNoConflict(apartmentObj, commit = True):
    existingAptObj = session.query(Apartment).filter(Apartment.extId==apartmentObj.extId).first()
    if existingAptObj:
            return False
    else:
        session.add(apartmentObj)
        if commit:
            Commit()
        return True

def ApartmentSaveListNoConflict(apartmentList):
    persistedApartments = 0
    for apartment in apartmentList.GetList():
        result = ApartmentSaveNoConflict(apartment, False)
        if result:
            persistedApartments = persistedApartments + 1
    #Commit to session because apartments were only session.add() before.
    Commit()
    return persistedApartments

#Loads all Apartments where emailsent == False
def ApartmentLoadAllEmailFalse():
    aptList = ApartmentList()
    aptList.SetList(session.query(Apartment).filter(Apartment.emailSent == False).all())
    return aptList

def ApartmentLoadAllAppliedFalse():
    aptList = ApartmentList()
    #Get all apartments that have not yet been applied or where Dry Run application was performed.
    aptList.SetList(session.query(Apartment).filter(or_(Apartment.emailSent == 0, Apartment.emailSent == 4)).all())
    return aptList

def ApartmentsLoadAll():
    aptList = ApartmentList()
    aptList.SetList(session.query(Apartment).all())
    return aptList
    

def DropTablesandPopulateAptQueries():
    Apartment.__table__.drop(engine)
    AptQuery.__table__.drop(engine)
    session.commit()
    Base.metadata.create_all(engine)
    session.commit()
    session.add(AptQuery("Margretheholmsvej 1", 18500, "Margretheholmsvej", 100))

def AptQueryDeleteByTitle(title):
    session.query(AptQuery).filter(AptQuery.title == title).delete()
    session.commit()

def ApartmentDeleteById(id):
    session.query(Apartment).filter(Apartment.id == id).delete()
    session.commit()