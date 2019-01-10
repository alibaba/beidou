import * as React from 'react';

import './style.less';

export default class App extends React.Component {

  handleClick = () => {
    alert('hello');
  }

  render() {
    return(
      <div className="app">
        <h2>TypeScript Isomorphic App</h2>
        <div className="red">
          red color text should be seen here.
        </div>
        <div>
          <button onClick={this.handleClick}>hello</button>
        </div>
      </div>
    );
  }
}