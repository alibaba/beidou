'use strict';

const is = require('is');
const Plugin = require('./Plugin');
const Rule = require('./Rule');

class Factory {
  init() {
    this._envFactories = {};
    this._plugins = {};
    this._rules = {};
    this._webpackConfig = {};
    this._loaders = {};
  }
}

class WebpackFactory extends Factory {
  env(env) {
    const factories = Object.getPrototypeOf(this)._envFactories;
    if (factories[env]) {
      return factories[env];
    } else {
      const factory = new WebpackFactory(env);
      Object.getPrototypeOf(this)._envFactories[env] = factory;
      return factory;
    }
  }

  setEnv(env) {
    this._currentEnv = env;
  }

  getEnv() {
    return this._currentEnv;
  }

  _localConfig() {
    if (this.getEnv()) {
      return this._webpackConfig;
    } else {
      return Object.getPrototypeOf(this)._webpackConfig;
    }
  }

  _commonConfig() {
    return Object.getPrototypeOf(this)._webpackConfig;
  }

  _getFinalPlugins() {
    const plugins = [];
    if (this.getEnv()) {
      const mergePlugins = Object.assign(
        Object.getPrototypeOf(this)._plugins,
        this._plugins
      );
      Object.values(mergePlugins).forEach((v) => {
        plugins.push(v.init());
      });
    } else {
      Object.values(Object.getPrototypeOf(this)._plugins).forEach((v) => {
        plugins.push(v.init());
      });
    }
    return plugins;
  }

  _getFinalRules() {
    const rules = [];
    if (this.getEnv()) {
      const mergeRules = Object.assign(
        Object.getPrototypeOf(this)._rules,
        this._rules
      );
      Object.values(mergeRules).forEach((v) => {
        rules.push(v.options);
      });
    } else {
      Object.values(Object.getPrototypeOf(this)._rules).forEach((v) => {
        rules.push(v.options);
      });
    }
    return rules;
  }

  getConfig() {
    let _webpackConfig = {};
    const plugins = this._getFinalPlugins();
    const rules = this._getFinalRules();
    if (this.getEnv()) {
      _webpackConfig = Object.assign(
        this._commonConfig(),
        this._localConfig()
      );
    } else {
      _webpackConfig = this._commonConfig();
    }
    _webpackConfig.plugins = plugins;
    const { module: mod } = _webpackConfig;
    if (!mod) {
      _webpackConfig.module = {
        rules,
      };
    } else {
      _webpackConfig.module.rules = rules;
    }
    return _webpackConfig;
  }


  set(key, config) {
    this._localConfig()[key] = config;
    return this;
  }

  reset(config) {
    if (this.getEnv()) {
      this.init();
      this._webpackConfig = config;
    } else {
      Object.getPrototypeOf(this).init();
      Object.getPrototypeOf(this)._webpackConfig = config;
    }
    return this;
  }

  get(key, filter) {
    const keyData = this._localConfig()[key];
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

  addPlugin(model, options, alias) {
    const plugin = new Plugin(model, options, alias);
    if (this.getEnv()) {
      this._plugins.push = plugin;
    } else {
      Object.getPrototypeOf(this)._plugins[plugin.alias] = plugin;
    }
    return this;
  }

  addPlugins(plugins) {
    for (const row of plugins) {
      this.addPlugin(row);
    }
    return this;
  }


  getPlugin(params) {
    if (is.string(params)) {
      return this._plugins[params];
    } else if (is.function(params)) {
      return params(this._plugins);
    } else {
      throw new Error(
        'get plugin param type exception!'
      );
    }
  }

  modifyPlugin(alias, model, options) {
    let plugin = this._plugins;
    if (!this.getEnv()) {
      plugin = Object.getPrototypeOf(this)._plugins;
    }
    if (is.string(alias) && plugin[alias]) {
      plugin[alias].reset(model, options);
    } else {
      throw new Error(
        'get plugin param type exception!'
      );
    }
    return this;
  }


  defineLoader(name, resolve) {
    this._loaders[name] = resolve || require.resolve(name);
    return this;
  }

  getLoader(params) {
    if (is.string(params)) {
      return this._loaders[params];
    } else if (is.function(params)) {
      return params(this._loaders);
    } else {
      throw new Error(
        'get loader param type exception!'
      );
    }
  }

  addRule(options, alias) {
    const rule = new Rule(options, alias);
    if (this.getEnv()) {
      this._rules[rule.alias] = rule;
    } else {
      Object.getPrototypeOf(this)._rules[rule.alias] = rule;
    }
  }

  addRules(rules) {
    for (const row of rules) {
      this.addRule(row);
    }
  }

  modifyRule(alias, options) {
    let rules = this._rules;
    if (!this.getEnv()) {
      rules = Object.getPrototypeOf(this)._rules;
    }
    if (is.string(alias) && this.rules[alias]) {
      rules[alias].reset(options);
    } else {
      throw new Error(
        'get plugin param type exception!'
      );
    }
    return this;
  }

  getRule(params) {
    if (is.string(params)) {
      return this._rules[params];
    } else if (is.function(params)) {
      return params(this._rules);
    } else {
      throw new Error(
        'get rules param type exception!'
      );
    }
  }


  getLocalPluginConfig() {
    const plugins = [];
    Object.values(this._plugins).forEach((val) => {
      plugins.push(val.init());
    });
    return plugins;
  }

  getLocalRuleConfig() {
    const rules = [];
    Object.values(this._rules).forEach((val) => {
      rules.push(val.options);
    });
    return rules;
  }
}
module.exports = WebpackFactory;
