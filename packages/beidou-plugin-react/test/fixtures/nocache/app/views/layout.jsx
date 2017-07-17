'use strict';

const React = require('react');

module.exports = React.createClass({
  render() {
    const contentStr = this.props.render(this.props.children);
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: contentStr }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${this.props.state}` }} />
        </body>
      </html>
    );
  }
});
