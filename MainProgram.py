from FindBoligScraper import ReturnApartmentListFromApartmentQuery
from EMailManager import FindBoligNotification
from UnitTests import PrintPersistedApartmentList
import Persistence
from Classes import AptQueries, AptQuery
from Classes import ApartmentList
from Classes import Apartment
from PythonConfig import VPy
import Applier

def ScrapeAllAptQueriesAndUpdateDB():
    ## Loading SiteQueries from DB and passing as constructor argument, so that allAptQueries is initialized.
    allAptQueries = Persistence.AptQueriesLoadAll()

    if VPy:
        print("Loaded ApartmentQueries:")
        allAptQueries.PrintApartmentQueries()
    
    ## Placeholder for identifiedApartments
    identifiedApartments = ApartmentList()

    #Iterating AptQueries and performing scrapes.
    for aptQuery in allAptQueries.GetList():
        #Returning Apartments List from Scrape based on AptQuery
        returnedApartment = ReturnApartmentListFromApartmentQuery(aptQuery)
        #Merging into identified apartments. Quicker than to DB directly.
        identifiedApartments.AppendApartmentListNoConflict(returnedApartment)
    
    #And then to DB.
    persistedApartmentsNumber = Persistence.ApartmentSaveListNoConflict(identifiedApartments)
    

def PerformApplication():
    if VPy:
        print("Applying for apartments")
    aptList = Persistence.ApartmentLoadAllAppliedFalse()
    for apartment in aptList.GetList():
        result = Applier.ApplyForFindBoligApartment(apartment)
        apartment.SetApplied(result)#See appliedStatusCode in Classes.py for description on meaning of return values.
    Persistence.Commit()
        


#Works now and persists DB
def PerformEmailActions():
    aptList = Persistence.ApartmentLoadAllEmailFalse()
    findBoligEmailNotification = FindBoligNotification()

    if VPy:
        print("Apartments to be taken email actions for: '{0}'".format(aptList.GetNoApartmentsInList()))

    for apartment in aptList.GetList():
        findBoligEmailNotification.AppendApartmentToMessage(apartment)
    
    emailstatuscode = findBoligEmailNotification.Send()
    if emailstatuscode == 200:
        aptList.SetEmailSent()
        Persistence.Commit()
    elif emailstatuscode == 0:
        if VPy:
            print("No apartments required any email actions")

Persistence.DropTablesandPopulateAptQueries()

print("Scraping apartments")
ScrapeAllAptQueriesAndUpdateDB()

print("Applying apartments")
PerformApplication()

print("Performing actions")
PerformEmailActions()