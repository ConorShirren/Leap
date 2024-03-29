# Leap - Performance Analysis Engine

__Data Visualisation Application base on Strava APIs :fire:__

![project](/assets/project.png)


A Full Stack Web application built on Django Rest Framework and Angular which utilizes Stravas APIs to provide visualization of performance analysis in each activity recorded on your Strava Account. This projects uses the [Swagger API Playground](https://developers.strava.com/playground/) as backbone, which allows the user to obtain activity data on authentication
__WARNING__: The APIs used in this project does not allow the ability to create activities.

For more information on the Strava APIs available, see [Strava Developers Documentation](https://developers.strava.com/).

---

## :closed_book: Table of Contents

- [Requirements](#hammer_and_wrench-requirements)
- [Strava API & Analysis Engine](#open_file_folder-engine)
- [Application in Action](#fire-application)
- [Credits](#computer-credits)

---

## :hammer_and_wrench: Requirements

First of all you will need to make sure that you have Python 3, pip and npm installed, as it is
required by `Django` while using this application to integrate with the Strava APIs.

```bash
pip3 install -r requirements.txt
```

Then you can proceed with the installation of the installation of required node modules for our Angular client

```bash
cd client
npm update
npm install
```

If you have any problems regarding this installation, please see 
[Django](https://docs.djangoproject.com/en/3.1/) & [Angular](https://angular.io/docs) Documentation.

---

## :open_file_folder: Engine

This application had been designed using DRF (Django Rest Framework), where I use Swagger to Document and Test my APIs.
![swagger](/assets/swagger.png)
The Application requires the user to enter their Strava Credentials in order to authorize the Strava Api Playground for use. This project uses selenium as a browser automtor, since strava requires manual interventions to authorize tokens.
![login](/assets/login.png)

---

## :fire: Application
Thr front end uses Angular as its framework, where I use angular-material to design my UI.
Once Logged in you will be able to view your latest activity, and your 2km, 5km and 10km Personal Bests! Along with some other key performance metrics like breakdown of activities, distances of runs, and average pace for 5km Run. I hope to add the ability to dynamically change the pace chart for different runs (i.e. 2km, 5km, 10km). Although for now, 5km is all I need for my analysis!
![dash](/assets/dash.png)

---



## :computer: Credits
Credit: Conor Shirren

---