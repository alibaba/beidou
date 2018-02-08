Beidou 工作原理  
---

## React 同构  
所谓同构，简单的说就是客户端的代码可以在服务端运行，好处就是能极大的提升首屏时间，避免白屏，另外同构也给SEO提供了很多便利。  

React 同构得益于 React 的虚拟 DOM。虚拟 DOM 以对象树的形式保存在内存中，并存在前后端两种展现形式。  

- 在客户端上，虚拟 DOM 通过 ReactDOM 的 render 方法渲染到页面中，形成真实的 dom。  
- 在服务端上，React 提供了另外两个方法： ReactDOMServer.renderToString 和 ReactDOMServer.renderToStaticMarkup 将虚拟 DOM 渲染为 HTML 字符串。  

在服务端通过 ReactDOMServer.renderToString 方法将虚拟 DOM 渲染为 HTML 字符串，到客户端时，React 只需要做一些事件绑定等操作就可以了。  

在这一整套流程中，保证 DOM 结构的一致性是至关重要的一点。 React 通过 ```data-react-checksum```来检测一致性，即在服务端产生 HTML 字符串的时候会额外的计算一个 ```data-react-checksum``` 值，客户端会对这个值进行校验，如果与客户端计算的值一致，则 React 只会进行事件绑定，如果不一致，React 会丢弃服务端返回的 dom 结构重新渲染。  

## 服务端对 ES6/7 的支持  

React 新版本中已经在推荐采用 ES6/7 开发组件了，因此服务端对 ES6/7 的支持也不得不跟上我们开发组件的步伐。但是现在 node 原生对 ES6/7 的支持还比较弱，这个时候我们就需要借助于 babel 来完成 ES6/7 到 ES5 的转换。这一转换，我们通过 [babel-register](https://babeljs.io/docs/usage/require/) 来完成。  

babel-register 通过绑定 require 函数的方式（require hook）,在 require jsx 以及使用 ES6/7 编写的 js 文件时，使用 babel 转换语法，因此，应该在任何 jsx 代码执行前，执行 require('babel-register')(config)，同时通过配置项config，配置babel语法等级、插件等。  

这里我们给一个配置 demo， 具体配置方法可参看[官方文档](https://babeljs.io/docs/usage/require/)。   

```  
{
  "presets": ["react", "es2015", "stage-0"],

  "plugins": [
    "transform-runtime",
    "add-module-exports",
    "transform-decorators-legacy",
    "transform-react-display-name"
  ],

  "env": {
    "development": {
      "plugins": [
        "typecheck",
        ["react-transform", {
            "transforms": [{
                "transform": "react-transform-catch-errors",
                "imports": ["react", "redbox-react"],
                "locals": ["module"]
              }
            ]
        }]
      ]
    }
  }
}
```    

## css、image 等文件服务端如何支持  
一般情况来说，不需要服务端处理非js文件，但是如果直接在服务端 require 一个非 js 文件的话会报错，因为 require 函数不认识非 js 文件，这时候我们需要做如下处理， 已样式文件为例：  

```  
var Module = require('module');
Module._extensions['.less'] = function(module, fn) {
  return '';
};
Module._extensions['.css'] = function(module, fn) {
  return '';
};
```    
具体原理可以参考[require 解读](http://www.ruanyifeng.com/blog/2015/05/require.html)  

或者直接在 ```babel-register``` 中配置忽略规则：  

```  
require("babel-register")({
  ignore: /(\.css|\.less)$/,
});
```  

但是，如果项目中使用了 css modules 的话，那服务端就必须要处理 less 等文件了。[beidou-isomorphic插件](https://github.com/alibaba/beidou/tree/master/packages/beidou-isomorphic)已经实现了css modules支持，主要完成了两件事：

- 以webpack插件的形式，预编译less（不局限于less，还支持图片文件、字体文件等），将其转换为一个 assets.json 文件保存到项目目录下。
- require hook，所有less文件的引入，代理到生成的 JSON 文件中，匹配文件路径，返回一个预先编译好的 JSON 对象。  


## 构建  

客户端的代码通过配置 webpack 打包发布到 CDN 即可。  

通过配置 webpack 和 webpack-isomorphic-tools 将非 js 文件打包成 assets 文件即可。  


