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
      <div>
        <SideNav />
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/about" element={<About />} />
          <Route path="/test/:id" element={<Test />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function About(props) {
  return <div> All there is to know about me </div>;
}

function Test(props) {
  const { id } = useParams();
  return <div> ID: {id} </div>;
}

function FallBack(props) {
  return <div>URL Not Found</div>;
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);
