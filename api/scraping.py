from selenium import webdriver
from selenium.webdriver.common.keys import Keys

from selenium.webdriver.chrome.options import Options


from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time
import re

URL_BASE = 'https://www.google.com/maps/'

def test_scraping():
  options = Options()
  chrome_driver_path = './drivers/chromedriver.exe'
  # chrome_options.binary_location = "/path/to/chrome/binary"
  
  options.add_argument('--no-sandbox')
  options.add_argument("--headless")
  options.add_argument('--disable-dev-shm-usage')

  # chrome_options.add_argument("--headless")
  # chrome_options.add_argument("--headless")
  # chrome_options.add_argument("--lang=es")
  # try: driver = webdriver.Chrome()
  try: driver = webdriver.Chrome(options=options)
  except Exception as e:
    print("Error al iniciar el controlador de Chrome:", e)
    driver = None

  if driver is None:
    print("Error: No se pudo cargar el driver de Chrome.")
    return "Error: No se pudo cargar el driver de Chrome."
  else:
    try: driver.get('https://www.google.com/maps/')
    except: return "Error: No se pudo cargar la página."
    if "Google Maps" in driver.title:
      print("SEEEEEEEEEEEE, Conexión exitosa: La página se cargó correctamente.")
      return "SEEEEEEEEEEEE, Conexión exitosa: La página se cargó correctamente."
    else:
      print("Error: No se pudo cargar la página correctamente.")
      return "Error: No se pudo cargar la página correctamente."

# def web_scraping(url_web: str):
def web_scraping(location: str, places_length: int):
  options = Options()
  chrome_driver_path = './drivers/chromedriver.exe'
  # chrome_options.binary_location = "/path/to/chrome/binary"
  
  options.add_argument('--no-sandbox')
  options.add_argument("--headless")
  options.add_argument('--disable-dev-shm-usage')

  # chrome_options.add_argument("--headless")
  # chrome_options.add_argument("--headless")
  # chrome_options.add_argument("--lang=es")

  print('\n--------------\n')
  try: driver = webdriver.Chrome(options=options)
  except Exception as e:
    print("Error al iniciar el controlador de Chrome:", e)
    driver = None
  # driver = webdriver.Chrome()
  driver.set_window_size(1000, 880)
  driver.get(URL_BASE)
  wait = WebDriverWait(driver, 10)

  places = []

  input_search = driver.find_element("id", 'searchboxinput')
  input_search.send_keys(location)
  input_search.send_keys(Keys.ENTER)
  # time.sleep(2)
  restaurants_button = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '[aria-label="Restaurantes"]')))
  restaurants_button.click()
  # time.sleep(2)
  try: container_places = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '[aria-label="Resultados de Restaurantes"]')))
  except: container_places = 'nada'

  children_places = container_places.find_elements("css selector", '& > div:not([class])')
  for x in range(places_length):
    time.sleep(2)
    if children_places[x].find_elements("class name", 'OcdnDb '): continue
    # driver.execute_script("arguments[0].style.backgroundColor = 'yellow';", children_places[x])
    if children_places[x].get_attribute('class') != '': continue
    if not children_places[x].text: continue
    if not children_places[x].is_enabled(): continue
    children_places[x].click()

    time.sleep(2)
    try: name = driver.find_element("css selector", '.tAiQdd h1').text
    except: name = ''
    print('name', driver.find_element("css selector", '.tAiQdd h1').text)
    try: rate = driver.find_element("class name", 'F7nice').text.replace('\n', ' - ')
    except: rate = ''
    try: address = driver.find_element("css selector", '[data-item-id="address"]').text[1:].strip()
    except: address = ''
    try: phone = driver.find_element("css selector", '[data-tooltip="Copiar el número de teléfono"]').text[1:].strip()
    except: phone = ''
    try: price_range = driver.find_element("class name", 'mgr77e').text.replace('·', '')
    except: price_range = ''
    time.sleep(2)
    try: photo = driver.find_element("css selector", f"button[aria-label='Foto de {name}'] > img").get_attribute('src')
    except: photo = ''
    try: features = next((feature.text for feature in driver.find_elements("class name", 'E0DTEd')), '').replace('·', '').replace('  ', '').replace('\n', ', ').replace(' , ', '').replace(',', ' - ')
    except: features = ''
    try: link = driver.current_url
    except: link = ''
    places.append({
      "name": name if name != '' else 'No encontrado',
      "rate": rate if rate != '' else 'No encontrado',
      "address": address if address != '' else 'No encontrado',
      "phone": phone if phone != '' else 'No encontrado',
      "price_range": price_range if price_range != '' else None,
      "photo": photo if photo != '' else 'No encontrado',
      "features": features if features != '' else 'No encontrado',
      "link": link if link != '' else 'No encontrado',
    })
  print('places', places)
  return places

  driver.quit()
  
# web_scraping()

# web_scraping('https://www.google.com/maps/search/Restaurantes/@-34.6037016,-58.4140578,17z/data=!3m1!4b1!4m7!2m6!3m5!2sAv.+Corrientes!3s0x95bcca8600a88ccd:0xed3a53d6b2e5ebe7!4m2!1d-58.4108635!2d-34.60403?entry=ttu')

# web_scraping('https://www.google.com/maps/search/Restaurantes/@-22.7614381,-41.9389635,14z/data=!3m1!4b1?entry=ttu')

# web_scraping('https://www.google.com/maps/place/El+Ferroviario+Restaurant+Parrilla/@-34.6272496,-58.5201163,15z/data=!4m8!3m7!1s0x95bcc83812349735:0x2d6b55bbf94d5!8m2!3d-34.6373659!4d-58.5209133!9m1!1b1!16s%2Fg%2F11bv3mqp11?entry=ttu')

# web_scraping('https://www.google.com/maps/place/Bingo+Ciudadela+-+Grupo+Midas/@-34.6327937,-58.5246653,15z/data=!4m8!3m7!1s0x95bcc83fed940e1d:0x26a61311b305d1d2!8m2!3d-34.6395193!4d-58.5303668!9m1!1b1!16s%2Fg%2F1thtfb1s?entry=ttu')
