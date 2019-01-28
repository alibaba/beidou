# egg-beidou

[支持 egg 框架下的 SSR 服务]

## 功能

### 使用方式

- ctx.render(filepath,props) 将 filepath 文件内的 react 代码使用 props 参数进行渲染，并赋值在 ctx.body 上
- ctx.renderView(filepath,props) 将 filepath 文件内的 react 代码使用 props 参数进行渲染,并将渲染结果返回

## 配置

```js
// plugin.js
exports.beidou = {
  enable: true,
  package: 'egg-beidou',
};

// config.default.js
exports.beidou = {
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
  await ctx.render('simple/index.js', {
    data: {
      text: 'hello world!',
    },
  });
};

// 将数据传入 react render中的this.props
exports.simple = async function(ctx) {
  ctx.body = await ctx.renderView('simple/index.js', {
    data: {
      text: 'hello world!',
    },
  });
};
```
