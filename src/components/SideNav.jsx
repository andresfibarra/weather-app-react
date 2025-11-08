import React, { useState } from 'react';
import {
  NavLink,
} from 'react-router-dom';

function SideNav() {
  const [vis, setVis] = useState(true);

  function handleButtonClick() {
    setVis(!vis);
    console.log('WOOT');
  }

  return (
    <div className="sideNavContainer">
      <nav>
        {vis && <SideNavComps />}
      </nav>
      <button type="button" className="sidePaneButton" onClick={handleButtonClick}>NavBar</button>
    </div>

  );
}

function SideNavComps() {
  return (
    <ul>
      <li>
        <NavLink to="/">Weather</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li><NavLink to="/test/id1">test id1</NavLink></li>
      <li><NavLink to="/test/id2">test id2</NavLink></li>
    </ul>
  );
}

export default SideNav;
