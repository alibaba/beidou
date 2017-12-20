'use strict';

const React = require('react');

module.exports = (props) => {
  const contentStr = props.render(props.children);
  return (
    <html>
      <head>
        <title>{props.title}</title>
      </head>
      <body>
        <div id="container" dangerouslySetInnerHTML={{ __html: contentStr }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${props.state}` }} />
      </body>
    </html>
  );
}