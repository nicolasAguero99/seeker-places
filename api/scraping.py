from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import re

URL_BASE = 'https://www.google.com/maps/'

# def web_scraping(url_web: str):
def web_scraping(location: str, places_length: int):
  print('\n--------------\n')
  # location = input('Ingrese la ubicación: ')
  driver = webdriver.Chrome()
  driver.set_window_size(1000, 880)
  # Abrir la página en el navegador
  driver.get(URL_BASE)
  # Simular el scroll hacia abajo varias veces para cargar más contenido
  # for _ in range(5):  # Cambia el número de veces que haces scroll según tus necesidades
  #     # Scroll hasta el final de la página
  #     driver.execute_script("document.getElementsByClassName('m6QErb DxyBCb kA9KIf dS8AEf')[0].scrollTop = document.getElementsByClassName('m6QErb DxyBCb kA9KIf dS8AEf')[0].scrollHeight;")
  #     # Esperar a que se cargue el nuevo contenido
  #     time.sleep(2)  # Puedes ajustar el tiempo de espera según la velocidad de carga de la página

  places = []
  # soup = BeautifulSoup(driver.page_source, 'html.parser')
  # elements = soup.find_all('span', {'aria-label': pattern})
  # elements = soup.find_all('button')
  # search by xpath
  # elements = driver.find_element("xpath", '/html/body/div[2]/div[3]/div[8]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div[9]/div[1]/div/div/div[4]/div[1]/span[1]')
  # find elements by id 'searchboxinput'
  input_search = driver.find_element("id", 'searchboxinput')
  input_search.send_keys(location)
  input_search.send_keys(Keys.ENTER)
  time.sleep(2)
  restaurants_button = driver.find_element("css selector", '[aria-label="Restaurantes"]')
  restaurants_button.click()
  time.sleep(2)
  try: container_places = driver.find_element("css selector", '[aria-label="Resultados de Restaurantes"]')
  except: container_places = 'nada'
  # print('click', click)
  # click.click()
  # print('click[[[[]', click.get_attribute('class'))
  # children = click.find_elements("xpath", './*')
  children_places = container_places.find_elements("css selector", '& > div:not([class])')
  for x in range(places_length):
    time.sleep(2)
    print('children_places[x].find_elements("xpath"): ', children_places[x].find_elements("class name", 'OcdnDb '))
    if children_places[x].find_elements("class name", 'OcdnDb '): continue
    # driver.execute_script("arguments[0].style.backgroundColor = 'yellow';", children_places[x])
    if children_places[x].get_attribute('class') != '': continue
    if not children_places[x].text: continue
    if not children_places[x].is_enabled(): continue
    print('clicccccccccccccc: ', x)
    children_places[x].click()

    time.sleep(2)  
    try: name = driver.find_element("css selector", '.tAiQdd h1').text
    except: name = ''
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
  # get child elements by aria-label
  # elements = driver.find_elements("xpath", '//span[@aria-label]')
  #now get the text of the aria-label elements
  # elements_data = [element.get_attribute('href') for element in elements]
  # stars = 0
  # starts_empty = 5 * len(elements)
  # print('soup', soup)
  # print('elements', elements)
  # print('name_list', name_list)
  # for data in address_raw:
  #   print('-----------------')
  #   print('data', data.text)
  #   print('-----------------')

  # for element in elements:
  #   stars += int(element['aria-label'].split(' ')[0])
  #   # if stars > 0:
  #   print(f"{stars / len(elements)}/{(starts_empty / len(elements))} = reviews_len: {len(elements)}")
  # return {"filled": stars / len(elements), "total": {starts_empty / len(elements)}, "reviews_len": len(elements)}

  # Cerrar el navegador
  driver.quit()
  
# web_scraping()

# web_scraping('https://www.google.com/maps/search/Restaurantes/@-34.6037016,-58.4140578,17z/data=!3m1!4b1!4m7!2m6!3m5!2sAv.+Corrientes!3s0x95bcca8600a88ccd:0xed3a53d6b2e5ebe7!4m2!1d-58.4108635!2d-34.60403?entry=ttu')

# web_scraping('https://www.google.com/maps/search/Restaurantes/@-22.7614381,-41.9389635,14z/data=!3m1!4b1?entry=ttu')

# web_scraping('https://www.google.com/maps/place/El+Ferroviario+Restaurant+Parrilla/@-34.6272496,-58.5201163,15z/data=!4m8!3m7!1s0x95bcc83812349735:0x2d6b55bbf94d5!8m2!3d-34.6373659!4d-58.5209133!9m1!1b1!16s%2Fg%2F11bv3mqp11?entry=ttu')

# web_scraping('https://www.google.com/maps/place/Bingo+Ciudadela+-+Grupo+Midas/@-34.6327937,-58.5246653,15z/data=!4m8!3m7!1s0x95bcc83fed940e1d:0x26a61311b305d1d2!8m2!3d-34.6395193!4d-58.5303668!9m1!1b1!16s%2Fg%2F1thtfb1s?entry=ttu')