# Simple Weather App
## Description
This is a simple weather app built in HTML and vanilla javascript using the open weather map api: https://openweathermap.org/.

## How to use
Before you can use this app, you will need to apply for an open weather map api key. This is easily done by going to https://openweathermap.org/price and pressing "Get API key" under the professional collections header.

Create a file named "api_key.js" in the same directory as the "index.html" file and insert the following:
```javascript
// Place your api key between the quote marks
const api_key = "" 
```

Once this has been done, you can run the index.html file and if location services are provided access the app should run.

## Features
- Animated sun and moon styling and position depending on the time of day
- Stars are shown/hidden depending on time of day
- Sky and ground colour changes depending on time of day (sunset and sunrise included for sky)
- Clouds are created and animated depending on current cloud coverage of location
    - Clouds are also changed if it is raining
- Displays location name and relevant weather information of location. This is updated every 10 minutes.
    - Temperature (in celsius)
    - Current weather description (clear, raining etc..)