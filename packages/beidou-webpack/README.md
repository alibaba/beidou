# beidou-webpack

webpack dev server for local environment

## Features

* Serve jsx/js source
* Serve less/scss/css source
* Support hot module replacement(hmr)

## Configuration

* config/plugin.default.js:

```js
exports.webpack = {
  enable: true,
  package: 'beidou-webpack',
  env: ['local', 'unittest'],
};
```

* config/config.local.js

```js
exports.webpack = {
  //[optional] default to 'beidou-webpack/config/webpack.browser.js'
  defaultConfig: 'path of webpack config',
  //[optional] the path of request should be transferrer to webpack. e.g HMR: /__webpack_hmr
  path: [],
  //[optional]
  noInfo: false,
  //[optional]
  quiet: false,
  //[optional]
  lazy: false,
  //[optional]
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
  //[optional]
  headers: { 'X-Custom-Header': 'yes' },
  //[optional]
  stats: {
    colors: true,
    chunks: false,
  },
  //[optional]
  defaultEntryName: 'index.jsx',
  //[optional]
  outputPath: './build',
  //[optional]
  publicPath: '/build',
  //[optional] hot module replacement config
  hmr: {
    path: '__webpack_hmr',
    timeout: '20000',
    heartbeat: '10000',
  },
};
```

## License

[MIT](LICENSE)
