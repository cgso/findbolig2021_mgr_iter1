import requests
from Classes import ApartmentList
from Classes import Apartment


#Class that can be populated with FindBolig Apartment notifications and send as e-mail to optional recipients provided.
class FindBoligNotification:
    def __init__(self, recipientsList=["christiangotstad@gmail.com"], subject = None, preBody="The following new apartmens have been identified <BR /><BR />"):
        self.preBody = preBody
        self.recipientsList = recipientsList
        self.html = ""
        self.apartmentsList = ApartmentList()

    def AppendApartmentToMessage(self, apartmentObj):
        self.apartmentsList.AppendApartmentToList(apartmentObj)
        

    #Generate some HTML based on the apartments found in the List
    def ReturnApartmentsListToHtml(self):
        html = "<table><tr><td>Address</td><td>Rent</td><td>Sqm</td><td>Applied</td></tr>"
        for apartment in self.apartmentsList.GetList():
            ':type apartment: Apartment'
            appliedText = GetAppliedText(apartment)
            html += '<tr><td><a href="{url}">{address}</a></td><td>{price},0 kr.</td><td>{sqm}</td><td>{appliedNote}</td></tr>'. \
            format(url=apartment.apartmentURL, address="{0} {1}".format(apartment.streetAddress, apartment.postalcode), price=apartment.rent, sqm=apartment.sqm, appliedNote=appliedText)
        html += "</table>"
        return html
    
    def Send(self):
        if self.apartmentsList.GetNoApartmentsInList() == 0:
            return 0

        html = "<html>" + self.preBody + self.html + self.ReturnApartmentsListToHtml() + "</html>"
        subject = "{number} Apartments Found".format(number=self.apartmentsList.GetNoApartmentsInList())
        r = requests.post(
		"https://api.mailgun.net/v3/sandbox4818246ff4b3413b82c28fa4fd47a75b.mailgun.org/messages",
		auth=("api", "key-c64b856b409c7405e990bcb4067e81c1"),
		data={"from": "Me <mailgun@sandbox4818246ff4b3413b82c28fa4fd47a75b.mailgun.org>",
			"to": self.recipientsList,
			"subject": subject,
			"html": html})

        return r.status_code

def GetAppliedText(apartmentObj):
        statusCode = apartmentObj.appliedStatusCode
        appliedMessage = ""
        if statusCode == 0:
            appliedMessage = "Not applied"
        elif statusCode == 1:
            appliedMessage = "Already applied"
        elif statusCode == 2:
            appliedMessage = "Applied"
        elif statusCode == 3:
            appliedMessage = "Applied error"
        elif statusCode == 4:
            appliedMessage = "Wetrun Applied"
        elif statusCode == 5:
            appliedMessage = "Could not identify Ansoeg button. Not applied."
        else:
            appliedMessage = "Unknown error."
        
        return "{0} {1}".format(appliedMessage, apartmentObj.appliedDateTime)