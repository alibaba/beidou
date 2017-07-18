Isomorphic framework for server-rendered React apps

[![NPM version][npm-image]][npm-url]
[![NPM quality][quality-image]][quality-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![NPM download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/beidou-core.svg?style=flat-square
[npm-url]: https://npmjs.org/package/beidou-core
[quality-image]: http://npm.packagequality.com/shield/beidou-core.svg?style=flat-square
[quality-url]: http://packagequality.com/#?package=beidou-core
[travis-image]: https://img.shields.io/travis/alibaba/beidou.svg?style=flat-square
[travis-url]: https://travis-ci.org/alibaba/beidou
[codecov-image]: https://img.shields.io/codecov/c/github/alibaba/beidou.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/alibaba/beidou
[gitter-image]: https://img.shields.io/gitter/room/alibaba/beidou.svg?style=flat-square
[gitter-url]: https://gitter.im/alibaba/beidou

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Features](#features)
- [How to use](#how-to-use)
  - [Setup](#setup)
  - [Structure](#structure)
  - [Router](#router)
    - [Auto router](#auto-router)
    - [Custom router](#custom-router)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

- ✔︎ React server side render
- ✔︎ ES6/ES7 supported
- ✔︎ Css modules supported
- ✔︎ Lots of [plugins](https://github.com/search?q=topic%3Aegg-plugin&type=Repositories)

## How to use
### Setup

Install generator

```bash
// todo
npm install beidou-bin -g
```

Init


```bash
// todo
beidou init
```

Start


```bash
npm install
npm run start
```

After that, go to `http://localhost:6001/`

### Structure

```bash
beidou-project
├── package.json
├── app.js (optional)
├── agent.js (optional)
├── app
|   ├── router.js (optional)
│   ├── controller (optional)
│   |   └── home.js
│   ├── service (optional)
│   |   └── user.js
│   ├── middleware (optional)
│   |   └── response_time.js
│   ├── schedule (optional)
│   |   └── my_task.js
│   ├── public (optional)
│   |   └── reset.css
│   ├── view (optional)
│   |   └── home.tpl
│   └── extend (optional)
│       ├── helper.js
│       ├── request.js
│       ├── response.js
│       ├── context.js
│       ├── application.js
│       └── agent.js
├── config
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (optional)
|   ├── config.local.js (optional)
|   └── config.unittest.js (optional)
├── client
|   ├── index.jsx
|   └── page/index.jsx
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

### Router

#### Auto router

Every page in /client folder will be routed automatically. 
For example, visit `http://localhost:6001/page-a`, `/client/page-a.jsx` will be rendered.


| Client source          | Router | Memo           |
| ---------------------- | ------ | -------------- |
| client/index.jsx       | /      | Default router |
| client/index/index.jsx | /      | Default router |
| client/a.jsx           | /a     | Auto router    |
| client/a/index.jsx     | /a     | Auto router    |
| client/a/b.jsx         | /a/b   | Auto router    |
| client/a/b/index.jsx   | /a/b   | Auto router    |

#### Custom router

if we want to map `/a` to `/client/b.jsx`, follow the next steps
step 1: create a new router

```javascript
//  /app/router.js
module.exports = (app) => {
  app.get('/a', app.controller.a);
};

```

step 2: create a new controller, and render `/client/b.jsx`


```javascript
//  /app/controller/a.js
module.exports = function* aController() {
  yield this.render('b');
};

```

## License

[MIT](LICENSE)


