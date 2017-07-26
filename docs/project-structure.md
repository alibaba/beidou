## Directory Layout

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

