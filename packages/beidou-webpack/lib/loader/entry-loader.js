'use strict';

const path = require('path');
const glob = require('glob');
const debug = require('debug')('beidou:webpack');

/**
 * Search for entries
 * @param {Array} exts - extensions string array
 * @param {string} cwd - current working directory
 * @param {string} exclude - ignore directories
 * @param {string} name - entry name
 * @returns {(Array|null)} return absolute path of entries or null if not exist
 */
function searchForEntries({ exts, cwd, exclude, name = '*' }) {
  debug(
    'search in %s with exts: %s, exclude: %s, name: %s',
    cwd,
    exts,
    exclude,
    name
  );
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

/**
 * Get webpack entry config
 * @param {Beidou.Application} app - beidou application instance
 * @param {Object} devServer - webpack.devServer config
 * @param {Boolean} dev - is development env
 */
module.exports = (app, devServer = {}, dev = false, depth = 1) => {
  const { config } = app;
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

  const entry = {};
  let headEntries = [];
  if (dev && (devServer.hot || devServer.hotOnly)) {
    const port = devServer.port || app.options.port;
    headEntries = [
      `${require.resolve('webpack-dev-server/client')}?http://0.0.0.0:${port}`,
      require.resolve('webpack/hot/only-dev-server'),
    ];
  }

  if (router.entry) {
    const files = searchForEntries({
      exts,
      cwd: pageDir,
      exclude,
      name: router.entry,
    });
    if (files) {
      entry.index = [...headEntries, files[0]];
    }
  } else {
    const files = searchForEntries({ exts, cwd: pageDir, exclude });
    if (files) {
      for (const file of files) {
        const filename = path.parse(file).name;
        entry[filename] = [...headEntries, file];
      }
    }
  }

  // search entry file with depth, default 1.

  for (let i = 0; i < depth; i += 1) {
    const globStr = new Array(i + 2).join('*/');
    const dirs = glob.sync(globStr, {
      cwd: pageDir,
      ignore: exclude,
    });

    for (const dir of dirs) {
      const files = searchForEntries({
        exts,
        cwd: path.join(pageDir, dir),
        name: entryName,
      });

      if (files) {
        const name = dir.replace(/\/$/, '');
        if (name in entry) {
          app.logger.warn(
            `Duplicated entry(${name}) detected.
            file entry will be overwritted by dir entry`
          );
        }
        entry[name] = [...headEntries, files[0]];
      }
    }
  }

  return entry;
};
