
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const omit = require('lodash/omit');
const debug = require('debug')('beidou-plugin:webpack');

module.exports = (app) => {
  const config = app.config;
  const options = config.webpack;
  debug('current webpack plugin config: %j ', options);
  const defaultEntryName = options.defaultEntryName;
  const serveRoot = config.routeMatchRoot;
  const exclude = config.routeMatchExclude;
  const clientDir = config.client;
  const pageDir = path.join(clientDir, serveRoot);
  debug('resolve entry in dir: %s', pageDir);


  const hmr = options.hmr;
  const entry = {};
  let headEntries = [];
  if (hmr && hmr.enable) {
    const params = Object.keys(omit(hmr, ['enable']))
    .map(key => `${key}=${hmr[key]}`)
    .join('&');
    headEntries = [
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?${params}`
    ];
  }

  const files = glob.sync('@(*.js|*.jsx)', {
    cwd: pageDir,
    ignore: exclude
  });

  files.forEach((file) => {
    const filename = path.parse(file).name;
    entry[filename] = [
      ...headEntries,
      path.normalize(pageDir + path.sep + file),
    ];
  });

  const dirs = glob.sync('*/', {
    cwd: pageDir,
    ignore: exclude
  });

  dirs.forEach((file) => {
    const filename = path.parse(file).name;
    const entryFile = pageDir + file + defaultEntryName;
    if (fs.existsSync(entryFile)) {
      entry[filename] = [
        ...headEntries,
        entryFile
      ];
    }
  });


  debug('get entry file from %s : $j', pageDir, entry);

  return entry;
};
