
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const debug = require('debug')('beidou-plugin:webpack');

module.exports = (app) => {
  const config = app.config;
  const route = config.route || {};

  const options = config.webpack;
  debug('current webpack plugin config: %j ', options);
  const defaultEntryName = options.defaultEntryName;
  const serveRoot = route.root || './';
  const exclude = config.exlude || '_*';
  const clientDir = config.client;
  const pageDir = path.join(clientDir, serveRoot);
  debug('resolve entry in dir: %s', pageDir);


  const hmr = options.hmr;
  const entry = {};
  let headEntries = [];
  if (hmr) {
    const params = Object.keys(hmr)
      .map(key => `${key}=${hmr[key]}`)
      .join('&');
    headEntries = [
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?${params}`,
    ];
  }

  const files = glob.sync('@(*.js|*.jsx)', {
    cwd: pageDir,
    ignore: exclude,
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
    ignore: exclude,
  });

  dirs.forEach((file) => {
    const filename = path.parse(file).name;
    const entryFile = pageDir + file + defaultEntryName;
    if (fs.existsSync(entryFile)) {
      entry[filename] = [
        ...headEntries,
        entryFile,
      ];
    }
  });


  debug('get entry file from %s : $j', pageDir, entry);

  return entry;
};
