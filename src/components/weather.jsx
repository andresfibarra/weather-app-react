import React, { useState } from 'react';

function Weather() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

  async function getCoordsByName(city) {
    console.log(`FINDING BY CITY NAME ${city}`);

    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
    );

    if (!res.ok) {
      throw new Error('ERROR FETCHING COORDINATES');
    }

    const coordData = await res.json();
    setLocation(coordData[0].name);

    const coordsArray = [coordData[0].lat, coordData[0].lon];

    return coordsArray;
  }

  async function getCoordsByZip(zip) {
    console.log(`FINDING BY ZIP ${zip}`);

    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${API_KEY}`,
    );

    if (!res.ok) {
      throw new Error('ERROR FETCHING COORDINATES FROM ZIP');
    }

    const coordData = await res.json();
    setLocation(coordData.name);

    const coordsArray = [coordData.lat, coordData.lon];

    return coordsArray;
  }

  async function getWeather(input) {
    if (!input) return;

    try {
      setLoading(true);
      // clear old values while loading
      setError('');
      setWeather(null);

      let coordsArray;
      if (!Number.isNaN(parseInt(input, 10))) {
        coordsArray = await getCoordsByZip(input);
      } else {
        coordsArray = await getCoordsByName(input);
      }

      /* Using coordinates, fetch weather data */
      console.log(`RECEIVED: ${coordsArray}`);
      const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${coordsArray[0]}&lon=${coordsArray[1]}&units=imperial&appid=${API_KEY}`,
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
        placeholder="Enter city name or zip"
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
          <p>Showing results for: {location}</p>
          <h2>Temperature</h2>
          <p>{weather.current.temp}°F</p>
          <p><em>Feels like:</em> {weather.current.feels_like}°F</p>
        </div>
      )}

      {!loading && !error && !weather && (
        <div className="hint">
          Search for location to see the weather
        </div>
      )}
    </div>
  );
}

export default Weather;
