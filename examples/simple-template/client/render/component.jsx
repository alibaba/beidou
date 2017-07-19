import React from 'react';
import './index.scss';

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Render into DOM</h1>
        <button onClick={() => alert('hello')}>Click Me</button>
      </div>
    );
  }
}
