Directory Layout
---

Before you start, take a moment to see how the project structure looks like:

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

As above, directories by conventions of framework:

- `app/router.js` used to configure URL routing rules, see [Router](../basic/router.md) for details.
- `app/controller/**` used to parse the input from user, return the corresponding results after processing, see [Controller](../basic/controller.md) for details.
- `app/service/**` used for business logic layer, optional, recommend to use，see [Service](../basic/service.md) for details.
- `app/middleware/**` uesd for middleware, optional, see [Middleware](../basic/middleware.md) for details.
- `app/public/**` used to place static resources, optional, see built-in plugin [egg-static](https://github.com/eggjs/egg-static) for details.
- `app/schedule/**` used for scheduled tasks, optional, see [Scheduled Task](../basic/schedule.md) for details.
- `app/extend/**` used for extensions of the framework, optional, see [Extend EGG](../basic/extend.md) for details.
- `client/**` react application for ismorphic render.
- `config/config.{env}.js` used to write configuration files, see [Configuration](../basic/config.md) for details.
- `config/plugin.js` used to configure the plugins that need to be loaded, see [Plugin](../advanced/plugin.md) for details.
- `test/**` used for unit test, see [Unit Test](../core/unittest.md) for details.
- `app.js` and `agent.js` are used to customize the initialization works at startup, see [Application Startup Configuration](../basic/app-start.md) for details. For the role of `agent.js` see [Agent Mechanism](../core/cluster-and-ipc.md#agent-mechanism).


**To customize your own directory specification, see [Loader API](../advanced/loader.md)**

- `app/view/**` used to place view files, optional, by view plugins conventions, see [View Rendering](../basic/view.md) for details.
- `app/model/**` used to place the domain model, optional, by the domain related plugins conventions, such as [egg-sequelize](https://github.com/eggjs/egg-sequelize).