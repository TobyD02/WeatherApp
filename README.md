# Simple Weather App

## Description
This is a simple weather app built in HTML and vanilla JavaScript using the OpenWeatherMap API: [OpenWeatherMap](https://openweathermap.org/). It is hosted using a Python flask application.

## How to Use

1. **Get API Key**

    Before you can use this app, you will need to apply for an OpenWeatherMap API key. This is easily done by going to [OpenWeatherMap Pricing](https://openweathermap.org/price) and pressing "Get API key" under the Professional Collections header.

    Create a file named "api_key.js" in the directory `/static/scripts`. Inside this file, add the following:
    ```javascript
    // Place your API key between the quote marks
    const api_key = "YOUR_API_KEY";
    ```

2. **Create a Python Virtual Environment**

    To ensure dependencies are installed cleanly and don't interfere with other projects, it's recommended to use a virtual environment. You can create one using the following commands:

    ```bash
    python3 -m venv venv
    ```

    Activate the virtual environment:
    - On Windows:
        ```bash
        venv\Scripts\activate
        ```
    - On macOS and Linux:
        ```bash
        source venv/bin/activate
        ```

3. **Install Requirements**

    Install the required Python packages using pip:

    ```bash
    pip install -r requirements.txt
    ```

4. **Run the Flask App**

    Start the Flask app by running:

    ```bash
    python main.py
    ```

    This will start the Flask development server. You can access the app in your web browser at `http://localhost:8080`. Make sure to allow location services when prompted.

## Features
- Requests user location and uses it to make an API call to gather relevant information regarding the location.
- Animated sun and moon styling and position depending on the time of day.
- Stars are shown/hidden depending on the time of day.
- Sky and ground color changes depending on the time of day (sunset and sunrise included for the sky).
- Clouds are created and animated depending on the current cloud coverage of the location.
    - Clouds are also changed if it is raining.
- Displays location name and relevant weather information of the location. This is updated every 10 minutes.
    - Temperature (in Celsius).
    - Current weather description (clear, raining, etc.).

