'use strict';

var React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <html>
        <head>
        </head>
        <body>
          {this.props.helper.resolveLocalResource('/main.js')}
        </body>
      </html>
    );
  }
});