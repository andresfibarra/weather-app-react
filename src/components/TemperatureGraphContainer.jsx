import React from 'react';
import TemperatureGraph from './TemperatureGraph';

import convertToTime from '../utils/time';

function TemperatureGraphContainer({ weather }) {
  const tempData = weather.hourly.map((item) => ({
    time: convertToTime(item.dt),
    temp: item.temp,
    feelsLike: item.feels_like,
  }));

  return (
    <TemperatureGraph tempData={tempData} />
  );
}

export default TemperatureGraphContainer;
