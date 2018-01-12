import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import initStore from './store';
import { run } from './sagas';

export default class View extends React.Component {
  static doctype = '<!DOCTYPE html>';

  static getStore() {
    return initStore(Math.floor(Math.random() * 10));
  }

  static getPartial({ store }) {
    const html = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    return { html };
  }

  render() {
    const { html, state, helper } = this.props;
    return (
      <html>
        <head>
          <title>Beidou example with redux-saga</title>
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
          <script type="text/javascript">
            window.__INITIAL_STATE__ = {state};
          </script>
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset('index.js')} />
        </body>
      </html>
    );
  }
}

if (__CLIENT__) {
  const store = initStore(window.__INITIAL_STATE__);
  run();
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('container')
  );
}
