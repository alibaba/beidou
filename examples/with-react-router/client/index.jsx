'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BasicExample } from 'client/components/example';

export default class Index extends Component {
  static getPartial(props) {
    const { ctx } = props;
    return {
      html: <BasicExample location={ctx.req.url} context={{}} />,
    };
  }

  render() {
    const { html, helper } = this.props;
    return (
      <html>
        <head>
          <title>React Router Example</title>
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset('index.js')} />
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
  ReactDOM.hydrate(<BasicExample />, document.getElementById('container'));
}
