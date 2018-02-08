import React from 'react';
import ReactDOM from 'react-dom';
import App from './component';

/**
 * custom view template
 *
 * @export
 * @class View
 * @extends {React.Component}
 */
export default class View extends React.Component {
  static doctype = '<!DOCTYPE html>'

  /**
   * Partial Render for view template
   * return a props mapping object, every React instance will be rendered into String
   * and assgin to props with the key you defined
   * here, renderToStaticMarkup or renderToString is decided by `config.react.static` value: true or false
   *
   * `getPartial(locals)` support generator function, so you can do async things here
   * But which is run before view rendering, performance should be well considered;
   *
   * @param {Object} locals server context variables
   * ```
   * {
   *    ctx: egg/koa context
   *    helper: view helper
   *    render: server side renderToString of react or renderToStaticMarkup if `config.react.static = true`
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
   * @returns {Map<String, ReactInstance|Array<ReactInstance>>}
   */
  static getPartial() {
    return {
      app: <App />,
    };
  }

  render() {
    const { app, helper } = this.props;
    return (
      <html>
        <head>
          <title>Example</title>
          <link rel="stylesheet" href={helper.asset('example.css')} />
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: app }} />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset('example.js')} />
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
  ReactDOM.render(<App />, document.getElementById('container'));
}
