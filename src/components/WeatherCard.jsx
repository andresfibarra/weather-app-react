import React from 'react';
import { FaRegWindowClose } from 'react-icons/fa';

function WeatherCard({ weather, onRemove }) {
  return (
    <div
    // className="weather-card"
      className="relative mt-3 pl px-7 pt-6 pb-5 rounded-2xl
      grid w-full max-w-[420px] items-center grid-cols-[2fr_auto] grid-rows-[auto-auto]
      gap-x-[1.2rem] gap-y-1
      border border-[rgba(148,163,253,0.14)] shadow-[0_18px_45px_rgba(15,23,42,0.9)]"
    >
      <button
        type="button"
        className="absolute top-1.5 right-1.5 bg-transparent border-0 text-gray-400 hover:text-red-400 transition-colors duration-200 cursor-pointer rounded-2xl "
        onClick={() => onRemove(weather.id)}
        aria-label="Remove weather card"
      >
        <FaRegWindowClose size={18} />
      </button>

      <h2 className="text-3xl font-medium text-sky-400">
        {weather.location}
      </h2>
      <p className="m-0 text-[1.4rem] font-semibold tracking-wide">
        Temperature
      </p>
      <p className="my-0.5 text-base text-gray-300"><em>Feels like:</em> {weather.current.feels_like}°F</p>
      <p className="my-0.5 text-base text-gray-300">{weather.current.temp}°F</p>
    </div>
  );
}

export default WeatherCard;
