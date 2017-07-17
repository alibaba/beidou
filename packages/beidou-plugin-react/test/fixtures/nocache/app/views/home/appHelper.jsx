'use strict';

var React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <html>
        <head>
        </head>
        <body>
          {this.props.appHelper.getHelperInfo('123')}
        </body>
      </html>
    );
  }
});