'use strict';

const React = require('react');

module.exports = (props) => {
  return (
    <html>
      <head>
      </head>
      <body>
        {props.helper.resolveResource('/main.js')}
      </body>
    </html>
  );
}
