'use strict';

const React = require('react');

module.exports = props => (
  <html>
    <head>{props.helper.comboCss(['a.css', 'b.css'])}</head>
    <body>{props.helper.comboScript(['a.js', 'abc/b/c/b.js'])}</body>
  </html>
);
