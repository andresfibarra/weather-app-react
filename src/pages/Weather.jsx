import React, { useState } from 'react';
import WeatherCardsList from '../components/WeatherCardsList';

function Weather() {
  const [citiesWeather, setCitiesWeather] = useState([]); // array of weathers to display cards
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState(''); // search field

  const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

  async function getCoordsByName(city) {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
    );

    if (!res.ok) {
      throw new Error('ERROR FETCHING COORDINATES');
    }

    const coordData = await res.json();

    const coordsArray = [coordData[0].lat, coordData[0].lon, coordData[0].name];

    return coordsArray;
  }

  async function getCoordsByZip(zip) {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${API_KEY}`,
    );

    if (!res.ok) {
      throw new Error('ERROR FETCHING COORDINATES FROM ZIP');
    }

    const coordData = await res.json();

    const coordsArray = [coordData.lat, coordData.lon, coordData.name];

    return coordsArray;
  }

  async function getWeather(input) {
    if (!input) return;

    try {
      setLoading(true);
      // clear old values while loading
      setError('');

      // search with correct API as needed
      let coordsArray;
      if (!Number.isNaN(parseInt(input, 10))) {
        coordsArray = await getCoordsByZip(input);
      } else {
        coordsArray = await getCoordsByName(input);
      }

      /* Using coordinates, fetch weather data */
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
      const newObj = { ...data, location: coordsArray[2], id: crypto.randomUUID() };
      setCitiesWeather((prev) => [
        newObj,
        ...prev,
      ]);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
      setQuery('');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      getWeather(query);
    }
  }

  return (
    <div className="weather-app">
      {/* Search input */}
      <h1>Weather</h1>
      <input
        placeholder="Enter city name or zip"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Render cases */}

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

      {!loading && !error && citiesWeather && (
        <WeatherCardsList citiesWeather={citiesWeather} />
      )}
    </div>
  );
}

export default Weather;
