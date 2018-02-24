import React, { Component } from 'react';
import './index.scss';

const App = () => (
  <div>
    <div className="title">
      Beidou example with scss
    </div>
    <div className="🎵">
      <div className="🕹">
        <div className="🕹__rotator" />
        <div className="🕹__stick" />
        <div className="🕹__voicer" />
      </div>
      <div className="⏺" />
      <div className="🔈 🔈--right" />
      <div className="🔈 🔈--left" />
    </div>
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
          <title>Beidou example with scss</title>
          <link rel="stylesheet" href={helper.asset('index.css')} />
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
