'use strict';

module.exports = antx => {
  return {
    debugDir: `${antx.baseDir}/debug`,
    keys: '123456',
    logger: {
      level: 'NONE',
      consoleLevel: 'NONE',
    },
  }
}
