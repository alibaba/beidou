# 从零开始搭建应用

> 本章节将从零开始一步一步构建一个 News App (use [newsapi.org](https://newsapi.org))，如果你已经是 [egg](https://github.com/eggjs/egg) 的用户或者对其有所了解，并且你已经了解基于 react 的同构方案，那么请跳过本章节，直接通过[脚手架](./quick-start.md)开发项目吧

## 初始化空项目

初始化 `package.json` 并安装北斗相关依赖

```bash
$ npm init
$ npm i --save beidou-core beidou-cli react react-dom
```

> 说明： 本章节提到的路径未经特别说明均是相对于项目根路径而言。

在 `package.json` 设置命令，具体命令含义参考 [beidou-cli](https://github.com/alibaba/beidou/tree/master/packages/beidou-cli)

```js
{
  "scripts": {
    "start": "beidou start",
    "debug": "beidou debug",
    "stop": "beidou stop",
    "dev": "beidou dev",
    "build": "beidou build",
    "build:node": "beidou build --target=node"
  }
}
```

## 配置工程

> 如果你熟悉 Web 开发或 MVC，应用搭建通常从编写Controller开始。北斗默认开启 [自动路由]() 功能，对于简单的应用，可以完全不需要编写Controller代码。

### 创建 `config` 目录
- 创建 `config/config.default.js` 存放通用配置
- 创建 `config/config.local.js` 存放开发环境配置 

如果没有需要添加或修改的自定义配置，直接返回空对象即可
```js
// config/config.default.js
module.exports = {
  keys: 'test',
  router: {
    entry: 'index',
  }
};

```
配置 `router.entry`，只允许client下名称为 `index`的文件作为页面入口。

`keys` 是 Cookie 加密的密钥，参看 [Cookie 秘钥](https://eggjs.org/zh-cn/core/cookie-and-session.html#cookie-%E7%A7%98%E9%92%A5)  


- 创建 `config/plugin.js` 用于配置插件  
  参看 [插件](../basic/plugins.md)
 

写业务的时候，不可避免的需要有配置文件，北斗提供了强大的配置合并管理功能：

* 支持按环境变量加载不同的配置文件，如 config.local.js , config.prod.js ...
* 配置文件可以在应用/插件/框架等地方就近配置，北斗将合并加载。

框架具有丰富的配置能力，参看 [Config配置](../basic/config.md) 了解更多信息。
### 编写页面
beidou默认使用`/client`目录存放客户端代码，如有特殊需要，可以通过修改 `config.client` 和 `config.view.root`，将路径指向自定义目录。

- 在client目录下新增 `index.jsx` 作为页面入口文件

```jsx
// client/index.jsx
import React from 'react';

export default class View extends React.Component {
  render() {
    return (
      <div>
        <h1>News</h1>
        <p>This is a news app</p>
      </div>
    );
  }
}

```
这时候，应用已经可以运行了，通过 `npm run dev` 指令启动本地开发调试服务，控制台上输出

```sh
beidou-core started on http://127.0.0.1:6001
```

表示应用成功启动，访问 `localhost:6001/` 即可看到页面内容。

## 引入前端资源

你可能已经发现，启动应用时，控制台上还打印除了一个高亮信息：`Auto Load Webpack Entry`

这是北斗webpack插件扫描client目录生成的默认entry，本地开发时，资源由webpack托管，我们可以方便地引入，并且支持代码的热加载。

- 创建 `news.jsx`
  > `index.jsx` 相当于MVC中的视图层，它是一个静态的视图模版，不同的是，使用 React 编写，语法上更为统一。

  在 `news.jsx` 中编写功能代码
```jsx
// client/news.jsx
import React from 'react';

export default class News extends React.Component {
 render() {
   return(
    <div>
      <h1>News</h1>
      <p>This is a news app</p>
      <button onClick={() => alert('it works~')}>Click Me</button>
    </div>
   );
 }
}
```

- 修改 `index.jsx`

```jsx
// client/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import News from './news';


export default class View extends React.Component {
  static getPartial() {
    const html = <News />
    return { html };
  }
  render() {
    const { html } = this.props;
    return (
      <html>
        <head>
          <title>news</title>
        </head>
        <body>
        <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
        <script src="/build/manifest.js" /> 
        <script src="/build/index.js" /> 
        </body>
      </html>
    );
  }
}

if (__CLIENT__) {
  ReactDOM.hydrate(<News />, document.getElementById('container'));
}

```

上述代码中，View Component 定义了页面的视图模版，在模版中我们引入了js资源。

其中 定义了静态方法 getPartial，这是由 `beidou-view` 的 `rendering middlewares` 定义的，返回需要进行局部渲染的 React实例Map对象，渲染结果最终会被注入到 props 中，供 render 方法使用。

`__CLIENT__` 是框架定义的全局变量，在服务端恒为 `false`，用于区分服务端/客户端运行时。`ReactDOM`的挂载操作仅在客户端进行。

此时，在浏览器中，我们可以看到一个可交互的同构渲染页面，点击 **Click Me** 时，事件得到响应。

## 编写 Controller

构造复杂Web应用时，仅仅使用上述的自动路由是远远不够的，我们还需要Controller更精细地控制页面逻辑、提供非同构的web服务或编写接口以供调用。

* 每个 Controller 类都是一个文件，定义一个或多个符合 koa 约定的 Async/Generator 方法。文件放置在 `app/controller` 目录下。

* 每个 `app/controller/*.js` 文件，都会被自动加载到 `app.controller.*` 上。

* 注意：下划线会转换为驼峰命名，如 `foo_bar => fooBar`。

使用 Controller 改写控制页面逻辑：

```js
// app/controller/news.js
const Controller = require('beidou-core').Controller;

class NewsController extends Controller {

  async show() {
    const news = await this.ctx.service.news.get();
    await this.ctx.render('index', {
      news,
    });
  }
}

module.exports = NewsController;
```

然后通过 app/router.js 来配置路由映射，相关 API 可以参考 [egg router](https://eggjs.org/zh-cn/basics/router.html)。

```js
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/news', controller.news.show);
};
```
## 编写 Service

在实际应用中， Controller 一般不会自己生成数据，也不会包含复杂的逻辑，你应该将那些复杂的过程放到业务逻辑层 Service 里面，然后暴露出一个简单的函数给 Controller 调用，这样也便于测试。

* 同样，每一个 Service 类都是一个文件，需放置在 app/service 目录下。
* 每个 Service 都会像 Context 一样，在每个请求生成的时候，被自动实例化到 ctx.service.* 下。
* 注意：下划线会转换为驼峰命名，如 foo_bar => fooBar。
* 注意：Service 不是单例。

我们来添加一个 service 抓取 NewsAPI 的数据 ，如下：

```js
// app/service/news.js
const Service = require('beidou-core').Service;

class NewsService extends Service {

  async get() {
    const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=209cd02e74314a32a4e5f1d5b9cbdff1';

    const result = await this.app.curl(url, {
      method: 'GET',
      dataType: 'json',
    });
    return result.data.articles
  }
}

module.exports = NewsService;

```


现在，访问 http://localhost:6001/news，能看到我们之前实现的页面，页面路由router控制。

在controller中，我们还传入了一个对象 `news`，其中包含了我们从NewsAPI获取到的数据。

在 index.jsx 的 render 方法中，我们可以通过props直接读取 `news` 的值。

```jsx
render() {
  const { html, news } = this.props;
  return (
    <html>
      <head>
        <title>News</title>
      </head>
      <body>
      <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
      <script dangerouslySetInnerHTML={{__html: `window.$$data=${JSON.stringify(news)}`}} />
      <script src="/build/manifest.js" /> 
      <script src="/build/index.js" /> 
      </body>
    </html>
  );
}
```

通过 `<script />` 标签，将 news 中的内容挂载到浏览器的 `window` 对象上传递给客户端，这样可以保证两个端具有一致的渲染结果。

## 编写组件

添加 `headline.jsx` 用于展示新闻的标题、描述等信息。

```jsx
// client/headline.jsx
import React from 'react';

export default class News extends React.Component {
 render() {
   const { title, author, description, url, urlToImage, publishedAt } = this.props;
   return(
    <div>
      <h3><a href={url}>{title}</a></h3>
      <p>From: {author}</p>
      <div>
        <img src={urlToImage} style={{ width: '100px'}} />
        <p>{description}</p>
      </div>
      <b>{publishedAt}</b>
      <hr/>
    </div>
   );
 }
}

```

完善 `index.jsx` 和 `news.jsx`

```jsx
// client/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import News from './news';


export default class View extends React.Component {
  static getPartial(props) {
    const { news } = props;
    const html = <News items={news} />
    return { html };
  }
  render() {
    const { html, news } = this.props;
    return (
      <html>
        <head>
          <title>news</title>
        </head>
        <body>
        <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
        <script dangerouslySetInnerHTML={{__html: `window.$$data=${JSON.stringify(news)}`}} />
        <script src="/build/manifest.js" /> 
        <script src="/build/index.js" /> 
        </body>
      </html>
    );
  }
}

if (__CLIENT__) {
  const news = window.$$data;
  ReactDOM.hydrate(<News items={news} />, document.getElementById('container'));
}
```

```jsx
// client/news.jsx
import React from 'react';
import Headline from './headline';

export default class News extends React.Component {
 render() {
   const { items } = this.props;
   return items.map(item => <Headline {...item}/>);
 }
}
```

现在，运行我们的应用并访问 http://localhost:6001/home，我们可以看到一个简单的列表页，展示我们从外部接口获取到的信息。数据在服务端直接获取并直接渲染到页面，同时传递给客户端，保证二者的渲染是一致的。

> 为保证示例的简洁，这里没有使用Redux或者其他的状态管理工具。如何结合状态管理工具构建应用可以参看 [redux example](https://github.com/alibaba/beidou/tree/master/examples/redux) [mobx example](https://github.com/alibaba/beidou/tree/master/examples/with-mobx) 以及examples目录下更多示例。

## 完善其他功能
### 编写 Middleware

假设有个需求：我们的新闻站点，禁止百度爬虫访问。
可以通过 Middleware 判断 UA，如下：

```js
// app/middleware/robot.js
// options 为同名的 config, 即 app.config.robot
module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get('user-agent') || '';
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      ctx.status = 403;
    } else {
      await next();
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

### 添加样式

北斗中默认的[webpack配置](https://github.com/alibaba/beidou/blob/master/packages/beidou-webpack/config/webpack.common.js)中默认添加了 css 和 sass Loader，我们可以在应用中加入样式

```css
/* client/index.css */
body {
  background: #f8f8f8;
}

```

在 `index.jsx` 中引入

```jsx
...
import 'index.jsx';
...
<head>
  <title>news</title>
  <link rel="stylesheet" href="/build/index.css"/>
</head>
...
```

此时，运行项目，我们发现应用抛出了一个 SyntaxError。因为我们直接 import 了一个 `.css` 文件，内容无法在服务端解析，我们需要一些额外的配置让服务端识别非js文件。

```js
// config.default.js
module.exports = {
  ...
  isomorphic: {
    universal: {
      assets: ['.css'],
    }
  },
}
```
上述配置告诉服务端从 webpack 的编译结果中读取 `.css` 文件的内容。本示例中，`.css` 文件的内容对代码运行没有影响，如果使用了 CSS MODULES，得到是转换的类选择器 `key-value` 对象。具体参见 [beidou-isomorphic](https://github.com/alibaba/beidou/blob/master/packages/beidou-isomorphic/README.md)

### 自定义webpack

北斗默认的webpack配置能够满足基本需求, 多数情况下需要自定义webpack配置以满足多样的前端开发需要。

可以在config中配置自定义webpack文件路径：

```js
// config/config.default.js
const path = require('path');

module.exports = {
  ...
  webpack: {
    config: path.join(__dirname, '../webpack.js'),
  },
}
```

```js
// webpack.js
module.exports = (app, defaultConfig, dev) => {
  return {
    ...defaultConfig,
  };
};
```

默认配置以参数的方式传入，可以根据需要自行修改配置。详见 [beidou-webpack](https://github.com/alibaba/beidou/blob/master/packages/beidou-webpack/README.md)
