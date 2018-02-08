'use strict';

const React = require('react');

module.exports = (props) => {
  return (
    <html>
      <head>
        <title>{props.title}</title>
      </head>
      <body>
        <div id="container">
          {props.children}
        </div>
        <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${props.state}` }} />
      </body>
    </html>
  );
}