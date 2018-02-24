同构渲染
---

框架内置 [egg-view](https://github.com/eggjs/egg-view) 作为模板解决方案，并支持多模板渲染，Beidou官方已经集成[react模板引擎](https://github.com/alibaba/beidou/tree/master/packages/beidou-view-react)来支持同构渲染, 通常情况下无需更改，直接使用。

## 引入 view 插件

```bash
$ npm i beidou-view-react --save
```

### 启用插件

```js
// config/plugin.js
exports.react = {
  enable: true,
  package: 'beidou-view-react',
};
```

## 配置插件

### egg-view

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

### [react渲染引擎](https://github.com/alibaba/beidou/blob/master/packages/beidou-view-react)

同样，框架提供了[react渲染引擎](https://github.com/alibaba/beidou/blob/master/packages/beidou-view-react)的默认配置，通常无需修改


```js
// config/config.default.js
react = {
    beautify: false,
    cache: true,
    // loadPath: `${appInfo.baseDir}/client`,
    // clientPath: `${appInfo.baseDir}/client`,
    static: false,
    doctype: '<!DOCTYPE html>',
    assetHost: '',
    assetPath: '',
  };
```

## 渲染页面

框架在 Context 上提供了 3 个接口，返回值均为 Promise:

- `render(name, locals)` 渲染模板文件, 并赋值给 ctx.body
- `renderView(name, locals)` 渲染模板文件, 仅返回不赋值
- `renderString(tpl, locals)` 渲染模板字符串, 仅返回不赋值

```js
// app/controller/home.js  
exprots.index = function*() {  
  yield this.render('path/to/index.jsx', {  
    user: 'egg view'  
  });  
}; 
```
