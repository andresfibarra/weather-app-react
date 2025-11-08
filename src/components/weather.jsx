import React, { useState } from 'react';

function Weather() {
  const [weather, setWeather] = useState(null);

  async function getWeather(city) {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

    const res = await fetch( // hardcoded longitute/ latitude for now
      `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&units=imperial&appid=${API_KEY}`,
    );

    if (!res.ok) {
      console.error('Failed to fetch weather data');
      return;
    }

    const data = await res.json();
    console.log(data);
    setWeather(data);
  }

  return (
    <div>
      <h1>Weather</h1>
      <p>Search up your city to find the weather!</p>
      <input
        placeholder="Enter city"
        onKeyDown={(e) => e.key === 'Enter' && getWeather(e.target.value)}
      />

      {weather && (
        <div>
          <h2>Coordinates</h2>
          <p><em>({weather.lat}, {weather.lon})</em></p>
          <h2>Temperature</h2>
          <p>{weather.current.temp}</p>
          <p><em>Feels like:</em> {weather.current.feels_like}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
