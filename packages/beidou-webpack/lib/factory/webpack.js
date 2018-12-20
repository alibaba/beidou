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
    this.__rules = rules || [];
  }

  /**
   * return new instance for new env
   * @param {*} env
   * @return {Object}
   */
  env(env) {
    if (!env) {
      throw new Error('Env param is required!');
    }
    const factories = Object.getPrototypeOf(this).__envFactories;
    if (factories[env]) {
      return factories[env];
    } else {
      const factory = new WebpackFactory(
        Object.assign({}, this.__webpackConfig),
        Object.assign({}, this.__plugins),
        [].concat(this.__rules)
      );
      factory.env = env;
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
  getPluginConfig() {
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
  getRuleConfig() {
    const rules = [];
    this.__rules.forEach((v) => {
      rules.push(v.options);
    });
    return rules;
  }

  /**
   * generate final config for webpack config
   * @return {Object}
   */
  getConfig() {
    const plugins = this.getPluginConfig();
    const rules = this.getRuleConfig();

    this.__webpackConfig.plugins = plugins;
    const { module: mod } = this.__webpackConfig;
    if (!mod) {
      this.__webpackConfig.module = {
        rules,
      };
    } else {
      this.__webpackConfig.module.rules = rules;
    }
    return Object.assign({}, this.__webpackConfig);
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
        const plugin = this.usePlugin(args[0]);
        this.__plugins[plugin.alias] = plugin;
        return this;
      } else {
        throw new Error(`${args[0]} the plugin alias not exsit! `);
      }
    }
    if (args.length === 1 && args[0].constructor === Plugin) {
      const plugin = args[0];
      this.__plugins[plugin.alias] = plugin;
      return this;
    }

    const pluginObj = new Plugin(...args);
    this.__plugins[pluginObj.alias] = pluginObj;
    return this;
  }

  getPlugin(params) {
    if (is.string(params)) {
      return this.__plugins[params];
    } else if (is.function(params)) {
      for (const p of Object.values(this.__plugins)) {
        if (params(p)) {
          return p;
        }
      }
      return null;
    } else {
      throw new Error('get plugin param type exception!');
    }
  }

  setPlugin(...args) {
    let pluginObj = {};
    if (args.length === 1 && args[0].constructor === Plugin) {
      [pluginObj] = args;
    } else {
      pluginObj = new Plugin(...args);
    }
    this.__plugins[pluginObj.alias] = pluginObj;
    return this;
  }

  definePlugin(...args) {
    const pluginObj = new Plugin(...args);
    Object.getPrototypeOf(this).__definePlugins[pluginObj.alias] = pluginObj;
    return this;
  }

  usePlugin(filter) {
    const definePlugins = Object.getPrototypeOf(this).__definePlugins;
    if (is.string(filter)) {
      return definePlugins[filter];
    } else if (is.function(filter)) {
      return filter(Object.values(definePlugins));
    } else {
      throw new Error('use plugin param type exception!');
    }
  }

  getDefinePlugins() {
    return Object.getPrototypeOf(this).__definePlugins;
  }

  clearPlugin() {
    this.__plugins = {};
  }

  addRule(...args) {
    if (args.length === 1 && !is.object(args[0])) {
      const alias = args[0];
      if (this.useRule(alias)) {
        this.__rules.push(this.useRule(alias));
        return this;
      } else {
        throw new Error(`${args[0]} the rule alias not exsit! `);
      }
    }

    if (args.length === 1 && args[0].constructor === Rule) {
      this.__rules.push(args[0]);
      return this;
    }

    const ruleObj = new Rule(...args);
    this.__rules.push(ruleObj);
    return this;
  }

  getRule(params) {
    if (is.string(params)) {
      return this.__rules.find(
        v => v.alias === params || v.options.test.test(params) === true
      );
    } else if (is.function(params)) {
      for (const rule of this.__rules) {
        if (params(rule)) {
          return rule;
        }
      }
      return null;
    } else if (is.regexp(params)) {
      return this.__rules.find(
        v => v.options.test.toString() === params.toString()
      );
    } else {
      throw new Error('get rule param type exception!');
    }
  }

  setRule(...args) {
    let ruleObj = {};
    if (args.length === 1 && args[0].constructor === Rule) {
      [ruleObj] = args;
    } else {
      ruleObj = new Rule(...args);
    }

    let exsitRule = this.__rules.find(
      v => v.alias.toString() === ruleObj.alias.toString()
    );
    if (exsitRule) {
      exsitRule = ruleObj;
    } else {
      this.__rules.push(ruleObj);
    }

    return this;
  }

  defineRule(...args) {
    const ruleObj = new Rule(...args);
    Object.getPrototypeOf(this).__defineRules[ruleObj.alias] = ruleObj;
    return this;
  }

  useRule(filter) {
    const defineRules = Object.getPrototypeOf(this).__defineRules;
    if (is.function(filter)) {
      return filter(Object.values(defineRules));
    }
    if (is.regexp(filter)) {
      return defineRules[filter.toString()];
    }

    if (is.string(filter)) {
      const rule = Object.values(defineRules).find(v => v.alias === filter);
      if (rule) {
        return rule;
      }
    }
    if (is.string(filter)) {
      return Object.values(defineRules).find(v => v.options.test.test(filter));
    }

    return null;
  }

  getDefineRules() {
    return Object.getPrototypeOf(this).__defineRules;
  }

  clearRule() {
    this.__rules = [];
  }

  defineLoader(name, resolve) {
    Object.getPrototypeOf(this).__defineloaders[name] =
      resolve || require.resolve(name);
    return this;
  }

  useLoader(name) {
    return Object.getPrototypeOf(this).__defineloaders[name];
  }
}

module.exports = WebpackFactory;
