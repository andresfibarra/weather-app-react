import React from 'react';
import WeatherCard from './WeatherCard';

function WeatherCardsList({ citiesWeather, onRemove, onExpand }) {
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
