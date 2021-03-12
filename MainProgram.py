from Classes import AptQueries
from Classes import ApartmentList
from Classes import Apartment
from FindBoligScraper import ReturnApartmentListFromApartmentQuery
from EMailManager import FindBoligNotification
from UnitTests import PrintPersistedApartmentList

def ScrapeAllAptQueriesAndUpdateDB():
    #TODO Load SiteQueries from DB
    allAptQueries = AptQueries()
    allAptQueries.LoadPersisted()

    identifiedApartments = ApartmentList()

    for aptQuery in allAptQueries.apartmentQueryList:
        returnedApartment = ReturnApartmentListFromApartmentQuery(aptQuery)
        identifiedApartments.AppendApartmentListNoConflict(returnedApartment)
    
    persistedApartmentsNumber = identifiedApartments.PersistListToDBNoConflict()
    print("Persisted Apartments {d}".format(d=persistedApartmentsNumber))

    #TODO Load Apartments via Scrape

    #TODO Merge Apartments via Scrape

#Works now and persists DB
def PerformActions():
    aptList = ApartmentList()
    aptList.LoadPersistedApartmentsWithNoEmailTimeStamp()
    findBoligEmailNotification = FindBoligNotification()
    for apartment in aptList.GetList():
        findBoligEmailNotification.AppendApartmentToMessage(apartment)
    findBoligEmailNotification.Send()
    

    #TODO Load Apartments from DB that have not yet had actions performed (if timestamp of action performed > 1000 AND )
    #TODO Perform actions for each apartment - update to DB, so that each transaction is saved.
    

    #

Apartment.EmptyApartmentTable()

PrintPersistedApartmentList()

ScrapeAllAptQueriesAndUpdateDB()

PrintPersistedApartmentList()

PerformActions()

PrintPersistedApartmentList()