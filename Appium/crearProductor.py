from appium import webdriver
from selenium.webdriver import ActionChains

from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.common.actions.pointer_input import PointerInput
from selenium.webdriver.common.actions import interaction

from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait

import uuid

import random
import string

def generar_palabra_aleatoria(longitud):
    caracteres = string.ascii_letters + string.digits  # Letras mayúsculas, minúsculas y dígitos
    palabra_aleatoria = ''.join(random.choice(caracteres) for _ in range(longitud))
    return palabra_aleatoria

def desplazamiento() -> None :
    actions = ActionChains(driver)
    actions.w3c_actions = ActionBuilder(driver, mouse=PointerInput(interaction.POINTER_TOUCH, "touch"))
    actions.w3c_actions.pointer_action.move_to_location(250, 1800)
    actions.w3c_actions.pointer_action.pointer_down()
    actions.w3c_actions.pointer_action.move_to_location(250, 550)
    actions.w3c_actions.pointer_action.release()
    actions.perform()


driver = {
  "appium:deviceName": "Pixel",
  "appium:udid": "emulator-5554",
  "platformName": "Android",
  "appium:platformVersion": "11"
}

driver = webdriver.Remote('http://127.0.0.1:4723/wd/hub', driver)
driver.implicitly_wait(20)


