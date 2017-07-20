import React from 'react';
import { render } from 'beidou-plugin-react';
import App from './component';

export default class View extends React.Component {
  render() {
    const { state, helper } = this.props;
    return (
      <html>
        <head>
          <title>index</title>
          <link rel="stylesheet" href="/build/index.css" />
        </head>
        <body>
          <div id="container" />
          <div id="container2" />
          {state && <script dangerouslySetInnerHTML={{ __html: `window.__STORE__=${state}` }} />}
          <script src={helper.resolveResource('/build/manifest.js')} />
          <script src={helper.resolveResource('/build/index.js')} />
        </body>
      </html>
    );
  }
}

render({
  element: <App />,
  containerId: 'container',
  view: View,
  script: '/build/index.js',
});
