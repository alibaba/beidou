'use strict';
var Redux = require('redux');
var rootReducer = require('../reducers');
module.exports = function (initState) {
	return Redux.createStore(rootReducer, initState);
};
