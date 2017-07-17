<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [beidou-plugin-isomorphic-register](#beidou-plugin-isomorphic-register)
  - [说明](#%E8%AF%B4%E6%98%8E)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# beidou-plugin-isomorphic-register

## 说明
webpack-isomorphic-tools 的注册插件，该插件有如下作用：  

1. 使得服务端可以识别less等资源文件。
2. 增加服务端渲染时对浏览器环境的模拟，以支持某些组件在`render`时引用 BOM/DOM 对象的场景。
3. 增加服务端对webpackConfig.resolve.alias的支持，可通过开关关闭。  

插件配置说明如下：  

```javascript    
config.isomorphic = {
  webpackAlias: {},
  match: 'NO_MATCH',
};
```  
* webpackAlias  
webpack config 中的 resolve.alias 配置，没有则不配或者配置为空对象

* match  
匹配的请求路径正则，配置后仅对满足正则的请求做polyfill，不配置对所有请求生效。  
可选的配置类型为正则表达式或者字符串。如果是字符串，则通过 `new RegExp(string)` 的方式创建正则表达式。

