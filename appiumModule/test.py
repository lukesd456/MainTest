from appium import webdriver
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait

wait = WebDriverWait()

driver = {
  "appium:deviceName": "Pixel",
  "appium:udid": "emulator-5554",
  "platformName": "Android",
  "appium:platformVersion": "11"
}

driver = webdriver.Remote('http://127.0.0.1:4723/wd/hub', driver)
driver.implicitly_wait(50)
driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value='Stage - Agros Connect').click()
driver.find_element(by=AppiumBy.XPATH, value='//android.view.View[@content-desc="Iniciar sesión"]/android.view.View/android.widget.EditText[1]/android.widget.EditText').click()
driver.find_element(by=AppiumBy.XPATH, value='//android.view.View[@content-desc="Iniciar sesión"]/android.view.View/android.widget.EditText[1]/android.widget.EditText').send_keys('qa_user')
driver.find_element(by=AppiumBy.XPATH, value='//android.view.View[@content-desc="Iniciar sesión"]/android.view.View/android.widget.EditText[2]/android.widget.EditText').click()
driver.find_element(by=AppiumBy.XPATH, value='//android.view.View[@content-desc="Iniciar sesión"]/android.view.View/android.widget.EditText[2]/android.widget.EditText').send_keys('agROS_2023')

driver.back()

driver.find_element(by=AppiumBy.XPATH, value='//android.widget.Button[@content-desc="Ingresar"]').click()