'use strict';

var React = require('react');

module.exports = (props) => {
  return (
    <html>
      <head>
      </head>
      <body>
        {props.appHelper.getHelperInfo('123')}
      </body>
    </html>
  );
}