import React from 'react';

function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <p>{weather.location}</p>
      <h2>Temperature</h2>
      <p>{weather.current.temp}°F</p>
      <p><em>Feels like:</em> {weather.current.feels_like}°F</p>
    </div>
  );
}

export default WeatherCard;
