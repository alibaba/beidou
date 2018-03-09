'use strict'; // eslint-disable-line

import Home from '../../client/react16-csr/index.jsx';

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
                  <style>
                  .recursive {
                    background: aliceblue;
                    padding: 20px;
                  }
                  .recursive >div{
                    background: bisque;
                    padding: 20px;
                  }
                  .recursive >div >div{
                    background: ivory;
                    padding: 20px;
                  }
                  .recursive >div >div >div{
                    background: #C3DDB6;
                    padding: 20px;
                    margin-bottom: 10px;
                  }
                  .recursive >div >div >div >div{
                    display: inline-block;
                    background: #A8CF96;
                    padding: 20px;
                    margin: 10px;
                  }
                </style>
                </head>
                <body>
                  <div id="container">${serverHtml}</div>
                  <script
                    src="http://127.0.0.1:6001/build/manifest.js"></script>
                  <script
                    src="http://127.0.0.1:6001/build/react16-csr.js"></script>
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
