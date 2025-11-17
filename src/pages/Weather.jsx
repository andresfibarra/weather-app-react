import React, { useState, useCallback, useMemo } from 'react';
import WeatherCardsList from '../components/WeatherCardsList';
import WeatherCardModal from '../components/WeatherCardModal';

// TEST
import UVIndexGraph from '../components/UVIndexGraph';
import TemperatureGraph from '../components/TemperatureGraph';

const debug = true;

// #region Sample data
const testTempData = [
  {
    time: '1',
    temp: 50,
    feelsLike: 52,
  },
  {
    time: '2',
    temp: 52,
    feelsLike: 54,
  },
  {
    time: '3',
    temp: 52,
    feelsLike: 56,
  },
  {
    time: '4',
    temp: 60,
    feelsLike: 54,
  },
];

function Weather() {
  const [citiesWeather, setCitiesWeather] = useState([]); // array of weathers to display cards
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState(''); // search field

  const [selectedId, setSelectedId] = useState(null);

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
      setCitiesWeather((prev) => {
        // check that that care is not already being displayed
        const alreadyExists = prev.some(
          (curr) => curr.location.toLowerCase() === newObj.location.toLowerCase(),
        );
        if (alreadyExists) {
          if (debug) console.log(`Skipping duplicate: ${newObj.location}`);
          setError(`Weather for ${newObj.location} already being shown`);
          return prev;
        }
        return [ // else add to the list of cities
          newObj,
          ...prev,
        ];
      });
      setQuery('');

      if (debug) console.log(newObj);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      getWeather(query);
    }
  }

  // function to remove a weather card; passed down as a prop
  const handleRemoveCard = useCallback((id) => {
    setCitiesWeather((prev) => prev.filter((card) => card.id !== id));
  }, []);

  // function to open a weather card modal; passed down as a prop
  // bubble up ID?

  const handleOpenCardDetails = useCallback((id = null) => {
    if (debug) console.log(`Open card! ID: ${id}`);

    // set weather

    setSelectedId(id);
  }, []);

  // turn selectedID into a weather object
  const selectedWeather = useMemo(
    () => citiesWeather.find((w) => w.id === selectedId) || null,
    [citiesWeather, selectedId],
  );

  // eslint-disable-next-line no-unused-vars
  const handleCloseCardDetails = useCallback(() => {
    if (debug) console.log('close!');
    setSelectedId(null);
  });

  return (
    <div className="weather-app">
      <TemperatureGraph tempData={testTempData} />
      <UVIndexGraph uvi={4.7} />

      {selectedWeather && (
      <WeatherCardModal
        weather={selectedWeather}
        onClose={handleCloseCardDetails}
      />
      )}

      {/* Search input */}
      <h1 className="text-white text-3xl pb-5 font-medium">Weather</h1>
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

      {citiesWeather && (
        <WeatherCardsList citiesWeather={citiesWeather} onRemove={handleRemoveCard} onExpand={handleOpenCardDetails} />
      )}
    </div>
  );
}

export default Weather;
