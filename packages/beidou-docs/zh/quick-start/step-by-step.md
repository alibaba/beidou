# 从零开始搭建应用  

> 本章节将从零开始一步一步构建一个 Hacker News，如果你已经是 [egg](https://github.com/eggjs/egg) 的用户或者对其有所了解，并且你已经了解基于 react 的同构方案，那么请跳过本章节，直接通过[脚手架](./quick-start.md)开发项目吧

## Step by Step   

### 初始化项目  

初始化 `package.json` 并安装北斗：  

```bash  
$ npm init
$ npm ii beidou-core --save  
```  

> 说明： 本章节提到的路径未经特别说明均是相对于项目根路径而言。

编写入口文件：  

```js  
// bin/server.js
const path = require('path');
const beidou = require('beidou-core');
beidou.startCluster({
  port: 6001, 
  baseDir: path.join(__dirname, '..'),
  workers: 1   // 本地环境方便开发调试，默认为1
});
```  

### 编写 Controller  
如果你熟悉 Web 开发或 MVC，肯定猜到我们第一步需要编写的是 Controller 和路由映射。

> Controller 用于控制页面的展现逻辑，渲染页面或控制页面跳转等等。

* 每个 Controller 类都是一个文件，包含一个或多个符合 koa middleware 约定的 Generator 函数。
需放置在 `app/controller` 目录下。
* 每个 `app/controller/*.js` 文件，都会被自动加载到 `app.controller.*` 上。
* 注意：下划线会转换为驼峰命名，如 `foo_bar => fooBar`。

一个简单的欢迎页：
```js  
// app/controller/home.js
module.exports = function* homeController() {
  this.body = yield new Promise((resolve) => {
    resolve('hello world, beidou.');
  });
};
```  

然后通过 app/router.js 来配置路由映射，相关 API 可以参考 [koa-router](https://github.com/alexmingoia/koa-router) 模块。
```js  
// app/router.js
module.exports = app => {
  app.get('/', app.controller.home);
};
```  

好，现在可以启动应用来体验下。  

```bash  
$ node bin/server.js
$ open http://localhost:6001
```  

### 客户端代码开发  
这里偷个懒，我们只引入 react 进行数据展示，不使用 redux。如果想看包含 redux 的 demo，请通过脚手架初始化项目, 或直接参考参考[redux demo](https://github.com/alibaba/beidou/tree/master/examples/redux)

### 模板渲染  
绝大多数情况，我们都需要读取数据后渲染模板，然后呈现给用户。故我们需要引入对应的模板引擎，也就是 view 插件。  
北斗框架内置了基于 react 实现的 [beidou-plugin-react](https://github.com/alibaba/beidou/tree/master/packages/beidou-plugin-react) 插件。默认配置如下：  
```js  
// config/config.default.js  

const path = require('path');

module.exports = (appInfo) => {
  const config = {};

  /**
   * View options
   * @member Config#view
   */
  config.react = {
    beautify: false,
    cache: true,
    // loadPath: `${appInfo.baseDir}/client`,
    // clientPath: `${appInfo.baseDir}/client`,
    static: false,
    doctype: '<!DOCTYPE html>',
    assetHost: '',
    assetPath: '',
  };
  config.view = {
    defaultViewEngine: 'react',
    defaultExtension: '.jsx',
    root: `${path.join(appInfo.baseDir, 'app/views')},${path.join(
      appInfo.baseDir,
      'client'
    )}`,
  };

  return config;
}; 
```  

配置完成后，开发我们的页面模板。  
篇幅限制，客户端代码不再赘述，可借鉴[redux demo](https://github.com/alibaba/beidou/tree/master/examples/redux) client目录的实现,
启动应用并访问：  
```bash  
$ node bin/server.js    
$ open http://localhost:6001/
```  
发现命令行报错，这里还需要进行一些构建环境配置。    

### 构建环境配置  
#### 配置服务端的 `.babelrc`  
> 由于 node 版本在不断进化，对 es6 的支持也在逐步完善，因此北斗提倡服务端尽量使用 node 本身提供的 es6 特性。  
Beidou框架默认已经配置好babel, 如需扩展，参考配置如下：  
```json  
{
  "presets": ["beidou-server"],
  "plugins": [
    // 扩展的babel插件
  ]
}
```  
> 注意安装依赖~  

#### 2. webpack 配置  
react 项目构建离不开 webpack，北斗的 webpack 配置中除了一般的构建动作，还添加了对同构的支持。如需定制请参考[webpack plugin](https://github.com/alibaba/beidou/tree/master/packages/beidou-plugin-webpack)  

### 编写 Service  
在实际应用中， Controller 一般不会自己生成数据，也不会包含复杂的逻辑，你应该将那些复杂的过程放到业务逻辑层 Service 里面，然后暴露出一个简单的函数给 Controller 调用，这样也便于测试。

* 同样，每一个 Service 类都是一个文件，需放置在 app/service 目录下。
* 每个 Service 都会像 Context 一样，在每个请求生成的时候，被自动实例化到 ctx.service.* 下。
* 注意：下划线会转换为驼峰命名，如 foo_bar => fooBar。
* 注意：Service 不是单例。

我们来添加一个 service 抓取 hacker-news 的数据 ，如下：
```js  
// app/service/news.js
module.exports = app => {
  class NewsService extends app.Service {
    constructor(ctx) {
      super(ctx);
    }

    * list(page) {
      const serverUrl = 'https://hacker-news.firebaseio.com/v0';
      const pageSize = 30;
      page = page || 1;

      // 读取 hacker-news api 数据
      // 先请求列表
      const idList = yield this.app.urllib.request(`${serverUrl}/topstories.json`, {
        data: {
          orderBy: '"$key"',
          startAt: `"${pageSize * (page - 1)}"`,
          endAt: `"${pageSize * page - 1}"`,
        },
        dataType: 'json',
      }).then(res => res.data);

      // 并行获取详细信息, 参见 co 文档的 yield {}
      const newsList = yield Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.app.urllib.request(url, { dataType: 'json' }).then(res => res.data);
      });
      return newsList;
    }
  }
  return NewsService;
};
```  
然后稍微修改下之前的 Controller：  
```js  
// app/controller/news.js
exports.list = function* newsListController() {
  const page = this.query.page || 1;
  const newsList = yield this.service.news.list(page);
  yield this.render('news', { list: newsList });
};  
```  

再刷新下浏览器，可以看到从 hacker news 获取的 news 列表了。  

*简单小结下几个概念的区别：*  

|概念|描述|
|:---------:|:-------------:|
|Controller|逻辑更加简洁，专注 Web 页面的渲染|
|Service|负责组装和格式化 Proxy 接口提供的数据，并封装业务逻辑，被多个 Controller 使用|

### 编写 Middleware  
假设有个需求：我们的新闻站点，禁止百度爬虫访问。  
聪明的同学们一定很快能想到可以通过 Middleware 判断 UA，如下：  
```js  
// app/middleware/robot.js
// options 为同名的 config, 即 app.config.robot
module.exports = (options, app) => {
  return function* robotMiddleware(next) {
    const source = this.get('user-agent') || '';
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      this.status = 403;
      this.message = 'forbidden';
    } else {
      yield next;
    }
  }
};
// config/config.local.js
// 挂载 middleware
exports.middleware = [
  'robot'
];
exports.robot = {
  ua: [
    /Baiduspider/i,
  ]
};
```

现在可以使用 curl localhost:6001/news -A "Baiduspider" 看看效果。  

### 配置文件  
写业务的时候，不可避免的需要有配置文件，北斗提供了强大的配置合并管理功能：  

* 支持按环境变量加载不同的配置文件，如 config.local.js , config.prod.js ...
* 配置文件可以在应用/插件/框架等地方就近配置，北斗将合并加载。
* 具体合并逻辑可参见 [config](../basic/config.md)

