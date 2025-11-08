import React, { useState } from 'react';

function Weather() {
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState('');
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

      const coordRes = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
      );

      if (!coordRes.ok) {
        throw new Error('ERROR FETCHING COORDINATES');
      }

      const coordData = await coordRes.json();
      console.log(coordData);
      setCityName(coordData[0].name);

      /* Using coordinates, fetch weather data */
      const res = await fetch( // hardcoded longitute/ latitude for now
        `https://api.openweathermap.org/data/3.0/onecall?lat=${coordData[0].lat}&lon=${coordData[0].lon}&units=imperial&appid=${API_KEY}`,
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
          <p>Showing results for: {cityName}</p>
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
