'use strict';

const is = require('is');
const webpack = require('webpack');

class Factory {
  constructor() {
    this._webpackConf = {};
    this.webpackFn = webpack;
  }

  setWebpack(fn) {
    this.webpackFn = fn;
  }

  getWebPack() {
    return this.webpackFn;
  }
}

class ConfFactory extends Factory {
  constructor(env) {
    super();
    if (env) {
      this._env = env;
    }
  }

  init(options, appDev) {
    Object.getPrototypeOf(this)._webpackConf = options || {};
    Object.getPrototypeOf(this).__sys_env = appDev;
  }

  webpack() {
    return this.webpackFn(this.getConf());
  }

  append(options) {
    if (this._env && this.__sys_env !== this._env) return this;
    const config = Object.assign(this.getConf(), options);
    this.reset(config);
    return this;
  }


  setEnv(env) {
    this._env = env;
    return this;
  }

  env(env) {
    return new ConfFactory(env || this._env);
  }

  resetEnv() {
    delete this._env;
    return this;
  }

  getEnv() {
    return this._env;
  }

  getConf() {
    return Object.getPrototypeOf(this)._webpackConf;
  }


  set(key, config) {
    if (!this._env || this.__sys_env === this._env) { Object.getPrototypeOf(this)._webpackConf[key] = config; }
    return this;
  }

  reset(config) {
    if (!this._env || this.__sys_env === this._env) { Object.getPrototypeOf(this)._webpackConf = config; }
    return this;
  }

  get(key, filter) {
    const keyData = this.getConf()[key];
    if (!keyData && filter) {
      throw new Error(
        `webpack don't exist the key , ${key} value is undefined!`
      );
    }
    if (!filter) {
      return keyData;
    }
    if (is.function(filter)) {
      return filter(keyData);
    }
    if (is.array(keyData)) {
      for (const v of keyData) {
        if (is.object(v)) {
          if (v.constructor.name === filter) return v;
        } else if (v === filter) return v;
      }
    } else if (is.string(keyData)) {
      if (is.regexp(filter)) {
        if (filter.test(keyData) === true) {
          return keyData;
        } else {
          return null;
        }
      }
    }
  }

  getPlugin(filter) {
    const { plugins } = this.getConf();
    if (is.undefined(plugins)) {
      throw new Error(
        'webpack plugins don`t exist'
      );
    }
    if (!is.array(plugins)) {
      throw new Error(
        'webpack plugins is wrong , please check'
      );
    }
    if (is.function(filter)) {
      return filter(plugins);
    } else if (is.string(filter)) {
      for (const plugin of plugins) {
        if (plugin.constructor.name === filter) {
          return plugin;
        }
      }
    }
    return null;
  }

  setPlugin(filter, config) {
    if (this._env && this.__sys_env !== this._env) return this;
    let { plugins } = this.getConf();
    if (is.undefined(plugins)) {
      throw new Error(
        'webpack plugins don`t exist'
      );
    }
    if (!is.array(plugins)) {
      throw new Error(
        'webpack plugins is wrong , please check'
      );
    }
    if (is.function(filter)) {
      filter(plugins);
    } else if (is.string(filter)) {
      plugins = plugins.map((val) => {
        if (val.constructor.name === filter) {
          return config;
        } else {
          return val;
        }
      });
      this.set('plugins', plugins);
    }

    return this;
  }

  addPlugin(plugin) {
    if (this._env && this.__sys_env !== this._env) return this;
    let { plugins } = this.getConf();
    if (!plugins || !is.array(plugins)) {
      plugins = [];
    }
    if (is.array(plugin)) {
      plugins = plugins.concat(plugin);
    } else {
      plugins.push(plugin);
    }
    this.set('plugins', plugins);
    return this;
  }

  getRule(filter) {
    const { mod } = this.getConf();
    if (!mod) {
      throw new Error(
        'webpack module don`t exist'
      );
    }
    const { rules } = mod;
    if (!is.array(rules)) {
      return null;
    }
    if (is.function(filter)) {
      return filter(rules);
    } else if (is.regexp(filter)) {
      for (const row of rules) {
        if (filter.test(row.test.toString()) === true) {
          return row;
        }
      }
    } else if (is.string(filter)) {
      for (const row of rules) {
        if (row.test(filter) === true) {
          return row;
        }
      }
    }
    return null;
  }

  addRule(rule) {
    if (this._env && this.__sys_env !== this._env) return this;
    let { module: mod } = this.getConf();
    if (!mod) {
      mod = { rules: [] };
    }
    if (!is.array(mod.rules)) {
      mod.rules = [];
    }
    if (is.array(rule)) {
      mod.rules = mod.rules.concat(rule);
    } else {
      mod.rules.push(rule);
    }
    this.set('module', mod);
    return this;
  }

  getLoader(filter) {
    const { mod } = this.getConf();
    if (!mod) {
      throw new Error(
        'webpack module don`t exist'
      );
    }
    const { rules } = mod;
    if (!is.array(rules)) {
      return null;
    }
    if (is.regexp(filter)) {
      for (const row of rules) {
        if (row.use && row.user.loader) {
          if (filter.test(row.user.loader) === true) {
            return row.user.loader;
          }
        }
      }
    } else if (is.string(filter)) {
      for (const row of rules) {
        if (row.use && row.user.loader) {
          if (filter === row.user.loader) {
            return row.user.loader;
          }
        }
      }
    }
    return null;
  }
}

module.exports = ConfFactory;
