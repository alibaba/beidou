import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../store';

/**
 * custom view template
 *
 * @export
 * @class View
 * @extends {React.Component}
 */
export class View extends React.Component {
  static doctype = '<!DOCTYPE html>';

  render() {
    const { title, asset, html, state, helper } = this.props;
    return (
      <html>
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="description"
            content="A admin dashboard application demo built upon Ant Design and Beidou"
          />
          <title>{title}</title>
          <link rel="stylesheet" href={helper.asset('nprogress.css')} />
          <link rel="stylesheet" href={helper.asset('manifest.css')} />
          <link rel="stylesheet" href={helper.asset(`${asset}.css`)} />
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__ = ${state}`,
            }}
          />
          <script src={helper.asset('nprogress.js')} />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset(`${asset}.js`)} />
        </body>
      </html>
    );
  }
}

export const render = (App, reducers, saga) => {
  /**
   * client scope, wrapped in __CLIENT__ detect block
   * only run in client side
   */
  if (__CLIENT__) {
    const store = configureStore(reducers, saga, window.__INITIAL_STATE__);
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    // run saga
    saga.run();

    ReactDOM.render(app, document.getElementById('container'));
  }
};
