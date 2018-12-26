'use strict';

const assert = require('assert');
const webpack = require('webpack');
const WebpackFactory = require('../../../lib/factory/webpack');

describe('test/lib/factory/webpack.test.js', () => {
  const factory = new WebpackFactory();
  Object.getPrototypeOf(factory).init();
  it('init the webpack factory', () => {
    const config = factory.getConfig();
    assert(config, 'generate  webpack error ');
  });

  it('set & get webpack config', () => {
    factory.set('mode', 'development');

    let mode = factory.get('mode');
    assert(mode === 'development', 'factory set/get error');
    factory.reset({
      output: {
        path: './build',
      },
    });
    mode = factory.get('mode');
    assert(!mode, 'factory reset fail');
    let output = factory.get('output');
    assert(output.path === './build', 'factory reset value error');
    factory.reset();
    output = factory.get('output');
    assert(!output, 'reset output should undefined')
  });


  it('define loader & use loader', () => {
    factory.defineLoader('babel-loader', 'babel-loader');
    factory.defineLoader('css-loader', );
    const loader = factory.useLoader('babel-loader');
    assert(loader, 'use loader error');
    assert(loader === 'babel-loader');
    const cssloader = factory.useLoader('css-loader');
    assert(cssloader, 'use loader error');
    assert(cssloader === require.resolve('css-loader'));
  });

  it('define plugin & use plugin', () => {

    factory.definePlugin(webpack.NamedModulesPlugin);
    let nameModulesPlugin = factory.usePlugin('NamedModulesPlugin');
    assert(nameModulesPlugin, 'use plugin error');

    let plugins = factory.getDefinePlugins();
    assert(plugins.NamedModulesPlugin, 'get defined plugins')
    factory.addPlugin(nameModulesPlugin)
    factory.setPlugin(nameModulesPlugin)
    nameModulesPlugin = factory.getPlugin('NamedModulesPlugin')
    assert(nameModulesPlugin, 'get plugin error');

    factory.addPlugin(
      webpack.DefinePlugin,
    );

    let DefinePlugin = factory.getPlugin(function (plugin) {
      return plugin.alias === 'DefinePlugin';
    })
    assert(DefinePlugin, 'fucntion get plugin error');

    factory.setPlugin(
      webpack.DefinePlugin, {
        compress: {
          warnings: true,
        },
      },
      'DefinePlugin'
    );

    DefinePlugin = factory.getPlugin('DefinePlugin');
    let {
      compress
    } = DefinePlugin.options
    assert(compress.warnings === true, 'reset plugin error');
  });

  it('define rule & use rule', () => {

    factory.defineRule({
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
          },
        },
      },
      'js'
    );
    let rules = factory.getDefineRules();
    assert(rules.js, 'get defined rules')
    let rule = factory.useRule('js');
    factory.setRule(rule)
    assert(rule, 'use the rule error')
    assert(rule.options, 'use the defined rule error')
    rule = factory.useRule('.jsx')
    assert(rule, 'use regexp the rule error')
    factory.addRule(rule)

    rule = factory.getRule('js')
    assert(rule, 'get the rule error')
    
    factory.setRule({
        test: /\.(js|mjs)$/,
        exclude: /node_modules/
      },
      'js')
    rule = factory.getRule('jsx')
    assert(!rule, 'the rule shuld undefined');
  })

  it('generate env config ', () => {
    factory.set('port', 9999);
    assert.throws(() => {
      factory.env()
    }, Error)
    assert.throws(() => {
      factory.get('devServer','port')
    }, Error,'unexpected error for get value')

    factory.set('entry',[
      'index.js',
      'main.js'
    ])

    assert.throws(() => {
      factory.addPlugin('test')
    }, Error,'unexpected add plugin error')

    assert.throws(() => {
      factory.usePlugin({})
    }, Error,'unexpected use plugin error')

    assert.throws(() => {
      factory.getPlugin({})
    }, Error,'unexpected use plugin error')
    
    assert.throws(() => {
      factory.addRule('test')
    }, Error,'unexpected add rule error')

    assert.throws(() => {
      factory.getRule({})
    }, Error,'unexpected use plugin error')

    assert(factory.get('entry',1) === 'main.js','get webpack entry value')
    assert(factory.get('entry',function(v){return v[0]}) === 'index.js','get webpack entry value')
    assert(factory.get('entry',{}) === null,'get webpack null')
    
    const factoryInProd = factory.env('prod');

    factoryInProd.defineRule({
        test: /\.(js|jsx|mjs)$/,
      },
      'test'
    );
    factoryInProd.addRule('test');
    assert(factoryInProd.getRule(function(v){
      if(v.alias === 'test') return v;
    }),'get rule from function')
    assert(factory.getRule(function(v){

      if(v.alias === 'test') return true;

    }) === null,'factory get rule from function')
    assert(factoryInProd.get('port') === 9999, 'new factory error')
    assert(factoryInProd.getEnv() === 'prod', 'new factory env error')
    const factorySelf = factory.env('prod');
    assert(factorySelf.getConfig().port === factoryInProd.getConfig().port, 'the same factory')
  })
});
