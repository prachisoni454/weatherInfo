const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city');
const searchBtn = document.getElementById('search-btn');
const weatherDataDiv = document.getElementById('weather-data');
const errorMessageDiv = document.getElementById('error-message');

const apiKey = 'fcb8f4a40bfff70587280554cc3ec105';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        displayErrorMessage('Please enter a city name');
    }
});

function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => displayErrorMessage('Error fetching weather data'));
}

function displayWeatherData(data) {
    const weatherData = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
    weatherDataDiv.innerHTML = weatherData;
    errorMessageDiv.innerHTML = '';
}

function displayErrorMessage(message) {
    errorMessageDiv.innerHTML = message;
    weatherDataDiv.innerHTML = '';
}

