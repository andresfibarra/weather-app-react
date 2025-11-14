import React, { useRef } from 'react';
import { createPortal } from 'react-dom';

function WeatherCardModal({ weather, onClose }) {
  const closeRef = useRef(null);

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
      <div className="relative z-10 w-full max-2-lg mx-4 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <p>text will go here</p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
}
export default WeatherCardModal;
