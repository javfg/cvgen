#! /usr/bin/env python3

import base64

import frontmatter
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

options = Options()
options.add_argument("--window-size=1920,1200")
options.add_argument("--headless")

driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()), options=options
)

with open("src/content/header.md") as f:
    header = frontmatter.load(f)
    firstname = header.metadata.get("firstname", "").lower()
    lastname = header.metadata.get("lastname", "").lower()
    cv_filename = f"{firstname}{lastname}-curriculumvitae.pdf"
    cl_filename = f"{firstname}{lastname}-coverletter.pdf"

driver.get("http://localhost:9000")

cvpdf = driver.execute_cdp_cmd(
    "Page.printToPDF", {"printBackground": False, "displayHeaderFooter": False}
)

with open(cv_filename, "wb") as f:
    f.write(base64.b64decode(cvpdf["data"]))

driver.find_element(value="button-cl").click()

clpdf = driver.execute_cdp_cmd(
    "Page.printToPDF", {"printBackground": False, "displayHeaderFooter": False}
)

with open(cl_filename, "wb") as f:
    f.write(base64.b64decode(clpdf["data"]))

driver.quit()
