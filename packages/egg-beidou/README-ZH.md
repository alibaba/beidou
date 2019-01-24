# egg-beidou

[支持 egg 框架下的 SSR 服务]

## 功能

### 使用方式

- app.beidou 将渲染对象赋值在 app 下，方便调用
- ctx.beidou 将 SSR 渲染功能注入 context 上下文中方便调用

## 配置

```js
// plugin.js
exports.isomorphic = {
  enable: true,
  package: 'beidou-isomorphic',
};
exports.beidou = {
  enable: true,
  package: 'egg-beidou',
};

// config.default.js
exports.beidou = {
  viewPath: '', //   打包后的文件base path
  static: true, //   是否开启 static 渲染
  stream: false, //  是否开启 stream 渲染
};
```

## 示例

> 更多示例可查看单测目录下的 example 目录

```js
// Controller
'use strict';

exports.index = async function(ctx) {
  ctx.body = await ctx.beidou('simple/index.js');
};

// 将数据传入 react render中的this.props
exports.simple = async function(ctx) {
  ctx.body = await ctx.beidou('simple/index.js', {
    data: {
      msg: 'your data',
    },
    ctx,
  });
};
```
