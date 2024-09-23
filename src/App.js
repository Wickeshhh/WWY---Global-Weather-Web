import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);
  const [isMps, setIsMps] = useState(true);

  const fetchWeather = async (event) => {
    event.preventDefault();
    setError('');
    setWeatherData(null);
    try {
      const response = await axios.get(`https://weather-backend-production-b430.up.railway.app/api/weather/current?city=${city}`);
      setWeatherData(response.data);
    } catch (err) {
      setError('Could not fetch weather data. Please check the city name.');
    }
  };

  const convertTemperature = (temp) => (isCelsius ? temp : (temp * 9) / 5 + 32);
  const convertWindSpeed = (speed) => (isMps ? speed : speed * 3.6);
  const toggleTemperatureUnit = () => setIsCelsius(!isCelsius);
  const toggleWindSpeedUnit = () => setIsMps(!isMps);

  return (
    <div className="App">
      <div className="image-container"></div>
      <div className="weather-container">
        <h1 className="title">Weathering with You</h1>
        <h3>Global weather updates in a single click!</h3>
        <form onSubmit={fetchWeather} className="form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="input"
            required
          />
          <button type="submit" className="btn">
            Get Weather
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <div className="weather-info">
            <h3>Weather in {weatherData.city}</h3>
            <p>
              Temperature: {convertTemperature(weatherData.temperature).toFixed(1)} °{isCelsius ? 'C' : 'F'}
              <button className="unit-toggle-btn" onClick={toggleTemperatureUnit}>
                View in °{isCelsius ? 'F' : 'C'}
              </button>
            </p>
            <p>
              Wind Speed: {convertWindSpeed(weatherData.wind_speed).toFixed(1)} {isMps ? 'm/s' : 'km/h'}
              <button className="unit-toggle-btn" onClick={toggleWindSpeedUnit}>
                View in {isMps ? 'km/h' : 'm/s'}
              </button>
            </p>
            <p>Description: {weatherData.description}</p>
          </div>
        )}
      </div>
      <footer className="footer">
        <p>
          2024 | Developed by{' '}
          <a
            href="https://thatguyakhilesh.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            ©Akhilesh
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

