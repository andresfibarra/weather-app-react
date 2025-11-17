import React from 'react';
import TemperatureGraph from './TemperatureGraph';

import convertToTime from '../utils/time';

// // #region Sample data
// const testTempData = [
//   {
//     time: '1',
//     temp: 50,
//     feelsLike: 52,
//   },
//   {
//     time: '2',
//     temp: 52,
//     feelsLike: 54,
//   },
//   {
//     time: '3',
//     temp: 52,
//     feelsLike: 56,
//   },
//   {
//     time: '4',
//     temp: 60,
//     feelsLike: 54,
//   },
// ];

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
