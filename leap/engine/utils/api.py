import requests
from requests import Request
import json
import pandas as pd
import time
import os
import time
import webbrowser
import sys
# http://www.strava.com/oauth/authorize?client_id=57478&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=profile:read_all,activity:read_all
class StravaApi:

    def __init__(self):
        base_address = 'https://www.strava.com/oauth/authorize'
        params = ({'client_id': 57478,
                'redirect_uri': 'http://localhost',
                'response_type': 'code',
                'approval_prompt': 'auto',
                'scope': 'activity:read_all'})

        # Prepare the authorization code GET request and open it in a
        # browser window
        authorization_request = Request('GET', base_address, params=params).prepare()
        webbrowser.open(authorization_request.url)
        # webbrowser.open(auth.url)
        # TODO: Get the authorization code back from the response
        # automatically. Currently, the code must be manually copied from
        # the URL response in the browser window.
        auth_code = str(input("Enter authorization code: "))

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
        ## If access_token has expired then use the refresh_token to get the new access_token
        if strava_tokens['expires_at'] < time.time():
        #Make Strava auth API call with current refresh token
            response = requests.post(
                                url = 'https://www.strava.com/oauth/token',
                                data = {
                                        'client_id': 57478,
                                        'client_secret': '8ea59ac199e9069c3dd6bdcb35d408a9acbecff2',
                                        'grant_type': 'refresh_token',
                                        'refresh_token': strava_tokens['refresh_token']
                                        }
                            )
        #Save response as json in new variable
            new_strava_tokens = response.json()
        # Save new tokens to file
            with open('strava_tokens.json', 'w') as outfile:
                json.dump(new_strava_tokens, outfile)
        #Use new Strava tokens from now
            strava_tokens = new_strava_tokens
        #Loop through all activities
        page = 1
        url = "https://www.strava.com/api/v3/activities"
        access_token = strava_tokens['access_token']
        ## Create the dataframe ready for the API call to store your activity data
        activities = pd.DataFrame(
            columns = [
                    "id",
                    "name",
                    "start_date_local",
                    "type",
                    "distance",
                    "moving_time",
                    "elapsed_time",
                    "total_elevation_gain",
                    "end_latlng",
                    "external_id"
            ]
        )
        while True:
            
            # get page of activities from Strava
            r = requests.get(url + '?access_token=' + access_token + '&per_page=200' + '&page=' + str(page))
            r = r.json()
        # if no results then exit loop
            if (not r):
                break
            
            # otherwise add new data to dataframe
            for x in range(len(r)):
                activities.loc[x + (page-1)*200,'id'] = r[x]['id']
                activities.loc[x + (page-1)*200,'name'] = r[x]['name']
                activities.loc[x + (page-1)*200,'start_date_local'] = r[x]['start_date_local']
                activities.loc[x + (page-1)*200,'type'] = r[x]['type']
                activities.loc[x + (page-1)*200,'distance'] = r[x]['distance']
                activities.loc[x + (page-1)*200,'moving_time'] = r[x]['moving_time']
                activities.loc[x + (page-1)*200,'elapsed_time'] = r[x]['elapsed_time']
                activities.loc[x + (page-1)*200,'total_elevation_gain'] = r[x]['total_elevation_gain']
                activities.loc[x + (page-1)*200,'end_latlng'] = r[x]['end_latlng']
                activities.loc[x + (page-1)*200,'external_id'] = r[x]['external_id']
        # increment page
            page += 1
        activities.to_csv('strava_activities.csv')
        return activities
