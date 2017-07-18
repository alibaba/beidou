# beidou-plugin-webpack

[![TNPM version][tnpm-image]][tnpm-url]
[![TNPM downloads][tnpm-downloads-image]][tnpm-url]

[![build status][ci-image]][ci-url]
[![line coverage][line-coverage-image]][ci-url]
[![branch coverage][branch-coverage-image]][ci-url]

[tnpm-image]: http://web.npm.alibaba-inc.com/badge/v/@ali/beidou-plugin-webpack.svg?style=flat-square
[tnpm-url]: http://web.npm.alibaba-inc.com/package/@ali/beidou-plugin-webpack
[tnpm-downloads-image]: http://web.npm.alibaba-inc.com/badge/d/@ali/beidou-plugin-webpack.svg?style=flat-square
[ci-image]: http://cise.alibaba-inc.com/task/398496/status.svg
[ci-url]: http://cise.alibaba-inc.com/task/398496
[line-coverage-image]: http://cise.alibaba-inc.com/task/398496/ut_line_coverage.svg
[branch-coverage-image]: http://cise.alibaba-inc.com/task/398496/ut_branch_coverage.svg

在本地开发环境（local）下的 webpack dev server 插件

local环境下默认开启, 其他环境下不建议使用.

## 功能特性

### middleware

提供了一个 webpack compiler middleware

- 与 beidou server 在相同端口上监听文件请求;
- 与webpack的使用方式一致;

## 配置

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

| 配置项 	| 类型 	| 默认值 	| 说明 	|
|------------------	|---------------	|-------------------------------------	|--------------	|
| config 	| String | null 	| 必填项, webpack 配置文件路径 	|


## Examples
