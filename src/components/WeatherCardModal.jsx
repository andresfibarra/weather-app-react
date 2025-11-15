import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

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
      <div className="relative z-10 w-full max-w-xl p-4 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">

        {/* Header */}

        {/* Content */}
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
