'use strict';

const createStore = require('../../client/store');

exports.jsxtpl = async function homeController() {
  const initState = {
    name: 'hello world',
  };

  const store = createStore(initState);

  await this.render('home/index', { store, title: 'test' });
};

exports.jstpl = async function homeController() {
  const initState = {
    name: 'hello world',
  };

  const store = createStore(initState);

  await this.render('home/indexJs', { store, title: 'test' });
};

exports.combo = async function () {
  await this.render('home/combo', {});
};

exports.cdnSupply = async function cdnSupply() {
  await this.render('home/cdnSupply', {});
};
