import React from 'react';
import {
  NavLink,
} from 'react-router-dom';

function Nav() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 px-8 flex items-center justify-between bg-slate-900/95 border-b border-slate-800 backdrop-blur z-50">
      <div className="nav-brand">WeatherApp</div>

      <nav className="nav-links">
        <NavLink to="/">Weather</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/test/id1">test id1</NavLink>
        <NavLink to="/test/id2">test id2</NavLink>
      </nav>
    </header>
  );
}

export default Nav;
