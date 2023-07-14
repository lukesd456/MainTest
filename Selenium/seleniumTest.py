from typing import List, Union
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.options import BaseOptions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, InvalidSessionIdException
import copy
import uuid
import json

class Navigator(webdriver.Remote, By):

    def __init__(self, command_executor="http://127.0.0.1:4444", keep_alive=True, file_detector=None, options: BaseOptions | List[BaseOptions] = None) -> None:
        super().__init__(command_executor, keep_alive, file_detector, options)

    def initialArguments(self, url:str, test):

        self.targetURL:str = url
        self.test = test
        self.sucesos:list = []

    def registrarSuceso(self, tipoDeTest:str, indice:int, advertencias:list, action:dict):

        reporte = {
            "tipoDeTest" : tipoDeTest,
            "indice" : indice,
            "advertencias" : advertencias,
            "action" : action
        }

        self.sucesos.append(reporte)

    def selectElementByXPATH(self, location:str):
        WebDriverWait(driver=self, timeout=30).until(EC.presence_of_element_located((self.XPATH, location)))
        self.element = self.find_element(by=self.XPATH, 
        value=location)

    def selectElementByCssSelector(self, location:str):
        WebDriverWait(driver=self, timeout=30).until(EC.presence_of_element_located((self.CSS_SELECTOR, location))) 
        self.element = self.find_element(by=self.CSS_SELECTOR, 
        value=location)

    def filterSelector(self, target):
        location = target["location"]
        detail = target["detail"]

        match detail:
            case 'css':
                self.selectElementByCssSelector(location)
            case 'xpath':
                self.selectElementByXPATH(location)

    def initSession(self):
        
        self.get(self.targetURL)
        self.set_window_size(1500,1000)

    def validateClick(self, validador:bool, advertencias:list):

        if validador:
            print('validando')

            pagesource:str = self.page_source
            errorEncontrado:bool = False

            for a in advertencias:

                if a in pagesource:
                    errorEncontrado = True
                    break
            
            if errorEncontrado:
                print('validacion cumplida')
                raise AssertionError
            else:
                print('error')
                raise AssertionError

    def executeValidatorRoutine(self):

        self.initSession()

        #Instancias de ValidatorTest -> validatorSchemas.js
        advertencias = self.test["advertencias"]
        commands = self.test["commands"]
        tipoDeTest = self.test["tipoDeTest"]
        index = self.test["index"]

        for c in commands:

            command = c["command"]
            target = c["target"]

            self.filterSelector(target)

            if command == 'click':
                    
                    validador = c["validador"]
                    self.element.click()

                    try:
                        self.validateClick(validador, advertencias)
                    except AssertionError:
                        break
                    
            else:
                value = c["value"]
                print(value)
                self.element.send_keys(value)

        self.quit()