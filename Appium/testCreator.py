from typing import Dict, List, Optional, Union
from appium import webdriver
from appium.options.common.base import AppiumOptions
from appium.webdriver.appium_connection import AppiumConnection
from appium.webdriver.common.appiumby import AppiumBy
from appium.webdriver.webdriver import WebDriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

desiredCapabilities = {
  "deviceName": "Pixel",
  "udid": "emulator-5554",
  "platformName": "Android",
  "platformVersion": "11"
}

class Navigator(webdriver.Remote, AppiumBy):
    def __init__(self, command_executor: str | AppiumConnection = 'http://127.0.0.1:4444/wd/hub', desired_capabilities: Dict | None = None, browser_profile: str | None = None, proxy: str | None = None, keep_alive: bool = True, direct_connection: bool = True, extensions: List[WebDriver] | None = None, strict_ssl: bool = True, options: AppiumOptions | List[AppiumOptions] | None = None):
        super().__init__(command_executor, desired_capabilities, browser_profile, proxy, keep_alive, direct_connection, extensions, strict_ssl, options)

    def initialArguments(self, routine:list):
        self.acciones:list = routine

    def selectElement(self, location:str):
        wait = WebDriverWait(self, 30)
        wait.until(EC.element_to_be_selected((self.XPATH, location)))
        return self.find_element(by=AppiumBy.XPATH, value=location)

    def clickElement(self, location:str):
        self.selectElement(location).click()

    def typeElement(self, location:str, content:str):

        #Seleccionamos el input
        element = self.selectElement(location)
        #Damos click al input para que pueda reconocer el teclado
        element.click()
        #Enviamos las credenciales
        element.send_keys(content)
        #Cerramos el teclado de android
        self.back()

    def executeRoutine(self):
        for accion in self.acciones:
            location = accion["location"]
            command = accion["command"]
            
            if not command == 'click':
                content = accion["content"]
                self.typeElement(location, content)
            
            self.clickElement(location)
        
test = Navigator('http://127.0.0.1:4723/wd/hub', desiredCapabilities)
test.initialArguments()