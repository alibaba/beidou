import * as React from 'react';

import './style.less';

export default class App extends React.Component {

  render() {
    return(
      <div className="app">
        <h2>test app</h2>
        <div className="red">
          red color text should be seen here.
        </div>
      </div>
    );
  }
}