import React from 'react';
import { render } from 'beidou-plugin-react';
import App from './component';

/**
 * custom view template
 *
 * @export
 * @class View
 * @extends {React.Component}
 */
export default class View extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>Example</title>
          <link rel="stylesheet" href="/build/example.css" />
        </head>
        <body>
          <div id="container" />
          <script src={'/build/manifest.js'} />
          <script src={'/build/example.js'} />
        </body>
      </html>
    );
  }
}

/*
 * use isomorphic render method
 */
render({
  element: <App />,
  containerId: 'container',
  view: View
});
