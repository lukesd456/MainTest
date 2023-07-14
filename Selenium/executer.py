from seleniumTest import Navigator
from selenium import webdriver
import json
import copy

#Declaramos la ruta que posee la data
path = '../Results/validatorTests.json'

#Declaramos la url de webdriver
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

#Declaramos la variable sucesos como vacia
sucesos = []

def executeScript(path:str, drivers:list) -> list:

    #Abrimos la data del json
    with open(path, "r", encoding='utf-8') as file:
        jsonData = json.load(file)

    #Declaramos variables que nos interesen
    url = jsonData["targetURL"]
    tests:list = jsonData["tests"]
    
    for t in tests:
        for driver in drivers:
            result = Navigator(command_executor=webdriver_url, options=driver)
            result.initialArguments(url=url, test=t)
            result.executeValidatorRoutine()

            if len(result.sucesos) != 0:
                sucesos.append(result.sucesos)


executeScript(path, drivers)

data = {
    "sucesos" : sucesos
}

#Crear JSON con sucesos
if len(sucesos) > 0:
    with open('data.json', "w", encoding='utf-') as file:
        json.dump(data, file, ensure_ascii=False)