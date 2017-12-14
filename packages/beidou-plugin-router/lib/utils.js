
const fs = require('mz/fs');
const path = require('path');

const resolved = {};

exports.resolvePath = function* (name, providers, root, exclude, ext, entry) {
  exclude = typeof exclude === 'string' ? new RegExp(exclude) : exclude;

  for (const dir of name.split('/')) {
    if (exclude.test(dir)) {
      return false;
    }
  }

  const names = [name, path.join(name, entry + ext)];
  const currentExt = path.extname(name);
  if (!currentExt && !/\/$/.test(name)) {
    names.unshift(name + ext);
  }

  for (const file of names) {
    if (!exclude.test(name)) {
      for (const dir of providers) {
        const target = path.join(dir, file);
        if (yield fs.exists(target)) {
          const stat = yield fs.stat(target);
          if (stat.isFile()) {
            return path.join(root, file);
          }
        }
      }
    }
  }

  return false;
};

exports.cached = (key) => {
  return resolved[key];
};

exports.putCache = (key, value) => {
  resolved[key] = value;
};
