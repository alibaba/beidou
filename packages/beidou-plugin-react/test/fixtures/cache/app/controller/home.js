'use strict';
require('babel-register');

var createStore = require('../../client/store');

exports.jsxtpl = function* homeController() {
	const initState = {
		name: 'hello world'
  };

  const store = createStore(initState);

  yield this.render('home/index', {store, title: 'test'});
};

exports.jstpl = function* homeController() {
	const initState = {
		name: 'hello world'
  };

  const store = createStore(initState);

  yield this.render('home/indexJs', {store, title: 'test'});
}

exports.combo = function* () {
  yield this.render('home/combo', {});
};

exports.cdnSupply = function* cdnSupply() {
  yield this.render('home/cdnSupply', {});
}
