'use strict';

require('babel-register');

const createStore = require('../../client/store');

exports.jsxtpl = function* () {
  const initState = {
    name: 'hello world'
  };
  const store = createStore(initState);

  this.app.logger.info(store.getState());

  try {
    yield this.render('home/index', { store, title: '测试' });
  } catch (err) {
    console.log(err);
  }
};

exports.jstpl = function* () {
  const initState = {
    name: 'hello world'
  };

  const store = createStore(initState);

  this.app.logger.info(store.getState());

  try {
    yield this.render('home/indexJs', { store, title: '测试' });
  } catch (err) {
    console.log(err);
  }
};

exports.notFound = function* () {
  const initState = {
    name: 'hello world'
  };

  const store = createStore(initState);

  this.app.logger.info(store.getState());

  try {
    yield this.render('home/notFound', { store, title: '测试' });
  } catch (err) {
    if (err.name === 'AssertionError' && err.message.indexOf("Can't find home/notFound from") >= 0) {
      this.body = 'no such file or directory';
      this.status = 404;
    }
  }
};

exports.notImplemented = function* () {
  const initState = {
    name: 'hello world'
  };

  const store = createStore(initState);

  this.app.logger.info(store.getState());

  try {
    yield this.renderString('home/index', { store, title: '测试' });
  } catch (err) {
    if (err.status === 200 || err.name === 'not implemented yet!') {
      this.body = 'not implemented yet!';
      this.status = 200;
    }
  }
};

exports.client = function* clientRender() {
  const initState = {
    name: 'hello world'
  };

  const store = createStore(initState);

  yield this.render('home', { store, title: '测试' });
};

exports.cdn = function* cdn() {
  yield this.render('home/cdn', {});
};

exports.cdnSupply = function* cdnSupply() {
  yield this.render('home/cdnSupply', {});
};

exports.appHelper = function* appHelper() {
  yield this.render('home/appHelper', {});
};

exports.combo = function* () {
  yield this.render('home/combo', {});
};

exports.comboSupply = function* () {
  yield this.render('home/comboSupply', {});
};

exports.localResource = function* () {
  yield this.render('home/localResource');
};
