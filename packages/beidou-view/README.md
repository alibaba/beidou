# Beidou base view

> React view

Used by internal react and rax plugins.

# Middlewares

We introduced **View Middlewares** mechanism since `v1.0.0`. The rendering process is fully defined by a combination of middlewares, which means you can redefined them or add custom ones if needed.

## How is works

> The `${viewType}` below means a specific view implemented from `beidou-view`, such as `react` `rax` and so on.

Firstly, a rendering process accepts a **context object**, we call it `View Context`. And the context will be passed in many middlewares in sequence which defined in `config.${viewType}.middlewares`. For example, in `beidou-view-react`:

```js
// config/config.default.js
module.exports = {
  react: {
    middlewares: ['cache', 'redux', 'partial', 'render', 'doctype', 'beautify'],
  },
};
```

The array in field `react.middlewares` contains names of view middlewares which correspond to the file located in all `app/view-middlewares`, both project and plugin directories.

Files in `app/view-middlewares` are automaticly loaded from all available pathes, so custom middlewares could be placed at your project directory of a custom plugin you write.

So, how is a view middleware like? Take `doctype` middleware for example:

```js
module.exports = async function(viewCtx, next) {
  await next();

  const defaultDoctype = viewCtx.options.doctype;
  const { html, Component } = viewCtx;
  const doctype = Component.doctype || defaultDoctype;
  if (doctype && typeof doctype === 'string') {
    viewCtx.html = doctype + html;
  }
};
```

**doctype** interplolates **html doctype** after view component rendering finished when `viewCtx.html` produced.

The `viewCtx.html` is final context sended to browser.

# List of Middlewares

## cache

**cache** cleans **require cache** everytime a rendering begin when `config.${viewType}.cache` is `true`.

### Configuration

|        File        |           Field            |  Type   | Default | Description                 |
| :----------------: | :------------------------: | :-----: | :-----: | :-------------------------- |
| `config.${env}.js` | `config.${viewType}.cache` | Boolean | `true`  | Don't clean cache if `true` |

## initialprops

Inject props into Component before render.

|      File      |         Field          |      Type      |   Default   | Description                 |
| :------------: | :--------------------: | :------------: | :---------: | :-------------------------- |
| View Component | `View.getInitialProps` | Function/Async | `undefined` | Inject props into Component |

## redux

Provide store **constructing** and **serialization** of redux.

|      File      |      Field      |      Type      |   Default   | Description                       |
| :------------: | :-------------: | :------------: | :---------: | :-------------------------------- |
| View Component | `View.getStore` | Function/Async | `undefined` | function(viewCtx.props): StoreMap |

See [Redux Example](https://github.com/alibaba/beidou/tree/master/examples/redux) for usage.

### Why need serialization

Usually, we use JSON object wrapped in `<script>` tag to pass data from server to client. `JSON.stringify` is not safe because of XSS.

For example:

```js
{
  foo: `</script>`;
}
```

String `</script>` close script tag in accident, data broken and page messed up.

We use [serialize-javascript](https://github.com/yahoo/serialize-javascript) to serialize JavaScript to a superset of JSON that includes regular expressions and functions.

## partial

Render react component into string Dymaticlly.

|      File      |       Field       |      Type      |   Default   | Description                                |
| :------------: | :---------------: | :------------: | :---------: | :----------------------------------------- |
| View Component | `View.getPartial` | Function/Async | `undefined` | function(viewCtx.props): ReactComponentMap |

## doctype

Define html doctype.

|        File        |            Field             |  Type  |       Default       | Description           |
| :----------------: | :--------------------------: | :----: | :-----------------: | :-------------------- |
| `config.${env}.js` | `config.${viewType}.doctype` | String | `'<!DOCTYPE html>'` | Global doctype config |
|   View Component   |        `View.doctype`        | String |     `undefined`     | View doctype config   |

## beautify

Beautify html ouput.

|        File        |             Field             |  Type  | Default | Description             |
| :----------------: | :---------------------------: | :----: | :-----: | :---------------------- |
| `config.${env}.js` | `config.${viewType}.beautify` | String | `false` | enable/disable beautify |

> This may cause a React warning tells DOM element unmatch between server side and client side result. We recommend to use this in development, to get a friendly html format.

## License

[MIT](LICENSE)
