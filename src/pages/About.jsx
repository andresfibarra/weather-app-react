import React from 'react';

function About(props) {
  return (
    <div className="page-card">
      <h1>About this app</h1>
      <p>This is a simple app that calls weather
        the OpenWeather API to get information on the weather for a given place
      </p>
      <h3>Inspiration</h3>
      <p>
        I was inspired to do this by curiosity on learning how to use APIs!
        I was a little out of practice with frontend coding, and so I wanted to brush up
      </p>
      <h3>Goals</h3>
      <ol>
        <li>Brush up on React and frontend frameworks</li>
        <li>Learn!</li>
        <li>Learn to love coding again</li>
        <li>Push myself to practice problem solving and incremental building</li>
        <li>Practice good coding habits</li>
      </ol>
    </div>
  );
}

export default About;
