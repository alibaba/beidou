# beidou-plugin-webpack

webpack dev server for local environment

## Features
* Serve jsx/js source
* Serve less/scss/css source
* Support hot module replacement(hmr)


## Configuration

```js
exports.webpack = {

    //[必填]北斗默认配置, 无需配置
    defaultConfig: 'path/to/default/webpack/config/file',

    //[可选]定制webpack配置文件路径, 
    config: 'path/to/webpack/config/file',
    
    //[可选]是否合并默认webpack配置, true代表不合并, false代表合并. 默认值 false. 
    //如需设置为true需要配合config参数一起使用
    disableMerge: true/false,
    
    //[可选]webpack server 监听的公共路径, 如 `/build`, 不指定时, 默认读取 webpack 配置文件中的public
    publicPath: 'webpack/dev/server/public/path'

    //[可选]不打印info信息
    noInfo: false,
    
    //[可选]不打印所有信息
    quiet: false,
    
    //[可选]使用lazy模式
    lazy: false,
    
    //[可选]watch Options
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    //[可选]
    headers: { "X-Custom-Header": "yes" },
    //[可选]
    stats: {
        colors: true,
        chunks: false // chunks信息
    }
}
```

- config/plugin.default.js:  

```
exports.webpack = {
    enable: true,
    package: 'beidou-plugin-webpack',
    env: ['local', 'unittest']
  }

```

- config/config.local.js  

```
exports.webpack = {
    // [optional] default to 'beidou-plugin-webpack/config/default.webpack.config.js'
    defaultConfig: 'path of webpack config', 
    // [optional] 
    path: [], // the path of request should be transfered to webpack. e.g HMR: /__webpack_hmr
    // [optional] 
    noInfo: false,
    // [optional] 
    quiet: false,
    // [optional] 
    lazy: false,
    // [optional] 
    watchOptions: {
        aggregateTimeout: 300,
        poll: true,
    },
    // [optional] 
    headers: { 'X-Custom-Header': 'yes' },
    // [optional] 
    stats: {
        colors: true,
        chunks: false,
    },
    // [optional] 
    defaultEntryName: 'index.jsx',
    // [optional] 
    outputPath: './build',
    // [optional] 
    publicPath: '/build',
    // [optional] hot module replacement config
    hmr: {
        path: '__webpack_hmr',
        timeout: '20000',
        heartbeat: '10000',
    }
};
```

## License

[MIT](LICENSE)
