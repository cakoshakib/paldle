from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import os
from dotenv import load_dotenv

load_dotenv()

champions = ["Sha Lin"]

driver = webdriver.Chrome(os.environ["GECKO_PATH"])

realm_stats_url = "https://realmstats.gg/champions"
driver.get(realm_stats_url)

champion_input = driver.find_element(by=By.XPATH, value='//*[@id="rc_select_0"]')
for champion in champions:
    champion_input.send_keys(champion)
    champion_input.send_keys(Keys.ENTER)
    
