# egg-beidou

[Support React SSR in Egg Framework]

neet to open the plugin for using

## Feature

### extends

- ctx.ssr(filepath,props) Render the `filepath` by proprs and return result for SSR, `filepath` is absolute path

## Configure

```js
// config/pulgin.js
exports.beidou = {
  enable: true,
  package: 'egg-beidou',
};

// config.default.js
exports.beidou = {
  static: false, //  whether use static render for SSR
  stream: false, //  whether use stream render for SSR
  cache: true, // whether open require cache
  onError: function(error){  // call the function when render occur error
    // do something
  },
  view:"/home/admin/project/",
  extensions: [ '.js', 'jsx', '.ts', '.tsx' ] , // file suffix
};
```

## Example

> see more example to test/exmaple folder

### case1 : render packaged code
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

// put your data into react render for react this.props
exports.simple = async function(ctx) {
  ctx.body = await ctx.ssr('simple/index.js', {
    data: {
      text: 'hello world!',
    },
  });
};

// if you need to pass absolute path
exports.test = async function(ctx) {
  ctx.body = await ctx.ssr('/usr/local/project/simple/index.js', {
    data: {
      text: 'hello world!',
    },
  });
};
```

### case2: render react native code
> The scheme of rendering React code by this plug-in is consistent with that of Beidou isomorphic framework, which can be used with reference to Beidou isomorphic framework document.

```js
// config/plugin.js
// install egg-plugin:  beidou-isomorphic & beidou-webpack and enable plugin
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
