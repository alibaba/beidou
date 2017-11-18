/**
 * util方法集合
 */


const assert = require('assert');
const fs = require('fs');
/**
 * 判断模块是否存在
 * @method Util#existsModule
 * @param {String} path - 模块路径
 * @return {boolean} 如果模块存在则返回 `true`，否则返回 `false`。
 */
exports.existsModule = function (path) {
  return fs.existsSync(path);
};

/**
 * 尝试加载一个模块
 *
 * @param {String} modulePath 加载的模块路径
 * @param {Boolean} required 加载的模块是否必须存在
 * @param {Object|String} defaultValue 不存在时返回的默认值
 * @return {Object} 返回加载的模块
 */
exports.tryRequire = function (modulePath, required, defaultValue) {
  const exist = exports.existsModule(modulePath);
  if (required) {
    assert(exist, `${modulePath} must exists`);
  }

  if (exist) {
    return require(modulePath);
  }
  return defaultValue || {};
};
