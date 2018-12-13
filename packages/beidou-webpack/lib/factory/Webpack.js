'use strict';

const is = require('is');
const Plugin = require('./plugin');
const Rule = require('./rule');

class Factory {
  init() {
    this.__envFactories = {};
    this.__defineloaders = {};
    this.__definePlugins = {};
    this.__defineRules = {};
  }
}

class WebpackFactory extends Factory {
  constructor(config, plugins, rules) {
    super();
    this.__webpackConfig = config || {};
    this.__plugins = plugins || {};
    this.__rules = rules || {};
  }

  /**
   * return new instance for new env
   * @param {*} env
   * @return {Object}
   */
  env(env) {
    if (!env) {
      throw new Error(
        'Env param is required!'
      );
    }
    const factories = Object.getPrototypeOf(this).__envFactories;
    if (factories[env]) {
      return factories[env];
    } else {
      const factory = new WebpackFactory(this.__webpackConfig, this.__plugins, this.__rules);
      Object.getPrototypeOf(this).__envFactories[env] = factory;
      return factory;
    }
  }

  getEnv() {
    return this.env;
  }

  /**
   * generate final plugins config for webpack config
   * @return {Array}
   */
  _getFinalPlugins() {
    const plugins = [];
    Object.values(this.__plugins).forEach((v) => {
      plugins.push(v.init());
    });
    return plugins;
  }

  /**
   * generate final rules config for webpack config
   * @return {Array}
   */
  _getFinalRules() {
    const rules = [];
    Object.values(this.__rules).forEach((v) => {
      rules.push(v.options);
    });
    return rules;
  }

  /**
   * generate final config for webpack config
   * @return {Object}
   */
  getConfig() {
    const plugins = this._getFinalPlugins();
    const rules = this._getFinalRules();

    this.__webpackConfig.plugins = plugins;
    const { module: mod } = this.__webpackConfig;
    if (!mod) {
      this.__webpackConfig.module = {
        rules,
      };
    } else {
      this.__webpackConfig.module.rules = rules;
    }
    return this.__webpackConfig;
  }


  set(key, config) {
    this.__webpackConfig[key] = config;
    return this;
  }

  reset(config) {
    if (config) {
      this.__webpackConfig = config;
    } else {
      this.__webpackConfig = {};
    }
    return this;
  }

  get(key, filter) {
    const keyData = this.__webpackConfig[key];
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
    } else if (is.string(filter) || is.number(filter)) {
      return keyData[filter];
    } else {
      return null;
    }
  }

  addPlugin(...args) {
    if (args.length === 1 && is.string(args[0])) {
      if (this.usePlugin(args[0])) {
        this.__plugins[args[0]] = this.usePlugin(args[0]);
        return this;
      } else {
        throw new Error(
          `${args[0]} the plugin alias not exsit! `
        );
      }
    }
    const pluginObj = new Plugin(...args);
    if (this.__plugins[pluginObj.alias]) {
      throw new Error(
        `${pluginObj.alias} the plugin alias exsit! please change alias.`
      );
    }
    this.__plugins[pluginObj.alias] = pluginObj;
    return this;
  }

  getPlugin(params) {
    if (is.string(params)) {
      return this.__plugins[params];
    } else if (is.function(params)) {
      return params(this.__plugins);
    } else {
      throw new Error(
        'get plugin param type exception!'
      );
    }
  }

  setPlugin(...args) {
    const pluginObj = new Plugin(...args);
    this.__plugins[pluginObj.alias] = pluginObj;
    return this;
  }

  definePlugin(...args) {
    const pluginObj = new Plugin(...args);
    Object.getPrototypeOf(this).__definePlugins[pluginObj.alias] = pluginObj;
    return this;
  }

  usePlugin(alias) {
    return Object.getPrototypeOf(this).__definePlugins[alias];
  }

  clearPlugin() {
    this.__plugins = {};
  }


  addRule(...args) {
    if (args.length === 1 && !is.object(args[0])) {
      const alias = args[0];
      if (this.useRule(alias)) {
        this.__rules[alias] = this.useRule(alias);
        return this;
      } else {
        throw new Error(
          `${args[0]} the rule alias not exsit! `
        );
      }
    }

    const ruleObj = new Rule(...args);
    if (this.__rules[ruleObj.alias]) {
      throw new Error(
        `${ruleObj.alias} the rules alias exsit! please change alias.`
      );
    }
    this.__rules[ruleObj.alias] = ruleObj;
    return this;
  }

  getRule(params) {
    if (is.string(params)) {
      return this.__rules[params];
    } else if (is.function(params)) {
      return params(this.__rules);
    } else {
      throw new Error(
        'get rule param type exception!'
      );
    }
  }

  setRule(...args) {
    const ruleObj = new Rule(...args);
    this.__rules[ruleObj.alias] = ruleObj;
    return this;
  }

  defineRule(...args) {
    const ruleObj = new Rule(...args);
    Object.getPrototypeOf(this).__defineRules[ruleObj.alias] = ruleObj;
    return this;
  }

  useRule(alias) {
    return Object.getPrototypeOf(this).__defineRules[alias];
  }

  clearRule() {
    this.__rules = {};
  }


  defineLoader(name, resolve) {
    Object.getPrototypeOf(this).__defineloaders[name] = resolve || require.resolve(name);
    return this;
  }

  useLoader(name) {
    return Object.getPrototypeOf(this).__defineloaders[name];
  }
}
module.exports = WebpackFactory;
