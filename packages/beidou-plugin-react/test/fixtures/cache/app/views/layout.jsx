'use strict';

const React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
          <div id="container">
            {this.props.children}
          </div>
          <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${this.props.state}` }} />
        </body>
      </html>
    );
  }
});
