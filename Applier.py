from datetime import datetime
from pyvirtualdisplay import Display
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
import time
from Classes import Apartment
from PythonConfig import LocalMachine, VPy, WetRun, HeadlessBrowser
import os

def ApplyForFindBoligApartment(apartment):
    
    apartmentExtID = apartment.extId
    if VPy:
        print("Applying for apartment at {address}".format(address=apartment.streetAddress))

    applyURL = 'http://findbolig.nu/Findbolig-nu/Find%20bolig/Ledige%20boliger/Boligpraesentation/Boligen.aspx?aid={0}'.format(apartmentExtID)
    loginURL = "http://findbolig.nu/logind.aspx"

    #Set Headless'ness equal to the Python running Configuration
    options = Options()
    options.headless=HeadlessBrowser
    options.add_argument("window-size=1600,800")
    
    try:
        if LocalMachine:
            #Loads from /Scripts
            browser = webdriver.Chrome(options=options)
            #TODO test with PhantomJS instead https://realpython.com/headless-selenium-testing-with-python-and-phantomjs/
        else:
            browser = webdriver.Chrome(options=options)

        #1. Get Login Page
        browser.get(loginURL)
        #Cookes decline
        cookies_decline = browser.find_element_by_id("declineButton")
        cookies_decline.click()

        #1A: Log in
        username = browser.find_element_by_name("ctl00$placeholdercontent_1$txt_UserName")
        password = browser.find_element_by_name("ctl00$placeholdercontent_1$txt_Password")
        username.send_keys("christiangotstad")
        password.send_keys("ajm83d9021kk")
        login_attempt = browser.find_element_by_id("ctl00_placeholdercontent_1_but_LoginShadow")
        login_attempt.click()

        #2. Get apartment page
        browser.get(applyURL)
       
        #First check if we have already applied by locating button
        try:
            applyButton = browser.find_element_by_id("ctl00_placeholdercontentright_1_but_Signup")
        except NoSuchElementException:
            filename = "{date}.png".format(date=time.strftime("%Y%m%d-%H%M%S"))
            browser.save_screenshot(filename)
            if VPy:
                print("Error in locating the Ansoeg button, maybe last warning - screenshot stored in {0}".format(filename))
            return 5
        except:
            if VPy:
                print("Some other error in ansoeg button not defined")
            return 6
        
        #Check if ButtonDisabled is one of the CSS classes of the signup button
        #If it is disabled
        if 'ButtonDisabled' in applyButton.get_attribute('class').split():
            if VPy: 
                print("Apartment is already applied")
            return 1
        else:#If it is not disabled, click it if WetRun
            if VPy:
                print("Apartment being applied")
            if WetRun: #Check whether system is Wet Run
                applyButton.click()
        
        #Check that application was correctly applied
        browser.get(applyURL)
        applyButton = browser.find_element_by_id("ctl00_placeholdercontentright_1_but_Signup")

        if not WetRun: #WetRun False returns 4 - button will not have been disabled.
                if VPy:
                    print("Exiting before confirmation of ApplyButton disabled due to WetRun")
                return 4

        if 'ButtonDisabled' in applyButton.get_attribute('class').split():
            if VPy: 
                print("Apartment has been correctly applied")
            return 2
        else:
            #Some error - apartment Ansoeg knap is not disabled
            if VPy:
                print("Apartment button somehow not disabled after applying")
            return 3

    finally:
        browser.quit()
