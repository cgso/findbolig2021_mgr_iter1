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
        html = "<table><tr><td>Address</td><td>Rent</td><td>SQM</td></tr>"
        for apartment in self.apartmentsList.GetList():
            ':type apartment: Apartment'
            html += '<tr><td><a href="{url}">{address}</a></td><td>{price},0 kr.</td><td>{sqm}</td></tr>'. \
            format(url=apartment.apartmentURL, address="{0} {1}".format(apartment.streetAddress, apartment.postalcode), price=apartment.rent, sqm=apartment.sqm)
        html += "</table>"
        return html
    
    def Send(self):
        html = "<html>" + self.preBody + self.html + self.ReturnApartmentsListToHtml() + "</html>"
        subject = "{number} Apartments Found".format(number=self.apartmentsList.GetNoApartmentsInList())
        r = requests.post(
		"https://api.mailgun.net/v3/sandbox4818246ff4b3413b82c28fa4fd47a75b.mailgun.org/messages",
		auth=("api", "key-c64b856b409c7405e990bcb4067e81c1"),
		data={"from": "Me <mailgun@sandbox4818246ff4b3413b82c28fa4fd47a75b.mailgun.org>",
			"to": self.recipientsList,
			"subject": subject,
			"html": html})
        #Tell the list that an e-mail has been sent and persist to DB
        if r.status_code == 200:
            self.apartmentsList.PersistEmailSent()
        return r.status_code

