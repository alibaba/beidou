'use strict';

const path = require('path');
const glob = require('glob');
const debug = require('debug')('beidou-plugin:webpack');

module.exports = (app, devServer = {}, dev = false) => {
  const config = app.config;
  const router = config.router || {};
  const options = config.webpack;
  debug('current webpack plugin config: %j ', options);
  const serveRoot = router.root || './';
  const exclude = router.exclude || '_*';
  const entryName = router.entry ? router.entry : 'index';
  const exts = router.exts || ['.jsx', '.js'];
  const clientDir = config.client;
  const pageDir = path.join(clientDir, serveRoot);
  debug('resolve entry in dir: %s', pageDir);

  function searchForEntries(cwd, name = '*') {
    const files = glob
      .sync(`@(${exts.map(ext => name + ext).join('|')})`, {
        cwd,
        ignore: exclude,
      })
      .sort(
        (a, b) => exts.indexOf(path.extname(a)) >= exts.indexOf(path.extname(b))
      );

    if (files && files[0]) {
      return files.map(file => path.join(cwd, file));
    }
    return null;
  }

  const entry = {};
  let headEntries = [];
  if (dev && (devServer.hot || devServer.hotOnly)) {
    const port = devServer.port || app.options.port;
    headEntries = [
      `webpack-dev-server/client?http://0.0.0.0:${port}`,
      'webpack/hot/only-dev-server',
    ];
  }

  if (router.entry) {
    const files = searchForEntries(pageDir, router.entry);
    if (files) {
      entry.index = [...headEntries, files[0]];
    }
  } else {
    const files = searchForEntries(pageDir);
    files.forEach((file) => {
      const filename = path.parse(file).name;
      entry[filename] = [...headEntries, file];
    });
  }

  const dirs = glob.sync('*/', {
    cwd: pageDir,
    ignore: exclude,
  });

  dirs.forEach((dir) => {
    const files = searchForEntries(path.join(pageDir, dir), entryName);

    if (files) {
      const name = path.basename(dir);
      entry[name] = [...headEntries, files[0]];
    }
  });

  return entry;
};
