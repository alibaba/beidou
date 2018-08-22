import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './container';
import configureStore from './store';
import { run } from './saga';
import Router from './router/router';

/**
 * custom view template
 *
 * @export
 * @class View
 * @extends {React.Component}
 */
export default class View extends React.Component<any> {
  static doctype = '<!DOCTYPE html>';

  /**
   * construct store for server side
   */
  static getStore({ from }) {
    const store = configureStore({
      greeting: from,
    });

    return store;
  }

  /**
   *
   * @param {Object} locals server context variables
   * ```
   * {
   *    ctx: egg/koa context
   *    helper: view helper
   *    render: server side renderToString of react or renderToStaticMarkup
   *      if `config.react.static = true`
   *    renderToString
   *    renderToStaticMarkup
   *    request: http request object
   *    {
   *      ...
   *      req,
   *      res,
   *      ...
   *    }
   * }
   * ```
   *
   * @returns {ReactInstance|Array<ReactInstance>}
   */
  static getPartial({ store, ctx }) {
    const html = (
      <Provider store={store}>
        <Router location={ctx.req.url} context={{}}/>
      </Provider>
    );
    return { html };
  }

  render() {
    const { html, state, helper } = this.props;
    return (
      <html>
      <head>
        <title>Beidou example redux</title>
      </head>
      <body>
      <div id="container" dangerouslySetInnerHTML={{ __html: html }}/>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_STATE__ = ${state}`,
        }}
      />
      <script src={helper.asset('manifest.js')}/>
      <script src={helper.asset('index.js')}/>
      </body>
      </html>
    );
  }
}

/**
 * client scope, wrapped in __CLIENT__ detect block
 * only run in client side
 */
if (__CLIENT__) {
  const store = configureStore(window.__INITIAL_STATE__);
  const app = (
    <Provider store={store}>
      <Router/>
    </Provider>
  );

  // run saga
  run();
  ReactDOM.render(app, document.getElementById('container'));
}
