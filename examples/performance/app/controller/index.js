'use strict'; // eslint-disable-line

import Home from '../../client/index/index.jsx';

const React = require('react');
const ReactDOMServer = require('react-dom/server');
// const ReactDOMServer = require('react-dom/dist/react-dom-server.min.js');


module.exports = (app) => {
  class HomeController extends app.Controller {
    * origin() {
      try {
        const serverHtml = ReactDOMServer.renderToString(<Home />);
        this.ctx.body = serverHtml;
        this.ctx.type = 'html';
      } catch (e) {
        this.ctx.body = JSON.stringify(e.message);
      }
    }
    * min() {
      const serverHtml = ReactDOMServer.renderToString(<Home />);
      this.ctx.body = serverHtml;
      this.ctx.type = 'html';
    }
  }

  return HomeController;
};
