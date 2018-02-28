import 'babel-polyfill';
import React from 'react';
import dva, { connect } from 'dva';
import { memoryHistory, browserHistory } from 'dva/router';

const App = connect(({ count }) => ({
  count,
}))(props => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}
  >
    <h1>Beidou example with dva</h1>
    <h2>{props.count}</h2>
    <div>
      <button
        key="add"
        onClick={() => {
          props.dispatch({ type: 'count/add' });
        }}
        style={{
          marginRight: '10px',
        }}
      >
        +
      </button>
      <button
        key="minus"
        onClick={() => {
          props.dispatch({ type: 'count/minus' });
        }}
      >
        -
      </button>
    </div>
  </div>
));

function createApp(opts) {
  const app = dva(opts);
  app.model({
    namespace: 'count',
    state: 0,
    reducers: {
      add(count) {
        return count + 1;
      },
      minus(count) {
        return count - 1;
      },
    },
  });

  app.router(() => <App />);
  return app;
}

export default class Index extends React.Component {
  static getPartial() {
    const app = createApp({
      history: memoryHistory,
      initialState: {
        count: 0,
      },
    });
    return {
      html: app.start()(),
    };
  }

  render() {
    const { html, helper } = this.props;
    return (
      <html>
        <head>
          <title>Beidou example with dva</title>
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset('index.js')} />
        </body>
      </html>
    );
  }
}

if (__CLIENT__) {
  const app = createApp({
    history: browserHistory,
    initialState: 0,
  });

  // 5. Start
  app.start('#container');
}
