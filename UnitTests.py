from Classes import ApartmentList
from Classes import Apartment
from Classes import AptQuery
from Classes import AptQueries
from FindBoligScraper import ReturnApartmentListFromBeautifulSoup
from bs4 import BeautifulSoup
from EMailManager import FindBoligNotification
from FindBoligScraper import ReturnApartmentListFromApartmentQuery
import Persistence



def AssertAptQueryURL():
    aptQuery = AptQuery(title="Test Title", priceMax=15000, address="Margretheholmsvej", minsqm=50)
    generatedQueryURL = aptQuery.GetQueryURL()
    referenceQueryURL = 'https://findbolig.nu/ledigeboliger/liste.aspx?&adr=Margretheholmsvej&rentmax=15000&m2min=50&showrented=1&showyouth=0&showlimitedperiod=1&showunlimitedperiod=1&showOpenDay=0&page=1&pagesize=100'
    if referenceQueryURL == generatedQueryURL:
        print("AssertAptQueryURL Assertion                      SUCCESS")
    else:
        print("AssertAptQueryURL Assertion                      FAILED")

def AssertScrapeFromBeautifulSoup():
    soup = BeautifulSoup(open(".\\TestResources\\FindBoligBSUnitTest4Results.htm"), "html.parser")
    apartmentListObj = ReturnApartmentListFromBeautifulSoup(soup)
    if apartmentListObj.GetNoApartmentsInList() == 4:
        print("AssertScrapeFromBeautifulSoup Assertion          SUCCESS")
    else:
        print("AssertScrapeFromBeautifulSoup Assertion          FAILED")

def AssertSendEmailWithApartment():
    f = FindBoligNotification()
    aptQuery = AptQuery(title="Test Title", priceMax=15000, address="Margretheholmsvej", minsqm=50)
    aptReturnedApartments = ReturnApartmentListFromApartmentQuery(aptQuery)
    for apartment in aptReturnedApartments.GetList():
        f.AppendApartmentToMessage(apartment)
    if f.Send() == 200:
        print("AssertSendMailWIthApartment Assertion            SUCCESS")
    else:
        print("AssertSendMailWIthApartment Assertion            FAILED")

def AssertPersistAndLoadAptQueries():
    aptQuery1 = AptQuery("Test 1", 17000, "Margretheholmsvej", 100)
    Persistence.AptQuerySaveObjNoConflict(aptQuery1)

    aptQueries = Persistence.AptQueriesLoadAll()
    aptQueries.PrintApartmentQueries()


    
def AssertStoreAptQuery():
    print()

def PrintPersistedApartmentList():
    print("Apartments currently in DB loaded via Persistence.ApartmentsLoadAll")
    aptList = Persistence.ApartmentsLoadAll()
    for apartment in aptList.GetList():
        print(repr(apartment))


def SendEmailOnApartmentAvailable():
    #TODO Create Mock Apartment Objects 
    print()
    #TODO Send E-mail
