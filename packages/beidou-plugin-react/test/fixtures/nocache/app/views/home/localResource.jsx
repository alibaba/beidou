'use strict';

var React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <html>
        <head>
        </head>
        <body>
          {this.props.helper.asset('/main.js')}
        </body>
      </html>
    );
  }
});