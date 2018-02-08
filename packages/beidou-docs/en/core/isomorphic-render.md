Ismorphic Render
---

Framework use [egg-view](https://github.com/eggjs/egg-view) for view solution which support multiple template engines, and integrated [beidou-view-react](https://github.com/alibaba/beidou/tree/master/packages/beidou-view-react) as view engine to support ismorphic render by default. generally no need to modify configuration, we can use it directly. Here are some details about ismorphic render.

## install react-view plugin

```bash
$ npm i beidou-view-react --save
```

### enable react-view plugin

```js
// config/plugin.js
exports.react = {
  enable: true,
  package: 'beidou-view-react',
};
```

## config

### egg-view

[egg-view](https://github.com/eggjs/egg-view) provided the common config `config.view`.

and beidou framework set [beidou-view-react](https://github.com/alibaba/beidou/tree/master/packages/beidou-view-react) as default view engine: 

```js
// config/config.default.js
view: {
    defaultViewEngine: 'react',
    defaultExtension: '.jsx',
    root: `${antx.baseDir}/app/views`
}
```

### [beidou-view-react](http://gitlab.alibaba-inc.com/beidou/beidou-plugin-view-react) configuration

Also，beidou framework provided the default config for [beidou-view-react](https://github.com/alibaba/beidou/tree/master/packages/beidou-view-react), generally no need to config by ourselves.


```js
// config/config.default.js
react: {
    beautify: false,
    cache: true,
    loadPath: `${antx.baseDir}/app/views`,
    clientPath: `${antx.baseDir}/client`,
    internals: false,
    doctype: '<!DOCTYPE html>',
    cdnRoot: ''
}
```

## render page

[beidou-view-react](http://gitlab.alibaba-inc.com/beidou/beidou-plugin-view-react) provided 3 API in `Context` object, each of them returns a promise.

- `render(name, locals)` render template, and assign to ctx.body
- `renderView(name, locals)` render template without assignment
- `renderString(tpl, locals)` render template to string without assignment

```js
// app/controller/home.js  
exprots.index = function*() {  
  yield this.render('path/to/index.jsx', {  
    user: 'egg view'  
  });  
}; 
```
