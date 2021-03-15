from FindBoligScraper import ReturnApartmentListFromApartmentQuery
from EMailManager import FindBoligNotification
from UnitTests import PrintPersistedApartmentList
import Persistence
from Classes import AptQueries, AptQuery
from Classes import ApartmentList
from Classes import Apartment
from PythonConfig import VPy
import Applier
import Logger

def ScrapeAllAptQueriesAndUpdateDB():
    ## Loading SiteQueries from DB and passing as constructor argument, so that allAptQueries is initialized.
    allAptQueries = Persistence.AptQueriesLoadAll()
    Logger.Info("Starting scrape for apartments:")
    Logger.Info(allAptQueries.ListToString())
    
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
    aptList = Persistence.ApartmentLoadAllAppliedFalse()
    
    if aptList.IsEmpty():
        Logger.Info("No apartments to apply.")
        return    

    Logger.Info("Applying for apartments.")
    Logger.Info(aptList.ListToString())
    for apartment in aptList.GetList():
        result = Applier.ApplyForFindBoligApartment(apartment)
        apartment.SetApplied(result)#See appliedStatusCode in Classes.py for description on meaning of return values.
    Persistence.Commit()
        


#Works now and persists DB
def PerformEmailActions():
    aptList = Persistence.ApartmentLoadAllEmailFalse()

    if aptList.IsEmpty():
        Logger.Info("No apartments to send e-mail on.")
        return    

    Logger.Info("Preparing e-mail for apartments:")
    Logger.Info(aptList.ListToString())
    
    findBoligEmailNotification = FindBoligNotification()

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