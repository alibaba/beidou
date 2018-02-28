'use strict';

module.exports = antx => ({
  debugDir: `${antx.baseDir}/debug`,
  keys: '123456',
  logger: {
    level: 'NONE',
    consoleLevel: 'NONE',
  },
});
