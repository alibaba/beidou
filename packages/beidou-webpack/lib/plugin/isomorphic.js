'use strict';

const Module = require('module');
const path = require('path');
const assert = require('assert');
const _ = require('lodash');
const fs = require('fs');
const mkdirp = require('mkdirp');
const MemoryFileSystem = require('memory-fs');
const debug = require('debug')('beidou:webpack');

/**
 * isomorphic plugin for webpack
 * @param {*} options
 *  {
 *    context: // webpack context
 *    assetsFilePath: // path for asset file write into
 *    assets: [{
 *      ext: '.scss',
 *      exclude: 'node_modules'
 *      include: false,
 *    }]
 *  }
 */
function IsomorphicPlugin(options = {}) {
  this.options = Object.assign({}, options);
  this.exts = {};
  this.fs = new MemoryFileSystem();
  assert(Array.isArray(this.options.assets), 'assets should be an array');

  for (const asset of this.options.assets) {
    if (typeof asset === 'string' && /\.[0-9a-zA-Z]+/.test(asset)) {
      this.exts[asset] = {
        ext: asset,
        exclude: 'node_modules',
      };
    } else if (
      typeof asset === 'object' &&
      asset.ext &&
      /\.[0-9a-zA-Z]+/.test(asset.ext)
    ) {
      asset.exclude = asset.exclude || 'node_modules';
      this.exts[asset.ext] = asset;
    }
  }

  debug('IsomorphicPlugin initialized with exts: %o', this.exts);
}

IsomorphicPlugin.prototype.apply = function (compiler) {
  // if not assign context, use webpack context
  if (!this.options.context) {
    this.options.context = compiler.context;
  }

  // if not assign assets file path, use default one
  if (!this.options.assetsFilePath) {
    this.options.assetsFilePath = path.join(
      compiler.context,
      '.isomorphic/assets.json'
    );
  }

  // if not assign the __webpack_public_path__ value , set it default
  if (!global.__webpack_public_path__) {
    global.__webpack_public_path__ = compiler.options.output.publicPath;
  }

  const cb = (stats) => {
    const json = stats.toJson();

    debug('webpack compile json:\n', JSON.stringify(json, null, 2));
    const results = json.modules
      .map(module => this.parse(module))
      .filter(result => result);
    this.save(results);
  };

  if (compiler.hooks) {
    const plugin = { name: 'IsomorphicPlugin' };

    compiler.hooks.done.tap(plugin, cb);
  } else {
    compiler.plugin('done', cb);
  }
};

IsomorphicPlugin.prototype.parse = function (module) {
  const { name } = module;
  const ext = path.extname(name);
  const config = this.getConfig(ext);
  return this.parseForConfig(module, config);
};

IsomorphicPlugin.prototype.parseForConfig = function (module, config) {
  if (!config) return null;

  if (!_.isRegExp(config.exclude)) {
    config.exclude = new RegExp(config.exclude);
  }
  if (config.include && !_.isRegExp(config.include)) {
    config.include = new RegExp(config.include);
  }
  // match exclude, ignore it.
  if (config.exclude.test(module.name)) {
    return null;
  }

  // if set `include`, test it, works together with `exclude`
  if (config.include && !config.include.test(module.name)) return null;
  // TODO: clean-css if needed
  return {
    content: module.source,
    name: module.name,
    config,
    module,
  };
};

IsomorphicPlugin.prototype.getConfig = function (ext) {
  const config = this.exts[ext];
  if (!config) {
    return null;
  }
  return config;
};

IsomorphicPlugin.prototype.save = function (results) {
  const filePath = this.options.assetsFilePath;
  const dir = path.dirname(filePath);
  const { context } = this.options;
  const json = {};
  for (const result of results) {
    const absolutePath = path.join(context, result.name);
    const relativePath = path.relative(context, absolutePath);

    const m = new Module(absolutePath);
    try {
      m._compile(result.content, absolutePath);
      const { exports } = m;
      json[relativePath] = exports;
    } catch (e) {
      // do nothing
    }
  }
  const content = JSON.stringify(json, null, '  ');
  // if (!this.options.memoryFs) {
  mkdirp.sync(dir);
  fs.writeFileSync(filePath, content, { flag: 'w' });
  // } else {
  //   this.fs.mkdirpSync(dir);
  //   this.fs.writeFileSync(filePath, content, { flag: 'w' });
  // }
};

module.exports = IsomorphicPlugin;
