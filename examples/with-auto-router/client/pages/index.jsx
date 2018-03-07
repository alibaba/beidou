'use strict';

import React, { Component } from 'react';

export default class Index extends Component {
  render() {
    const { html, helper } = this.props;
    return (
      <html>
        <head>
          <title>Beidou example auto router</title>
        </head>
        <body>
          <h1>Index</h1>
          <p>/pages/index.jsx</p>
          <ul>
            <li><a href="./about">about</a></li>
          </ul>
        </body>
      </html>
    );
  }
}
