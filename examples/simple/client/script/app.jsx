import React from 'react';

export default () => (
  <div>
    <h1 className="title">Script</h1>
    <p>Scripting page template in `/client/script/index.jsx`, visit via url `/script`</p>
    <p>CSS file serves at `/build/script.css`</p>
    <p>JS file serves at `/build/script.js`</p>
    <hr />
    <button onClick={() => alert('it works!')}>click me</button>
  </div>
);
