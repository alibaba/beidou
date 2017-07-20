import React from 'react';
import './index.scss';

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Index Page</h1>
        <button onClick={() => alert('hello')}>click</button>
      </div>
    );
  }
}
