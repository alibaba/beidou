'use strict'; // eslint-disable-line

import Home from '../../client/origin/index.jsx';

const React = require('react');
const ReactDOMServer = require('react-dom/server');

module.exports = (app) => {
  class OriginController extends app.Controller {
    * render() {
      try {
        const serverHtml = ReactDOMServer.renderToString(<Home />);
        const html = `
                <html>
                <head>
                  <title>Test page</title>
                </head>
                <body>
                  <div id="container">${serverHtml}</div>
                  <script src="http://127.0.0.1:6001/build/manifest.js"></script>
                  <script src="http://127.0.0.1:6001/build/origin.js"></script>
                </body>
              </html>`;
        this.ctx.body = html;
        this.ctx.type = 'html';
      } catch (e) {
        this.ctx.body = JSON.stringify(e.message);
      }
    }
  }

  return OriginController;
};
