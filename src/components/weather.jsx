import React, { useState } from 'react';

function Weather() {
  const [weather, setWeather] = useState(null);

  async function getWeather(city) {
    const res = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await res.json();
    console.log(data);
    setWeather(data);
  }

  return (
    <div>
      <input
        placeholder="Enter city"
        onKeyDown={(e) => e.key === 'Enter' && getWeather(e.target.value)}
      />

      {weather && (
        <div>
          <h2>{weather.nearest_area[0].areaName[0].value}</h2>
          <p>Tempt: {weather.current_condition[0].temp_C}°C</p>
          <p>Feels like: {weather.current_condition[0].FeelsLikeC}°C</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
