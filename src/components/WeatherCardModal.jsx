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
      <div className="relative z-10 w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">

          <h3 id="weather-detail-title" className="text-lg font-semibold">
            LOCATION
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
        <div className="px-5 py-4 grid gap-4">
          <p>text will go here</p>
          <p>text 2</p>
          <p>text 3</p>

        </div>

      </div>
    </div>,
    document.body,
  );
}
export default WeatherCardModal;
