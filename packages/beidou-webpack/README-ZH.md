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

  自`v1.0.0`起，beidou-webpack 插件底层依赖从 `webpackDevMiddleware` 迁移到了 `WebpackDevServer`，配置方式更趋近于普通非同构前端项目。具体变更参看 [issue#21](https://github.com/alibaba/beidou/issues/21)details, see .

## Configuration

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
  // config: 'path/to/webpack/config/file',
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
配置项 `output`、`resolve`、`devServer` 和 [webpack](https://webpack.js.org) 中定义的配置项一致。对这些配置的修改会对插件默认生成的webpack配置生效。

- **devServer.port**： 定义 webpack dev server 的监听端口。访问webpack资源时，仍然可以通过Node应用直接访问，插件内置代理中间件自动转发请求到 webpack dev server ，所以通常情况下不需要关心这个端口号。如果有特殊需要，可以直接访问 webpack dev server (上述配置下的地址 http://localhost:6002/webpack-dev-server)。


- **devServer.contentBase**：必须设置为 `false`。任何非`false`的值都会启用 webpack dev server 中的静态资源服务。这将导致所有发送到Node服务的请求都提前被webpack响应。

## Custom Configuration

**config**: 定义自定义配置的路径。

```js
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
  }
}
```

- **app**: `BeidouApplication` 示例, 通常用来读取应用的全局配置项。

- **defaultConfig**: 插件生成的默认webapck配置，可用于覆盖使用。

- **dev**: 本地开发环境下为`true`，生产环境下为`false` .

- **target**: 默认为 `browser`，在运行 `beidou build` 时, 通过 `--target` 参数指定, 目前可用值包含 `browser` 和 `node`

## Entry

默认 webpack 配置中的 entry 是通过扫描 client 目录获得。

扫描规则受 [beidou-router](../beidou-router/) 中
`router.root` 和 `router.entry` 两个配置项影响。

- **router.root**: 进行扫描的根路径
- **router.entry**: entry文件名称，文件名（不含后缀）匹配的文件才被视为可用的entry

> **Notice**: 扫描的文件深度为 1 ( 仅匹配 ${router.root}/${entry}.jsx 和 ${router.root}/${dir}/${entry}.jsx )

## Building

**用法**: beidou build [--target=browser] [--dev]



## License

[MIT](LICENSE)
