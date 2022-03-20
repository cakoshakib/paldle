from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()
champions_info  = []
ignore_champs = ['Azaan', 'VII', 'Betty La Bomba']

def get_champ_info():
    champion_list_url = "https://paladins.fandom.com/wiki/List_of_Champions"
    page = requests.get(champion_list_url)
    soup = BeautifulSoup(page.content, "html.parser")

    for row in soup.find_all('table')[0].tbody.find_all('tr'):
        try:
            champ = row.find_all('td')[1].find_all('a')[1].contents[0]
            champ_class = str(row.find_all('td')[2].find(text=True))
            if champ not in ignore_champs:
                champions_info.append({'name': champ, 'class': champ_class.strip()})
        except:
            pass

get_champ_info()

driver = webdriver.Chrome(os.environ["GECKO_PATH"])

for champion_info in champions_info:
    realm_stats_url = "https://realmstats.gg/champions"
    driver.get(realm_stats_url)

    champion_input = driver.find_element(by=By.XPATH, value='//*[@id="rc_select_0"]')

    champion = champion_info['name']
    champion_input.send_keys(champion)
    champion_input.send_keys(Keys.ENTER)

    match_count = driver.find_element(by=By.XPATH, value='//*[@id="root"]/div/header[2]/div[1]/div[3]/div[5]/div[1]/span/h1').text
    champion_info["match_count"] = match_count
    health = driver.find_element(by=By.XPATH, value='//*[@id="root"]/div/header[2]/div[1]/div[3]/div[3]/ul/li[1]').text
    champion_info["health"] = health

with open('champions.json', 'w+') as f:
    json.dump(champions_info, f)

print(champions_info)
