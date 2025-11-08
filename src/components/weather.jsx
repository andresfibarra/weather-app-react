import React, { useState } from 'react';

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function getWeather(city) {
    if (!city) return;

    try {
      setLoading(true);
      // clear old values while loading
      setError('');
      setWeather(null);

      const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

      const res = await fetch( // hardcoded longitute/ latitude for now
        `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&units=imperial&appid=${API_KEY}`,
      );

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('City not found. Try another search.');
        } else {
          throw new Error('Failed to fetch weather. Please try again.');
        }
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Search input */}
      <h1>Weather</h1>
      <input
        placeholder="Enter city"
        onKeyDown={(e) => e.key === 'Enter' && getWeather(e.target.value)}
      />

      {/* Render */}

      {loading && (
        <div className="loading">
          Loading weather...
        </div>
      )}

      {!loading && error && (
        <div className="error">
          {error}
        </div>
      )}

      {!loading && !error && weather && (
        <div className="weather-card">
          <h2>Coordinates</h2>
          <p><em>({weather.lat}, {weather.lon})</em></p>
          <h2>Temperature</h2>
          <p>{weather.current.temp}°F</p>
          <p><em>Feels like:</em> {weather.current.feels_like}°F</p>
        </div>
      )}

      {!loading && !error && !weather && (
        <div className="hint">
          Search for a city to see the weather
        </div>
      )}
    </div>
  );
}

export default Weather;
