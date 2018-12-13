import React from 'react';

/* eslint-disable no-alert */

const App = ({ index }) => (
  <div className="app">
    <p>Part No.{index} of page, rendered in stream.</p>
    {[...new Array(1000)].map((v, i) =>
      (<span key={i} className="span">{i}</span>))}
  </div>
);

export default App;
