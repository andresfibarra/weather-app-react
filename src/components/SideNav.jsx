import React, { useState } from 'react';
import {
  NavLink,
} from 'react-router-dom';

function SideNav() {
  const [vis, setVis] = useState(false);

  function handleButtonClick() {
    setVis(!vis);
    console.log('WOOT');
  }

  return (
    <nav>
      {vis && <SideNavComps />}
      <button type="button" onClick={handleButtonClick}>toggle</button>
    </nav>
  );
}

function SideNavComps() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
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
