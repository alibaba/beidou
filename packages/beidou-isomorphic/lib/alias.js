'use strict';

const Module = require('module');
const path = require('path');

module.exports = function handle(config) {
  const originalResolveFileName = Module._resolveFilename;
  Module._resolveFilename = function (request, parent) {
    for (const key of Object.keys(config)) {
      if (request === key || request.startsWith(`${key}/`)) {
        request = path.normalize(
          `${config[key]}${request.substring(key.length)}`
        );
        break;
      }
    }
    return originalResolveFileName.apply(this, [request, parent]);
  };
};