def crearProductor() -> None:
    el = driver.find_element(by=AppiumBy.XPATH, value='//android.widget.Button[@content-desc="Registrar nuevo productor"]')
    el.click()

    el1 = driver.find_element(by=AppiumBy.XPATH, value="//android.view.View[@content-desc=\"1. Nombres (Obligatorio)\nIngrese los primeros nombres del productor\n2. Apellidos (Obligatorio)\nColoque el primer y segundo apellido del productor\n3. DNI (Obligatorio)\nIngrese su número DNI\n4. Celular principal (Obligatorio)\n 5. Fecha de nacimiento (Opcional)\n6. Operador (Opcional)\n7. Celular secundario (Opcional)\n8. Número de WhatsApp (Opcional)\n9. Tipo de celular (Botones, Táctil) (Opcional)\n10. Género (Opcional)\n11. Dirección del productor (Centro poblado, Comunidad, etc.) (Opcional)\n12. Departamento (Opcional)\n13. Provincia (Opcional)\n14. Distrito (Opcional)\"]/android.widget.EditText[1]")
    el1.click() 
    el1.send_keys(generar_palabra_aleatoria(20))
    driver.back()

    el2 = driver.find_element(by=AppiumBy.XPATH, value="//android.view.View[@content-desc=\"1. Nombres (Obligatorio)\nIngrese los primeros nombres del productor\n2. Apellidos (Obligatorio)\nColoque el primer y segundo apellido del productor\n3. DNI (Obligatorio)\nIngrese su número DNI\n4. Celular principal (Obligatorio)\n 5. Fecha de nacimiento (Opcional)\n6. Operador (Opcional)\n7. Celular secundario (Opcional)\n8. Número de WhatsApp (Opcional)\n9. Tipo de celular (Botones, Táctil) (Opcional)\n10. Género (Opcional)\n11. Dirección del productor (Centro poblado, Comunidad, etc.) (Opcional)\n12. Departamento (Opcional)\n13. Provincia (Opcional)\n14. Distrito (Opcional)\"]/android.widget.EditText[2]")
    el2.click()
    el2.send_keys("ALASTNAME")
    driver.back()

    el3 = driver.find_element(by=AppiumBy.XPATH, value="//android.view.View[@content-desc=\"1. Nombres (Obligatorio)\nIngrese los primeros nombres del productor\n2. Apellidos (Obligatorio)\nColoque el primer y segundo apellido del productor\n3. DNI (Obligatorio)\nIngrese su número DNI\n4. Celular principal (Obligatorio)\n 5. Fecha de nacimiento (Opcional)\n6. Operador (Opcional)\n7. Celular secundario (Opcional)\n8. Número de WhatsApp (Opcional)\n9. Tipo de celular (Botones, Táctil) (Opcional)\n10. Género (Opcional)\n11. Dirección del productor (Centro poblado, Comunidad, etc.) (Opcional)\n12. Departamento (Opcional)\n13. Provincia (Opcional)\n14. Distrito (Opcional)\"]/android.widget.EditText[3]")
    el3.click()
    el3.send_keys("73172672")
    driver.back()

    el4 = driver.find_element(by=AppiumBy.XPATH, value="//android.view.View[@content-desc=\"1. Nombres (Obligatorio)\nIngrese los primeros nombres del productor\n2. Apellidos (Obligatorio)\nColoque el primer y segundo apellido del productor\n3. DNI (Obligatorio)\nIngrese su número DNI\n4. Celular principal (Obligatorio)\n 5. Fecha de nacimiento (Opcional)\n6. Operador (Opcional)\n7. Celular secundario (Opcional)\n8. Número de WhatsApp (Opcional)\n9. Tipo de celular (Botones, Táctil) (Opcional)\n10. Género (Opcional)\n11. Dirección del productor (Centro poblado, Comunidad, etc.) (Opcional)\n12. Departamento (Opcional)\n13. Provincia (Opcional)\n14. Distrito (Opcional)\"]/android.widget.EditText[4]")
    el4.click()
    el4.send_keys("968532084")
    driver.back()

    el5 = driver.find_element(by=AppiumBy.XPATH, value="//android.view.View[@content-desc=\"1. Nombres (Obligatorio)\nIngrese los primeros nombres del productor\n2. Apellidos (Obligatorio)\nColoque el primer y segundo apellido del productor\n3. DNI (Obligatorio)\nIngrese su número DNI\n4. Celular principal (Obligatorio)\n 5. Fecha de nacimiento (Opcional)\n6. Operador (Opcional)\n7. Celular secundario (Opcional)\n8. Número de WhatsApp (Opcional)\n9. Tipo de celular (Botones, Táctil) (Opcional)\n10. Género (Opcional)\n11. Dirección del productor (Centro poblado, Comunidad, etc.) (Opcional)\n12. Departamento (Opcional)\n13. Provincia (Opcional)\n14. Distrito (Opcional)\"]/android.view.View")
    el5.click()

    el6 = driver.find_element(by=AppiumBy.XPATH, value="//android.view.View[@content-desc=\"SELECCIONAR FECHA\nmié., 19 jul.\"]/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[32]")
    el6.click()

    el7 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="13, jueves, 13 de julio de 2023")
    el7.click()

    el8 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="ACEPTAR")
    el8.click()
    driver.back()

    desplazamiento()
    desplazamiento()


    el9 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="17. Fecha (Obligatorio)")
    el9.click()

    el10 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="6, jueves, 6 de julio de 2023")
    el10.click()

    el11 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="ACEPTAR")
    el11.click()
    driver.back()

    desplazamiento()
    desplazamiento()
    desplazamiento()

    el12 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Siguiente")
    el12.click()

    el13 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="ACEPTAR")
    el13.click()

    el14 = driver.find_element(by=AppiumBy.XPATH, value="//android.view.View[@content-desc=\"1. Nombre (Obligatorio)\n2. Área total en hectáreas (Obligatorio)\n3. Tenencia de la unidad productiva (Obligatorio)\n4. Cultivo principal (Obligatorio)\n5. Cultivo(s) secundario(s)(opcional) (Opción múltiple)\n8. Dirección unidad productiva (Centro poblado, Comunidad, etc.) (Opcional)\n9. Departamento (Opcional)\n10. Provincia (Opcional)\n11. Distrito (Opcional)\"]/android.widget.EditText[1]")
    el14.click()
    el14.send_keys(generar_palabra_aleatoria(20))
    driver.back()

    el15 = driver.find_element(by=AppiumBy.XPATH, value="//android.view.View[@content-desc=\"1. Nombre (Obligatorio)\n2. Área total en hectáreas (Obligatorio)\n3. Tenencia de la unidad productiva (Obligatorio)\n4. Cultivo principal (Obligatorio)\n5. Cultivo(s) secundario(s)(opcional) (Opción múltiple)\n8. Dirección unidad productiva (Centro poblado, Comunidad, etc.) (Opcional)\n9. Departamento (Opcional)\n10. Provincia (Opcional)\n11. Distrito (Opcional)\"]/android.widget.EditText[2]")
    el15.click()
    el15.send_keys("10000")
    driver.back()

    el16 = driver.find_element(by=AppiumBy.XPATH, value="//android.view.View[@content-desc=\"1. Nombre (Obligatorio)\n2. Área total en hectáreas (Obligatorio)\n3. Tenencia de la unidad productiva (Obligatorio)\n4. Cultivo principal (Obligatorio)\n5. Cultivo(s) secundario(s)(opcional) (Opción múltiple)\n8. Dirección unidad productiva (Centro poblado, Comunidad, etc.) (Opcional)\n9. Departamento (Opcional)\n10. Provincia (Opcional)\n11. Distrito (Opcional)\"]/android.widget.Button")
    el16.click()

    el17 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Arrendatario")
    el17.click()

    el18 = driver.find_element(by=AppiumBy.XPATH, value="//android.view.View[@content-desc=\"1. Nombre (Obligatorio)\n2. Área total en hectáreas (Obligatorio)\n3. Tenencia de la unidad productiva (Obligatorio)\n4. Cultivo principal (Obligatorio)\n5. Cultivo(s) secundario(s)(opcional) (Opción múltiple)\n8. Dirección unidad productiva (Centro poblado, Comunidad, etc.) (Opcional)\n9. Departamento (Opcional)\n10. Provincia (Opcional)\n11. Distrito (Opcional)\"]/android.widget.Button[2]")
    el18.click()

    el19 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Alcachofa Blanca De Tudela")
    el19.click()

    desplazamiento()
    desplazamiento()

    el20 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="14. Selecciona la fecha de la última campaña (Obligatorio)")
    el20.click()

    el21 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="7, viernes, 7 de julio de 2023")
    el21.click()

    el22 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="ACEPTAR")
    el22.click()

    desplazamiento()

    el23 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Siguiente")
    el23.click()

    el24 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="ACEPTAR")
    el24.click()

for i in range(0,5):
    print(i)
    crearProductor()