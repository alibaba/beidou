<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

* [Beidou react view](#beidou-react-view)
  * [Configuration](#configuration)
  * [Usage](#usage)
  * [API](#api)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Beidou react view

> React view

### Install

```
$ npm install beidou-plugin-react --save
```

### Configuration

* config/plugin.default.js:

```
exports.react = {
  enable: true,
  package: 'beidou-plugin-react',
};
```

* config/config.default.js

```
exports.react = {
  beautify: false // optional, beautify HTML snippet
    cache: true, //optional, if false, clean require cache for development usage
    internals: true, //optional, true: renderToString or false: renderToStaticMarkup
    doctype: '<!DOCTYPE html>', //optional, HTML doctype
}

exports.view = {
      defaultViewEngine: 'react',
      defaultExtension: '.jsx'
    }

```

### Usage

```
// app/controller/index.js  
exprots.index = function*() {  
  yield this.render('path/to/index.jsx', {  
    user: 'beidou view'  
  });  
};  
```

### API

React view exports `render` and `renderString` 2 APIs, return Promise.

> * ctx.render(name, locals) - render template, and assign to ctx.body
> * ctx.renderString(tpl, locals) - only render template to string, will `not` assign to ctx.body

## License

[MIT](LICENSE)
