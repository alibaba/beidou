# egg-beidou

[支持 egg 框架下的 SSR 服务]

## 功能

### 使用方式

- ctx.ssr(filepath,props) 将 绝对路径 filepath 文件内的 react 代码使用 props 参数进行渲染,并将渲染结果返回

## 配置

```js
// plugin.js
exports.beidou = {
  enable: true,
  package: 'egg-beidou',
};

// config.default.js
exports.beidou = {
  static: false, //   是否开启 static 渲染
  stream: false, //  是否开启 stream 渲染
  cache: true, //  是否清除require.cache (开发阶段建议关闭)
  onError: function(error) {
    // 渲染发生错误时的回调函数
    // do something
  },
  view: '/home/admin/project/', // 渲染文件相对路径
  extensions: ['.js', 'jsx', '.ts', '.tsx'], // 默认文件添加后缀
};
```

## 示例

> 更多示例可查看单测目录下的 example 目录

### 方式 1： 渲染打包后代码

```js
// Controller
'use strict';

exports.index = async function(ctx) {
  await ctx.ssr('simple/index.js', {
    data: {
      text: 'hello world!',
    },
  });
};

// 将数据传入 react render中的this.props
exports.simple = async function(ctx) {
  ctx.body = await ctx.ssr('simple/index.js', {
    data: {
      text: 'hello world!',
    },
  });
};

// 使用绝对路径的方式
exports.test = async function(ctx) {
  ctx.body = await ctx.ssr('/usr/local/project/simple/index.js', {
    data: {
      text: 'hello world!',
    },
  });
};
```

### 方式 2： 渲染 React 代码

> 此插件渲染 React 代码的方案与北斗同构框架使用一致的方案，具体可参考北斗同构框架文档使用

```js
//config/plugin.js
// 安装 beidou-isomorphic 与 beidou-webpack 依赖，并开启插件
isomorphic: {
  enable: true,
  package: 'beidou-isomorphic',
},
webpack: {
  enable: true,
  package: 'beidou-webpack',
  env: [ 'local', 'unittest' ],
}

// controller/index.js
exports.simple = async function(ctx) {
  ctx.body = await ctx.ssr('simple/index.jsx', {
    data: {
      text: 'hello world!',
    },
  });
};
```
