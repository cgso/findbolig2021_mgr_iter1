class AptQueries:
    def __init__(self):
        self.apartmentQueryList = []

class AptQuery:
    def __init__(self, title, priceMax, address, minsqm):
        self.title = title
        self.priceMax = priceMax
        self.address = address
        self.minSqm = minsqm

    def GetQueryURL(self):

        baseUrl = 'https://findbolig.nu/ledigeboliger/liste.aspx?&adr={address_querystring}&rentmax={rent_max_querystring}&m2min={minsqm_querystring}&showrented=1&showyouth=0&showlimitedperiod=1&showunlimitedperiod=1&showOpenDay=0&page=1&pagesize=100'
        queryUrl = baseUrl.format(address_querystring = self.address, rent_max_querystring = self.priceMax, minsqm_querystring = self.minSqm)

        return queryUrl


class Apartment:
    def __init__(self, title, extId, rent=None, sqm=None, availablefrom=None, streetAddress=None,
    postalcode=None,city=None, apartmentURL = None, numberOfRooms = None):
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


class ApartmentList:
    def __init__(self):
        self.apartmentList = []
        'type apartmentList: list[Apartment]'

    def AppendApartmentNoConflict(self, newApartment):
        for existingApartment in self.apartmentList:
            if existingApartment.extId == newApartment.extId:
                return False
        self.apartmentList.append(newApartment)
        return True
    
    def AppendApartment(self, newApartment):
        self.apartmentList.append(newApartment)
    
    def IsEmpty(self):
        if len(self.apartmentList) == 0:
            return True
        else:
            return False
    
    def GetNoApartmentsInList(self):
        return len(self.apartmentList)

    def SaveApartmentsToDB(self):
        print("Not Implemented")

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
