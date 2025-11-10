import React from 'react';
import { FaRegWindowClose } from 'react-icons/fa';

function WeatherCard({ weather, onRemove }) {
  return (
    <div className="weather-card">
      <button
        type="button"
        className="weather-close-button"
        onClick={() => onRemove(weather.id)}
        aria-label="Remove weather card"
      >
        <FaRegWindowClose />
      </button>

      <p>{weather.location}</p>
      <h2>Temperature</h2>
      <p>{weather.current.temp}°F</p>
      <p><em>Feels like:</em> {weather.current.feels_like}°F</p>
    </div>
  );
}

export default WeatherCard;
