'use strict';

const fs = require('mz/fs');
const path = require('path');
const globToRegExp = require('glob-to-regexp');

const resolved = {};

exports.resolvePath = async function (
  name,
  providers,
  root,
  exclude,
  ext,
  entry
) {
  if (exclude) {
    exclude = globToRegExp(exclude);
    for (const dir of name.split('/')) {
      if (exclude.test(dir)) {
        return false;
      }
    }
  }

  const names = entry
    ? [path.join(name, entry + ext)]
    : [name, path.join(name, `index${ext}`)];

  const currentExt = path.extname(name);
  if (!entry && !currentExt && !/\/$/.test(name)) {
    names.unshift(name + ext);
  }

  /* eslint-disable no-await-in-loop */

  for (const file of names) {
    if (!exclude.test(name)) {
      for (const dir of providers) {
        const target = path.join(dir, file);
        if (await fs.exists(target)) {
          const stat = await fs.stat(target);
          if (stat.isFile()) {
            return path.join(root, file);
          }
        }
      }
    }
  }

  return false;
};

exports.cached = key => resolved[key];

exports.putCache = (key, value) => {
  resolved[key] = value;
};
