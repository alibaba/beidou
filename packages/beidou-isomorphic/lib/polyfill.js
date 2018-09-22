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
  global.requestAnimationFrame = /* istanbul ignore next */ () => {};
}

exports.basicPolyfill = () => {
  setPolyfill(jsdom(html).defaultView);
};
