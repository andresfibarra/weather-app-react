import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaRegWindowClose } from 'react-icons/fa';

function WeatherCardModal({ weather, onClose }) {
  const closeRef = useRef(null);

  // close on esc
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // calculate simple values
  function convertToTime(dt) {
    return new Date(dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-labelledby="weather-detail-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop  */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative scroll-auto z-10 w-full max-w-xl max-h-3/4 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">

          <h3 id="weather-detail-title" className="text-lg font-semibold">
            {weather.location}
          </h3>
          <button
            type="button"
            ref={closeRef}
            className="f bg-transparent border-0 text-gray-400 hover:text-red-400 transition-colors duration-200 cursor-pointer rounded-2xl "
            onClick={onClose}
            aria-label="Close modal"
          >
            <FaRegWindowClose size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-auto px-5 py-4 grid gap-4">
          <p>Sunrise: {convertToTime(weather.current.sunrise)}</p>
          <p>Sunset: {convertToTime(weather.current.sunset)}</p>
          <p>Temp: {weather.current.temp}</p>
          <p>UV Index: {weather.current.uvi}</p>
          <p>Visibility: {parseInt(weather.current.visibility, 10) / 1000}km</p>
        </div>

      </div>
    </div>,
    document.body,
  );
}
export default WeatherCardModal;
