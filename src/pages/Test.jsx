import React from 'react';
import { useParams } from 'react-router-dom';

function Test(props) {
  const { id } = useParams();
  return (
    <div className="page-card">
      <h2>Test route</h2>
      <p>ID: {id}</p>
    </div>
  );
}

export default Test;
