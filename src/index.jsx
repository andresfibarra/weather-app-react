import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter, Routes, Route, useParams,
} from 'react-router-dom';
import './style.scss';

import Weather from './components/Weather';
import SideNav from './components/SideNav';

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <SideNav />
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

function About(props) {
  return (
    <div className="page-card">
      <h1>About this app</h1>
      <p>All there is to know about me</p>
    </div>
  );
}

function Test(props) {
  const { id } = useParams();
  return (
    <div className="page-card">
      <h2>Test route</h2>
      <p>ID: {id}</p>
    </div>
  );
}

function FallBack(props) {
  return (
    <div className="page-card">
      <h2>Test route</h2>
      <p>URL Not Found</p>
    </div>
  );
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);
