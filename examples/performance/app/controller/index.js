'use strict'; // eslint-disable-line

import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import ReactDOMServer from 'react-dom/dist/react-dom-server.min.js';

import Home from '../../client/index/index.jsx';

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
