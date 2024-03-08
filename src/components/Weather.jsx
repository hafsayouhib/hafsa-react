import React, { useState, useEffect } from 'react';

const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = '1a197c9d91ea73ee8525fd1df6c55904';
  
  const latitude = 33.44;
  const longitude = -94.04;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Pakistan&lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${apiKey}`

        );

        if (!response.ok) {
          throw new Error(`Weather API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setWeather(data);
        setLoading(false);
        
        console.log('weather fetch successfully ')
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

   
    fetchWeather();
  }, [apiKey,longitude,latitude]);

  return (
    <div>
      <h1>Weather Information</h1>
      {loading ? (
        <p>Loading weather data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp} &#176;C</p>
          <p>Description: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
