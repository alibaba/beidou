import 'babel-polyfill';
import React, { Component } from 'react';
import styles from './index.module.less';

const App = () => (
  <div className={styles.center}>
    <div className={styles['glitch-wrapper']}>
      <div className={styles.glitch} data-text="Beidou example with less">
        Beidou example with less
      </div>
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
          <title>Beidou example with less</title>
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
