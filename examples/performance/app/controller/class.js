'use strict'; // eslint-disable-line

import Home from '../../client/class/index.jsx';

const React = require('react');
const ReactDOMServer = require('react-dom/server');

module.exports = (app) => {
  class ClassController extends app.Controller {
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
                  <script src="http://127.0.0.1:6001/build/class.js"></script>
                </body>
              </html>`;
        this.ctx.body = html;
        this.ctx.type = 'html';
      } catch (e) {
        this.ctx.body = JSON.stringify(e.message);
      }
    }
  }

  return ClassController;
};
