'use strict';

const React = require('react');

module.exports = props => (
  <html>
    <head />
    <body><script>{props.helper.asset('/main.js')}</script></body>
  </html>
);
