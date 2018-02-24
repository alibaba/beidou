
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import * as actions from './actions';
import App from './components/App';
import { rootEpic } from './epics';
import { rootReducer } from './reducers';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default class View extends React.Component {
  static doctype = '<!DOCTYPE html>';

  static getStore() {
    /**
     * The redux state store, built with the Epic middleware.
     */
    const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

    store.dispatch(actions.getAllProducts());
    return store;
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
          <title>Beidou example with redux-observable</title>
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${state}` }} />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset('index.js')} />
        </body>
      </html>
    );
  }
}

if (__CLIENT__) {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  store.dispatch(actions.getAllProducts());
  hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('container')
  );
}
