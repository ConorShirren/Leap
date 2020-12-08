from .api import StravaApi as _api
# ## Get the tokens from file to connect to Strava
# stravaApi = _api.StravaApi()
# data = stravaApi.GetActivities()
# print(data)



# http://www.strava.com/oauth/authorize?client_id=57478&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=profile:read_all,activity:read_all


class KeyPerformanceMetrics:

    def __init__(self):
        self = self

    def getKPM(self):
        stravaApi = _api()
        data = stravaApi.GetActivities()
        return data