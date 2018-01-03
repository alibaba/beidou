const Module = require('module');
const path = require('path');

module.exports = function handle(config) {
  const originalResolveFileName = Module._resolveFilename;
  const keys = Object.keys(config);
  Module._resolveFilename = function (request, parent) {
    for (let i = 0; i < keys.length; i += 1) {
      if (request === keys[i] || request.indexOf(`${keys[i]}/`) === 0) {
        request = path.normalize(
          `${config[keys[i]]}${request.substring(keys[i].length)}`
        );
        break;
      }
    }
    return originalResolveFileName.apply(this, [request, parent]);
  };
};
