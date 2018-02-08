'use strict';

const Redux = require('redux');
const rootReducer = require('../reducers');

module.exports = function (initState) {
  return Redux.createStore(rootReducer, initState);
};
