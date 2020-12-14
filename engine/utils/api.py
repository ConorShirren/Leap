import requests
from requests import Request
import json
import pandas as pd
import time
import os
import time
import webbrowser
import sys
from selenium import webdriver
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
import re

# http://www.strava.com/oauth/authorize?client_id=57478&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=profile:read_all,activity:read_all


class StravaApi:

    def __init__(self):
        self = self

    def AuthenticateApi(self, email, password):
        # self.email = email
        # self.password = password
        base_address = 'https://www.strava.com/oauth/authorize'
        params = ({'client_id': 57478,
                   'redirect_uri': 'http://localhost',
                   'response_type': 'code',
                   'approval_prompt': 'auto',
                   'scope': 'activity:read_all'})

        # Prepare the authorization code GET request and open it in a
        # browser window
        authorization_request = Request(
            'GET', base_address, params=params).prepare()
        options = webdriver.ChromeOptions()
        options.headless = False
        options.add_argument('--ignore-certificate-errors')
        options.add_argument("--test-type")
        driver = webdriver.Chrome(
            chrome_options=options, executable_path="/usr/local/bin/chromedriver")
        driver.get(authorization_request.url)
        driver.find_element_by_id("email").send_keys(email)
        driver.find_element_by_id("password").send_keys(password)
        submit_button = driver.find_element_by_id("login-button")
        submit_button.click()
        WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.ID, 'authorize')))
        auth_button = driver.find_element_by_id("authorize")
        auth_button.click()
        WebDriverWait(driver, 3)
        authUrl = driver.current_url
        auth_code = re.search("(?<=code=)(.*?)(?=\&)", authUrl).group(0)
        # Make Strava auth API call
        response = requests.post(
            url='https://www.strava.com/oauth/token',
            data={
                'client_id': 57478,
                'client_secret': '8ea59ac199e9069c3dd6bdcb35d408a9acbecff2',
                'code': auth_code,
                'grant_type': 'authorization_code'
            }
        )
        # Save json response as a variable
        strava_tokens = response.json()
        # Save tokens to file
        with open('strava_tokens.json', 'w') as outfile:
            json.dump(strava_tokens, outfile)
        # Open JSON file and print the file contents
        # to check it's worked properly
        with open('strava_tokens.json') as check:
            data = json.load(check)

    def GetActivities(self):
        with open('strava_tokens.json') as json_file:
            strava_tokens = json.load(json_file)
        # If access_token has expired then use the refresh_token to get the new access_token
        if strava_tokens['expires_at'] < time.time():
            # Make Strava auth API call with current refresh token
            response = requests.post(
                url='https://www.strava.com/oauth/token',
                data={
                    'client_id': 57478,
                    'client_secret': '8ea59ac199e9069c3dd6bdcb35d408a9acbecff2',
                    'grant_type': 'refresh_token',
                    'refresh_token': strava_tokens['refresh_token']
                }
            )
        # Save response as json in new variable
            new_strava_tokens = response.json()
        # Save new tokens to file
            with open('strava_tokens.json', 'w') as outfile:
                json.dump(new_strava_tokens, outfile)
        # Use new Strava tokens from now
            strava_tokens = new_strava_tokens
        # Loop through all activities
        page = 1
        url = "https://www.strava.com/api/v3/activities"
        access_token = strava_tokens['access_token']
        # Create the dataframe ready for the API call to store your activity data
        activities = pd.DataFrame(
            columns=[
                "start_date_local",
                "type",
                "distance",
                "elapsed_time",
                "average_speed",
                "total_elevation_gain",
                "kudos_count",
                "max_heartrate"
            ]
        )
        while True:

            # get page of activities from Strava
            r = requests.get(url + '?access_token=' + access_token +
                             '&per_page=200' + '&page=' + str(page))
            r = r.json()
        # if no results then exit loop
            if (not r):
                break

            # otherwise add new data to dataframe
            for x in range(len(r)):
                activities.loc[x + (page-1)*200,'start_date_local'] = r[x]['start_date_local']
                activities.loc[x + (page-1)*200, 'type'] = r[x]['type']
                activities.loc[x + (page-1)*200, 'distance'] = r[x]['distance'] # /1000
                activities.loc[x + (page-1)*200, 'elapsed_time'] = r[x]['elapsed_time']
                activities.loc[x + (page-1)*200, 'average_speed'] = r[x]['average_speed'] # (1/r[x]['average_speed'])*1000/60
                activities.loc[x + (page-1)*200, 'kudos_count'] = r[x]['kudos_count']
                activities.loc[x + (page-1)*200, 'total_elevation_gain'] = r[x]['total_elevation_gain']
                if (r[x]['has_heartrate'] == True):
                    activities.loc[x + (page-1)*200, 'max_heartrate'] = r[x]['max_heartrate']
                    activities.loc[x + (page-1)*200, 'average_heartrate'] = r[x]['average_heartrate']
                else:
                    activities.loc[x + (page-1)*200, 'max_heartrate'] = 0
                    activities.loc[x + (page-1)*200, 'average_heartrate'] = 0

        # increment page
            page += 1
        activities.to_csv('strava_activities.csv')

        self.activities = activities
        return activities

    def GetActivity(self, type):
        activities = self.GetActivities()
        activity = activities[activities['type'] == type]
        return activity

    def GetByDistance(self, distance ):
        data = self.GetActivities()
        distances = data[(data['distance'] >= 5000) & (data['distance'] <= 5050) & (data['type'] == "Run")]
        return distances