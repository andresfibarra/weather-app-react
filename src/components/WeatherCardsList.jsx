import React from 'react';
import WeatherCard from './WeatherCard';

function WeatherCardsList({ citiesWeather, onRemove, setCitiesWeather }) {
  if (!citiesWeather || citiesWeather.length === 0) {
    return <div className="hint">Search for a city or zip code to get started!</div>;
  }

  const handleRemoveCard = useCallback((id) => {
    setCitiesWeather((prev) => prev.filter((card) => card.id !== id));
  }, []);

  return (
    <div className="weather-cards-list">
      {citiesWeather.map((data) => (
        <WeatherCard key={data.id || data.name} weather={data} onRemove={onRemove} />
      ))}
    </div>

  );
}

export default WeatherCardsList;
