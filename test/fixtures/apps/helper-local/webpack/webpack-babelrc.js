'use strict'; // eslint-disable-line

/**
* 客户端使用到的babel配置项在此处配置，.babelrc 中的配置在服务端生效
*/
const babelrc = {
  presets: ['beidou-client']
};

module.exports = JSON.stringify(babelrc);
