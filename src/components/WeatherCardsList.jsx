import React from 'react';
import WeatherCard from './WeatherCard';
import useStore from '../store/index';

function WeatherCardsList({ onRemove, onExpand }) {
  const citiesWeather = useStore((state) => state.citiesWeather);

  if (!citiesWeather || citiesWeather.length === 0) {
    return <div className="hint">Search for a city or zip code to get started!</div>;
  }

  return (
    <div className="weather-cards-list">
      {citiesWeather.map((data) => (
        <WeatherCard key={data.id || data.name} weather={data} onRemove={onRemove} onExpand={onExpand} />
      ))}
    </div>

  );
}

export default WeatherCardsList;
