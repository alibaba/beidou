'use strict';

require('babel-register');

const createStore = require('../../client/store');

exports.jsxtpl = async function () {
  const initState = {
    name: 'hello world'
  };
  const store = createStore(initState);

  try {
    await this.render('home/index', { store, title: 'test' });
  } catch (err) {
    console.log(err);
  }
};

exports.jstpl = async function () {
  const initState = {
    name: 'hello world'
  };

  const store = createStore(initState);

  this.app.logger.info(store.getState());

  try {
    await this.render('home/indexJs', { store, title: 'test' });
  } catch (err) {
    console.log(err);
  }
};

exports.notFound = async function () {
  const initState = {
    name: 'hello world'
  };

  const store = createStore(initState);

  this.app.logger.info(store.getState());

  try {
    await this.render('home/notFound', { store, title: 'test' });
  } catch (err) {
    /*
    * in nodejs 8, name of AssertionError is: AssertionError [ERR_ASSERTION]
    */
    if (err instanceof Error && err.message.indexOf("Can't find home/notFound from") >= 0) {
      this.body = 'no such file or directory';
      this.status = 404;
    }
  }
};

exports.notImplemented = async function () {
  const initState = {
    name: 'hello world'
  };

  const store = createStore(initState);

  this.app.logger.info(store.getState());

  try {
    await this.renderString('home/index', { store, title: 'test' });
  } catch (err) {
    if (err.status === 200 || err.name === 'not implemented yet!') {
      this.body = 'not implemented yet!';
      this.status = 200;
    }
  }
};

exports.client = async function clientRender() {
  const initState = {
    name: 'hello world'
  };

  const store = createStore(initState);

  await this.render('home', { store, title: 'test' });
};

exports.cdn = async function cdn() {
  await this.render('home/cdn', {});
};

exports.cdnSupply = async function cdnSupply() {
  await this.render('home/cdnSupply', {});
};

exports.appHelper = async function appHelper() {
  await this.render('home/appHelper', {});
};

exports.combo = async function () {
  await this.render('home/combo', {});
};

exports.comboSupply = async function () {
  await this.render('home/comboSupply', {});
};

exports.localResource = async function () {
  await this.render('home/localResource');
};
