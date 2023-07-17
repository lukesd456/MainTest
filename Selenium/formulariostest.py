from seleniumTest import Navigator
from selenium import webdriver

import json

path = '../Results/formularios.json'

with open(path, "r", encoding='utf-8') as file:
        jsonData = json.load(file)

targetURL = jsonData["targetURL"]

webdriver_url = 'http://localhost:4444/wd/hub'

#Configuraciones de webdriver
firefoxOptions = webdriver.FirefoxOptions()
chromeOptions=webdriver.ChromeOptions()
edgeOptions = webdriver.EdgeOptions()

drivers = [
    firefoxOptions,
    chromeOptions,
    edgeOptions
]

for driver in drivers:
    result = Navigator(command_executor=webdriver_url, options=driver)
    result.initialArguments(targetURL, jsonData)
    result.executeDefaultRoutine()
    print('termin+o')