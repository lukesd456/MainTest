from appium import webdriver
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait

driver = {
  "appium:deviceName": "Pixel",
  "appium:udid": "emulator-5554",
  "platformName": "Android",
  "appium:platformVersion": "11"
}

driver = webdriver.Remote('http://127.0.0.1:4723/wd/hub', driver)
driver.implicitly_wait(50)
el1 = driver.find_element(by=AppiumBy.XPATH, value="//android.view.View[@content-desc=\"Iniciar sesión\"]/android.view.View/android.widget.EditText[1]/android.widget.EditText")
el1.click()
el1.send_keys("qa_app_user")
el2 = driver.find_element(by=AppiumBy.XPATH, value="//android.view.View[@content-desc=\"Iniciar sesión\"]/android.widget.ScrollView/android.widget.EditText[2]/android.widget.EditText")
el2.click()
el2.send_keys("agROS_2023")
el3 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.CheckBox")
el3.click()
driver.back()
el4 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Ingresar")
el4.click()