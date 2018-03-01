同构渲染
---

框架内置 [egg-view](https://github.com/eggjs/egg-view) 作为模板解决方案，并支持多模板渲染，Beidou官方已经集成[react模板引擎](https://github.com/alibaba/beidou/tree/master/packages/beidou-view-react)来支持同构渲染, 通常情况下无需更改，直接使用。

## egg-view

[egg-view](https://github.com/eggjs/egg-view) 提供了 `config.view` 通用配置.

Beidou框架默认启用[react渲染引擎](https://github.com/alibaba/beidou/tree/master/packages/beidou-view-react), 配置如下

```js
// config/config.default.js
view = {
  defaultViewEngine: 'react',
  defaultExtension: '.jsx',
  root: `${path.join(appInfo.baseDir, 'app/views')},${path.join(
    appInfo.baseDir,
    'client'
  )}`,
};
```

## react渲染引擎

阅读 [beidou-view-react](../../../beidou-view-react/README.md)
