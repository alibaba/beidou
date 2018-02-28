'use strict';

const React = require('react');

module.exports = props => (
  <html>
    <head />
    <body>{props.helper.asset('/main.js')}</body>
  </html>
);
