
const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom').jsdom;

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
  global.matchMedia = () => ({
    matches: true,
    addListener() { },
    removeListener() { }
  });
  window.matchMedia = global.matchMedia;
}

module.exports.fullPolyfill = (ctx) => {
  const isomorphic = jsdom(html, {
    url: ctx.request.href,
    cookie: ctx.request.header.cookie,
    userAgent: ctx.request.header['user-agent']
  });

  setPolyfill(isomorphic.defaultView);
};

module.exports.basicPolyfill = () => {
  setPolyfill(jsdom(html).defaultView);
};

