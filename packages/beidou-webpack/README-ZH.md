# beidou-webpack

北斗 webpack 开发插件

## 特性

* 编译 jsx/js
* 编译 less/scss/css
* 支持热替换(hmr)
* 快速重启
* 支持自定义配置

## Breaking Changes

* 配置项变更，

  自`v1.0.0`起，beidou-webpack 插件底层依赖从 `webpackDevMiddleware` 迁移到了 `WebpackDevServer`，配置方式更趋近于普通非同构前端项目。具体变更参看 [issue#21](https://github.com/alibaba/beidou/issues/21)

## Configuration

只在非生产环境下使用本插件，所以在你的项目上线之前必须先编译好，并把编译结果打包到线上环境。

* config/plugin.js:

```js
exports.webpack = {
  enable: true,
  package: 'beidou-webpack',
  env: ['local', 'unittest'],
};
```

* config/config.local.js **默认配置如下：**

```js
exports.webpack = {
  custom: {
    // configPath: 'path/to/webpack/config/file',
  },
  output: {
    path: './build',
    filename: '[name].js?[hash]',
    chunkFilename: '[name].js',
    publicPath: './build',
  },

  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },

  devServer: {
    contentBase: false,
    port: 6002,
    noInfo: true,
    quiet: false,
    clientLogLevel: 'warning',
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
    },
    headers: { 'X-Custom-Header': 'yes' },
    stats: {
      colors: true,
      chunks: false,
    },
    publicPath: '/build',
    hot: true,
  },
};
```

配置项 `output`、`resolve`、`devServer` 和 [webpack](https://webpack.js.org) 中定义的配置项一致。注意：任何有效的 webpack 配置都可以而不仅仅是这三个配置项。对这些配置的修改会对插件默认生成的 webpack 配置生效。插件自身使用的配置在 `custom` 里面，比如，自定义 webpack 配置需要在 `'webpack.custom.configPath'` 里设置文件路径。

* **devServer.port**： 定义 webpack dev server 的监听端口。访问 webpack 资源时，仍然可以通过 Node 应用直接访问，插件内置代理中间件自动转发请求到 webpack dev server ，所以  通常情况下不需要关心这个端口号。如果有特殊需要，可以直接访问 webpack dev server (上述配置下的地址 http://localhost:6002/webpack-dev-server)。

* **devServer.contentBase**：必须设置为 `false`。任何非`false`的值都会  启用 webpack dev server 中的静态资源服务。这将导致所有发送到 Node 服务的请求都提前被 webpack 响应。

## Custom webpack configuration

**custom.configPath**: 先定义 webpack 配置文件路径

#### 配置文件内容示例:

```js
// webpack.config.js
// 配置方案1:
module.exports = (app, defaultConfig, dev, target) => {
  return {
    ...defaultConfig,
    entry: {
      // your entry
    },
    module: {
      // your module
    },
    plugins: [
      // your plugins
    ],
    //something else to override
  };
};

// 配置方案2:
// 此方案将直接覆盖原有配置
module.exports = {
  output: {
    path: './build',
    filename: '[name].js?[hash]',
    chunkFilename: '[name].js',
    publicPath: './build',
  },

  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },

  devServer: {
    contentBase: false,
    port: 6002,
    noInfo: true,
    quiet: false,
    clientLogLevel: 'warning',
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
    },
    headers: { 'X-Custom-Header': 'yes' },
    stats: {
      colors: true,
      chunks: false,
    },
    publicPath: '/build',
    hot: true,
  },
};

```

#### FAQ:
使用配置工厂自定义配置项,操作方式如下例
```js

module.exports = (app, defaultConfig, dev, target) => {
  
  // 从app中获取配置工厂,factory提供的函数下面有列出
  const factory = app.webpackFactory;

  // 设置 webpack output 的值，方式如下:
  factory.set('output',{
    {
      path: outputPath,
      filename: '[name].js?[hash]',
      chunkFilename: '[name].js',
      publicPath: '/build/',
    }
  })
  // webpack output 值修改
  factory.get('output').chunkFilename = '[name].modify.js';


  // 增加webpack plugin的配置
  // 增加了 UglifyJsPlugin 配置，并定义该插件别名为 'UglifyJsPlugin'
  factory.addPlugin(
    webpack.optimize.UglifyJsPlugin,
    {
      compress: {
        warnings: false,
      }
    },
    'UglifyJsPlugin' , // 可空,默认使用 构建函数名
  )

  // 根据别名，修改已配置的webpack plugin
  factory.setPlugin(
    webpack.optimize.UglifyJsPlugin,
    {
      compress: {
        warnings: true,
      }
    },
    'UglifyJsPlugin'
  );
  // or 修改方式也可使用如下方式
  factory.getPlugin('UglifyJsPlugin').options = {
    compress: {
        warnings: true,
      }
  }

  // 查找并修改已配置的webpack rule 
  // 查找满足 .ts 的rule配置，仅且返回一个满足的rule
  const ruleObj = factory.getRule('.ts');
  ruleObj.options = {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 
        app.webpackFactory.useLoader('babel-loader')/** 如有已定义的loader，则使用自定义loader **/ || 'babel-loader', 
        options: {
          babelrc: false,
          presets: ['preset-typescript'],
        },
      },
  }
  // 定义loader的方式
  app.webpackFactory.defineLoader({
    'babel-loader',
    require.resolve('babel-loader')
  })

  // 生成其他环境的webpack配置
  const factoryInProd = factory.env('prod');
  factoryInProd.addPlugin(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }))

  return factory.getConfig(); // 返回配置
  // or 返回 prod 环境的配置
  // return factoryInProd.getConfig()

};


```

#### 数据结构：

> Class Plugin Struct

```js
class Plugin {
  object ,      // instance object for webpack plugin
  class,        // class for webpack plugin
  opitons,      // initialize config
  alias
}

```

> Class Rule Struct

```js
class Rule {
  opitons,      // initialize config for rule
  alias
}
```

## webpackFactory常用函数说明：

### 重置配置项: reset(value)
#### Parameters
* [value] {Object}

#### return
* this

### 设置配置项: set(key,value) 
####  Parameters
* key {String}
* value {*}

#### return
* this

### 获取配置项: get(key) 
####  Parameters
* key {String}

#### return
* {*}

### 获取{key}配置实例:  env(key) 
####  Parameters
* key {String} 配置实例标识

#### return
* {Object}

### 获取webpack配置: getConfig() 
####  Parameters

#### return
* {Object}


### 增加插件配置: addPlugin(args, options,alias) 
#### Parameters
* args {Object|Class|String} 插件实例|构造函数|已定义的插件名
* [options] {Object} 插件配置项
* [alias] {String} 插件别名

#### return
* this


### getPlugin(filter) 获取插件配置
#### Parameters
* filter {String|Function} 别名|自定义函数

#### return
* {Plugin}

### 设置插件配置: setPlugin(args, options,alias) 

#### Parameter
* args {Object|Class}  插件实例|构造函数
* [options] {Object} 插件配置项
* [alias] {String} 插件别名

#### return 
* this

### 定义插件: definePlugin(args, options,alias)
#### Parameters
* args {Object|Class}  插件实例|构造函数
* [options] {Object} 插件配置项
* [alias] {String} 插件别名
#### return
* this

### 获取定义的插件: usePlugin(alias)
#### Parameters
* alias {String|Fucntion|Regexp}  插件别名|自定义函数|正则
#### return
* {Plugin}


### 增加配置规则: addRule(options,alias)
#### Parameters
* options {Object|Rule}  配置项|Rule实例
* [alias] {String} 别名
#### return
* this

### 设置配置规则: setRule(options,alias)
#### Parameters
* options {Object|Rule}  配置项|Rule实例
* [alias] {String} 别名
#### return
* this

### 获取配置规则: getRule(filter)
#### Parameters
* filter {String|Function|Regexp}  配置项|自定义函数|正则
#### return
* {Rule}

### 定义配置规则: defineRule(options,alias)
#### Parameters
* options {Object}  配置项
* [alias] {String} 别名
#### return
* this

### 获取定义的配置规则: useRule(alias)
#### Parameters
* alias {String|Function|Regexp} 别名|自定义函数|正则

#### return
* {Rule}

### 定义Loader: defineLoader(alias,loader)
#### Parameters
* alias {String}  别名
* [loader] {String} 路径,默认值为 require.resolve(params1)
#### return
* this

### 获取定义Loader: useLoader(alias)
#### Parameters
* alias {String}  别名
#### return
* {path}



* **app**: `BeidouApplication` 示例, 通常用来读取应用的全局配置项。

* **defaultConfig**: 插件生成的默认 webpack 配置，可用于覆盖使用。

* **dev**: 本地开发环境下为`true`，生产环境下为`false` .

* **target**: 默认为 `browser`，在运行 `beidou build` 时, 通过 `--target` 参数指定, 目前可用值包含 `browser` 和 `node`

## Entry

默认 webpack 配置中的 entry 是通过扫描 client 目录获得。

扫描规则受 [beidou-router](../beidou-router/) 中
`router.root` 和 `router.entry` 两个配置项影响。

* **router.root**: 进行扫描的根路径
* **router.entry**: entry 文件名称，文件名（不含后缀）匹配的文件才被视为可用的 entry

> **Notice**:  扫描的文件深度为 1 (  仅匹配 ${router.root}/${router.entry}.jsx 和 ${router.root}/${dir}/\${router.entry}.jsx )

## Building

**用法**: beidou-build [--target=browser][--dev]

## License

[MIT](LICENSE)
