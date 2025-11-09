import React from 'react';
import {
  NavLink,
} from 'react-router-dom';

function Nav() {
  return (
    <header className="topNav">
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
