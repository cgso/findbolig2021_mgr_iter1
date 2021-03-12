import sqlite3
from Classes import Apartment
from Classes import ApartmentList

from FindBoligScraper import ReturnApartmentListFromApartmentQuery
from Classes import AptQuery








#
# SQLLITE ONLY IMPLEMENTATION 
#
#



def SQLliteGeneralAssertion():
    conn = sqlite3.connect('test.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE TEST (test text)''')
    c.execute("INSERT INTO TEST VALUES ('Test insertion 1')")
    c.execute("INSERT INTO TEST VALUES ('Test insertion 2')")
    conn.commit()
    result = c.execute("SELECT * FROM TEST")
    print(result.fetchall())
    c.execute("DROP TABLE TEST")
    conn.commit()
    conn.close()

def SQLLiteCreateFindBoligSchema():
    conn = sqlite3.connect('findbolig.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE Apartments (title text, rent real, sqm real, extId text, availableFrom text, apartmentURL text, city text, streetAddress text, norooms text, postalcode real)''')
    c.execute('''CREATE TABLE ApartmentQueries (title text, rentMax real, minSqm real, address text)''')
    conn.commit()
    result = c.execute("select name from sqlite_master where type = 'table'")
    #print(result.fetchall())
    conn.close()

def SQLLiteDropFindBoligSchema():
    conn = sqlite3.connect('findbolig.db')
    c = conn.cursor()
    c.execute("DROP TABLE Apartments")
    c.execute("DROP TABLE ApartmentQueries")
    conn.commit()
    result = c.execute("select name from sqlite_master where type = 'table'")
    #print(result.fetchall())
    conn.close()

def SQLLiteInsertAptQuery(aptQueryObj):
    aptQuery = aptQueryObj.__dict__
    conn = sqlite3.connect('findbolig.db')
    c = conn.cursor()
    #The below safely insert dict values. Mind that the ToDict keys must match the column names in DB
    #.join() is used because it joins each entry by ', '
    columns = ', '.join(aptQuery.keys())
    #placeholders contain dictKeys, since they are automatically replaced (safely) by the SQL adapter/server 
    placeholders = ':'+', :'.join(aptQuery.keys())
    query = 'INSERT INTO ApartmentQueries (%s) VALUES (%s)' % (columns, placeholders)
    c.execute(query, aptQuery)
    conn.commit()
    conn.close()

def GetAptQuery():
    print()

def SQLLiteInsertOneApartment(apartmentObj):
    'type apartmentObj: Apartment'

    apartmentDict = apartmentObj.__dict__
    conn = sqlite3.connect('findbolig.db')
    c = conn.cursor()
    #The below safely insert dict values. Mind that the ToDict keys must match the column names in DB
    
    #.join() is used because it joins each entry by ', '
    columns = ', '.join(apartmentDict.keys())
    #placeholders contain dictKeys, since they are automatically replaced (safely) by the SQL adapter/server 
    placeholders = ':'+', :'.join(apartmentDict.keys())
    query = 'INSERT INTO Apartments (%s) VALUES (%s)' % (columns, placeholders)
    c.execute(query, apartmentDict)
    conn.commit()
    conn.close()

#Inserts Apartment Dictionary List - see InsertOneApartment for implementation details
def SQLLiteInsertApartmentListNoConflict(apartmentList):
    'type apartmentList: ApartmentList'
    apartmentDictList = apartmentList.GetDictList()
    conn = sqlite3.connect('findbolig.db')
    c = conn.cursor()
    columns = ', '.join(apartmentDictList[0].keys())
    placeholders = ':'+', :'.join(apartmentDictList[0].keys())
    query = 'INSERT INTO Apartments (%s) VALUES (%s)' % (columns, placeholders)
    c.executemany(query, apartmentDictList)
    conn.commit()
    conn.close()

#TODO
#Implement SQLAlchemy as ORM (Object-Relational Mapper) for 
