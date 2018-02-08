'use strict';

const React = require('react');

module.exports = (props) => {
  return (
    <html>
      <head>
      </head>
      <body>
        {props.helper.asset('/main.js')}
      </body>
    </html>
  );
}
