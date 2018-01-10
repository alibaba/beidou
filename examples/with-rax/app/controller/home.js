'use strict';

const { Controller } = require('beidou-core');

class HomeController extends Controller {
  * index() {
    const { ctx } = this;
    yield ctx.render('test.jsx');
    ctx.status = 200;
  }
}

module.exports = HomeController;
