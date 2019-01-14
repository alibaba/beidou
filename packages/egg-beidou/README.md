# egg-beidou

[Support React SSR in Egg Framework]

neet to open the plugin for using

## Warning:

the plugin depences `beidou-isomorphic`, you must install `beidou-isomorphic` and open the plugin !!!

## Feature

### extends

- app.beidou the Beidou plugin Object
- ctx.beidou render the file for SSR

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
  viewPath: '', // render the base path
  static: true, //  whether use static render for SSR
  stream: false, //  whether use stream render for SSR
};
```
