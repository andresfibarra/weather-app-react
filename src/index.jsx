import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import './style.scss';

import Weather from './components/Weather';
import Nav from './components/Nav';
import About from './pages/About';
import Test from './pages/Test';
import FallBack from './pages/FallBack';

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Nav />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Weather />} />
            <Route path="/about" element={<About />} />
            <Route path="/test/:id" element={<Test />} />
            <Route path="*" element={<FallBack />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);
