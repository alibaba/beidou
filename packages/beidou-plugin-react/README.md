<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [北斗 react view](#%E5%8C%97%E6%96%97-react-view)
    - [1. 使用说明](#1-%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E)
      - [配置插件](#%E9%85%8D%E7%BD%AE%E6%8F%92%E4%BB%B6)
        - [服务端渲染视图模板](#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%E8%A7%86%E5%9B%BE%E6%A8%A1%E6%9D%BF)
    - [2. 规范](#2-%E8%A7%84%E8%8C%83)
    - [3. egg内部机制](#3-egg%E5%86%85%E9%83%A8%E6%9C%BA%E5%88%B6)
  - [Contributors(2)](#contributors2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

北斗 react view
=================

[![TNPM version][tnpm-image]][tnpm-url]
[![TNPM downloads][tnpm-downloads-image]][tnpm-url]

[![build status][ci-image]][ci-url]
[![line coverage][line-coverage-image]][ci-url]
[![branch coverage][branch-coverage-image]][ci-url]

[tnpm-image]: http://web.npm.alibaba-inc.com/badge/v/@ali/beidou-plugin-view-react.svg?style=flat-square
[tnpm-url]: http://web.npm.alibaba-inc.com/package/@ali/beidou-plugin-view-react
[tnpm-downloads-image]: http://web.npm.alibaba-inc.com/badge/d/@ali/beidou-plugin-view-react.svg?style=flat-square
[ci-image]: http://cise.alibaba-inc.com/task/401390/status.svg
[ci-url]: http://cise.alibaba-inc.com/task/401390
[line-coverage-image]: http://cise.alibaba-inc.com/task/401390/ut_line_coverage.svg
[branch-coverage-image]: http://cise.alibaba-inc.com/task/401390/ut_branch_coverage.svg


> 基于egg 的 react view.


### 1. 使用说明

#### 配置插件  

- config/plugin.default.js:  

```  
exports.view = {
  enable: true,
  package: '@ali/beidou-plugin-view-react',
};
```  

- config/config.default.js  

```  
exports.view = {
  extname: 'jsx' // 选填，文件后缀
  beautify: false // 选填，是否格式化 HTML
  cache: true, // 选填，是否开启缓存，默认为false
  loadPath: `${antx.baseDir}/app/views`, // 选填，View 本地文件路径
  clientPath: `${antx.baseDir}/client`,  // 选填，客户端组件的文件路径
  internals: true, // 选填，true: renderToString 或 false: renderToStaticMarkup, 默认true
  doctype: '<!DOCTYPE html>', // 选填，DOC 头
  cdnRoot: '', // 选填，客户端静态资源的 cdn 根路径，比如： /tp/refund/0.0.1/ 
}
```  

**特别说明**  
* 在北斗应用中，我们推荐`app/views`目录下的页面都使用 react 组件来写，因此在`view`执行`render`方法时，会`renderToString`两次，

> 具体示例参考 [demo](http://gitlab.alibaba-inc.com/beidou/beidou/blob/master/example/app/views/news/list.jsx#L12) 和 [插件内部实现](http://gitlab.alibaba-inc.com/beidou/beidou-plugin-view-react/blob/master/lib/react-view.js#L43)  

`view`中渲染的实际上是最外层的页面内容，因此在最终生成页面的时候，会多计算一次`checksum`，如图：  

![_E7_B2_98_E8_B4_B4_E5_9B_BE_E7_89_87](http://git.cn-hangzhou.oss.aliyun-inc.com/uploads/beidou/beidou-plugin-view-react/c71b7c5ec0a38fed3884c206c311fa18/%E7%B2%98%E8%B4%B4%E5%9B%BE%E7%89%87.png)  

而这个`checksum`是完全多余的，且`checksum`的计算会比较耗时，处于性能考虑，建议将`internals`配置为`false`.  

* view 插件在 render 组件的时候，会向被 render 的组件传入 [helper](http://gitlab.alibaba-inc.com/beidou/beidou-plugin-view-react/blob/master/lib/helper.js) 对象，该对象继承自 `app.Helper`，内部封装了一些工具函数供组件内部使用。

##### 服务端渲染视图模板

```  
// app/controller/home.js  
exprots.index = function*() {  
  yield this.render('path/to/index.jsx', {  
    user: 'egg view'  
  });  
};  
```  

### 2. 规范

根据[Web规范](http://gitlab.alibaba-inc.com/node/team/blob/master/web.md) view相关约定, 提供`render` 和 `renderString`两个接口, 返回Promise.

> * ctx.render(name, locals) - 渲染模板文件, 并赋值给 ctx.body
> * ctx.renderString(tpl, locals) - 渲染模板字符串, 仅返回不赋值


### 3. egg内部机制

egg 内部的实现机制如下：

* 通过 `app[Symbol.for('egg#view')]` 获取到 View 基类
* egg 将继承该基类，并挂载到 `app.View` ，该子类对 render 等方法添加通用处理，如全局 locals 注入。
* 每一个用户请求，都实例化一个 `app.View` 实例，并挂载到 `ctx.view` 上
* 在 controller 中可以调用 `this.render` 进行模板渲染， 即 `ctx.view.render`

## Contributors(2)

Ordered by date of first contribution, by [ali-contributors](http://gitlab.alibaba-inc.com/node/ali-contributors).

- ![](https://work.alibaba-inc.com/photo/86450.30x30.jpg) [@六猴](https://work.alibaba-inc.com/work/u/86450)<a target="_blank" href="http://amos.im.alisoft.com/msg.aw?v=2&site=cntaobao&s=2&charset=utf-8&uid=%E5%85%AD%E7%8C%B4"><img src="http://amos.alicdn.com/online.aw?v=2&uid=%E5%85%AD%E7%8C%B4&site=cntaobao&s=1&charset=utf-8"></a>
- ![](https://work.alibaba-inc.com/photo/109043.30x30.jpg) [@陌农](https://work.alibaba-inc.com/work/u/109043)<a target="_blank" href="http://amos.im.alisoft.com/msg.aw?v=2&site=cntaobao&s=2&charset=utf-8&uid=%E9%99%8C%E5%86%9C"><img src="http://amos.alicdn.com/online.aw?v=2&uid=%E9%99%8C%E5%86%9C&site=cntaobao&s=1&charset=utf-8"></a>

--------------------
