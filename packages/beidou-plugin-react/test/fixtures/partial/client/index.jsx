import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

/**
 * custom view template
 *
 * @export
 * @class View
 * @extends {React.Component}
 */
export default class View extends React.Component {
  static getStore() {
    return {};
  }

  /**
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
   * @returns {ReactInstance|Array<ReactInstance>}
   */
  static getPartial() {
    return { html: <App />, ctx: <App /> };
  }

  render() {
    const { html } = this.props;
    return (
      <html>
        <head>
          <title>Unittest</title>
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
        </body>
      </html>
    );
  }
}
