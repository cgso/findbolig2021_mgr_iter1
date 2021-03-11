from bs4 import BeautifulSoup
import requests
from Classes import AptQuery
from Classes import ApartmentList
from Classes import Apartment
from bs4 import Tag
from urllib import parse
import re


#Returns ApartmentList results from ApartmentQuery
def ReturnApartmentListFromApartmentQuery(aptQuery):
    ':rtype apartmentResultsList: ApartmentList'
    #GetQueryURL from ApartmentQuery parameter and parse into requests library
    page = requests.get(aptQuery.GetQueryURL())
    #initialize soup object with html parser
    soup = BeautifulSoup(page.content, 'html.parser')
    #apartments are listed in tr rows with class rowstyle - select all
    apartmentResultsList = ReturnApartmentListFromBeautifulSoup(soup)
    return apartmentResultsList

#Returns ApartmentListObj
#Two use cases: 1) Called by ReturnApartmentListFromApartmentQuery using requests on URL and 2) UnitTest using local file
def ReturnApartmentListFromBeautifulSoup(soup):
    rowParse = soup.select("tr.rowstyle")
    #iterate each row in the parsing
    apartmentResultsList = ApartmentList()
    for row in rowParse:
        apartmentResultsList.AppendApartmentNoConflict(ReturnApartmentFromFindBoligTRRow(row))
    return apartmentResultsList


#Returns one apartment object from a TR row (which represents a HTML row listing one apartment)
#TR example content listed in appendix 1
def ReturnApartmentFromFindBoligTRRow(apartmentTRRow):
    ':rtype apartmentObj: Apartment'
    ':type apartmentTRRow: Tag' #Parameter is Beautifulsoup Tag class object
    tdSlices = apartmentTRRow.select("td")
    #Extraction of data from tdSlices is now performed with array index selection.
    #Indexes for each are as follows - first two cells are wrapped by a HTML anchor <a></a> with apartment URL (incl. extId)
    #0: Apartment URL (with extID) and image
    #1: Address (streetname, postalcode)
    #2: Number of rooms
    #3: Squaremeters
    #4: Rent (first line) a/c expenses (second line)
    #5: Available From

    #Extracting apartmentURL and External ID
    apartmentRelativeURLParseObj = parse.urlparse(tdSlices[0].select("a")[0]['href'])
    #Use parse querystring method to extract the querystrin with attributename aid
    extId = parse.parse_qs(apartmentRelativeURLParseObj.query)['aid'][0]
    apartmentUrl = "http://findbolig.nu" + tdSlices[0].select("a")[0]['href']

    #Extracting squaremeters, Number of rooms, available from
    squareMeters = tdSlices[3].text
    numberOfRooms = tdSlices[2].text
    availableFrom = tdSlices[5].text

    #Extracting streetname from <b> tag in cell 1 containing street name
    streetName = tdSlices[1].select("b")[0].text
    #Extracting Postalcode and City from cell 1 via RegEx
    postalcode = re.search(r"\d{4}(?=\D*$)", tdSlices[1].text).group(0)
    city = re.search('(?<=\d{4}\s).*', tdSlices[1].text).group(0)
    rent = ExtractDigitsFromString(tdSlices[4].text)

    apartmentObj = Apartment(title=streetName, extId=extId, rent=rent, postalcode=postalcode, sqm=squareMeters, 
            availablefrom=availableFrom, streetAddress=streetName, city=city, apartmentURL=apartmentUrl,numberOfRooms=numberOfRooms)
    return apartmentObj

#Extracts digits from string - only use case is extracting digits from rent cell text
def ExtractDigitsFromString(str):
    if "," in str:
        str = str.split(",")[0]
    priceStr = ""
    for k in re.findall('\d+', str):
        priceStr += k
    return priceStr



#APPENDIX 1 - CONTENTS OF THE TRROW 
#<tr aid="46401" class="rowstyle" valign="top">
#<td class="imgCol"><a class="advertLink" href="/bolig.aspx?aid=46401&amp;s=2"><img src="/FBNImages/o_1b7n82mvvcq6fn81clsqba1aeaf_90x60.jpg"/></a></td><td><a class="advertLink" href="/bolig.aspx?aid=46401&amp;s=2" style="color:black;" title="Margretheholmen"><b>Margretheholmsvej  24, 4. th</b><br/>1432 København K</a></td><td style="text-align:center;">3</td><td style="text-align:center;">98</td><td style="text-align:right;">14.776,49 kr.<br/>1.020,00 kr.</td><td style="text-align:right;">01-05-2021</td><td style="height:52px;width:100px;text-align:center;vertical-align:middle;padding-left:0px;padding-right:0px;"><img alt="PKA_Logo_2014" src="/FBNImages/23faf18d-8f50-4b55-97e1-060dac0f8372.png" title="PKA_Logo_2014"/></td>
#</tr>