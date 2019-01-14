'use strict';

const fs = require('fs');
const path = require('path');
const { jsdom } = require('jsdom');

const html = fs.readFileSync(path.join(__dirname, './page.html'), 'utf8');

function setPolyfill(window) {
  // common BOM
  global.window = window;
  global.document = window.document;
  global.screen = window.screen;
  global.location = window.location;
  global.history = window.history;
  global.navigator = window.navigator;
  global.XMLHttpRequest = window.XMLHttpRequest;
  global.File = window.File;
  global.Image = window.Image;
  global.matchMedia = /* istanbul ignore next */ () => ({
    matches: true,
    addListener() {},
    removeListener() {},
  });
  window.matchMedia = global.matchMedia;
}

exports.basicPolyfill = () => {
  setPolyfill(jsdom(html).defaultView);
};

/**
 * inject env variables into global
 * used to separate server side code from client side
 * @param {*} ENV dev/production
 */
exports.setGlobal = function (ENV) {
  global.__ENV__ = ENV;
  global.__CLIENT__ = false;
  global.__SERVER__ = true;
  global.__DEVELOPMENT__ = ENV !== 'production';
  global.__DEV__ = ENV === 'local';
};
