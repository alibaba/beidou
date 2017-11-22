'use strict'; // eslint-disable-line

import { renderToString } from 'react-dom/server';
import React from 'react';
import Home from '../../client/index/index.jsx';

module.exports = function* homeController() {
  const serverHtml = renderToString(<Home />);
  this.body = serverHtml;
  this.type = 'html';
};
