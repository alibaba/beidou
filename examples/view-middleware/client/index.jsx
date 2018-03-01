import 'babel-polyfill';
import React, { Component } from 'react';

const App = () => (
  <div>
    <h1>Demonstrate of view middleware</h1>
  </div>
);

export default class Index extends Component {
  static getPartial() {
    return {
      html: <App />,
    };
  }

  render() {
    const { html, helper } = this.props;
    return (
      <html>
        <head>
          <title>Beidou example view middleware</title>
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
