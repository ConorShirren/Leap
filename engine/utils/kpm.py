from .api import StravaApi as _api


# http://www.strava.com/oauth/authorize?client_id=57478&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=profile:read_all,activity:read_all


class KeyPerformanceMetrics:

    def __init__(self):
        self = self

    def getKPM(self):
        stravaApi = _api()
        data = stravaApi.GetActivities()
        latestRun =  data[data['type'] == "Run"].iloc[0]
        pr5k = data[(data['distance'] >= 5000) & (data['distance'] <= 5050) & (data['type'] == "Run")].sort_values(by=['elapsed_time']).iloc[0]
        pr10k = data[(data['distance'] >= 10000) & (data['distance'] <= 10050) & (data['type'] == "Run")].sort_values(by=['elapsed_time']).iloc[0]
        pr2k = data[(data['distance'] >= 2000) & (data['distance'] <= 2050) & (data['type'] == "Run")].sort_values(by=['elapsed_time']).iloc[0]
        pr8k = data[(data['distance'] >= 8000) & (data['distance'] <= 8050) & (data['type'] == "Run")].sort_values(by=['elapsed_time']).iloc[0]
        breakdown = data['type'].value_counts().rename_axis('activity').reset_index(name='counts')
        # Breakdown of each exercise type for pie chart
        return {
            "latest_run":latestRun,
            "pr5k":pr5k,
            "pr10k":pr10k,
            "pr2k":pr2k,
            "pr8k":pr8k,
            "breakdown": breakdown
        }