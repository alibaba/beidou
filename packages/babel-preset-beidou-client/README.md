# babel-preset-beidou-client

This preset includes the following plugins:

- @babel/preset-env
- @babel/preset-react
- @babel/preset-typescript [optional]
- @babel/plugin-proposal-function-sent
- @babel/plugin-proposal-decorators
- @babel/plugin-proposal-class-properties
- @babel/plugin-proposal-export-namespace-from
- @babel/plugin-proposal-numeric-separator
- @babel/plugin-proposal-throw-expressions
- babel-plugin-add-module-exports
- react-hot-loader/babel [only for dev]

## Install

Install the preset

```sh
npm install --save-dev babel-preset-beidou-client
```

## Configuration

This preset support dynamic compile browser targets, set [browserslist](https://github.com/ai/browserslist) in your package.json

```json
{
  "browserslist": ["> 1%", "last 2 versions"]
}
```

Or using default browserslist `['>1%', 'last 4 versions', 'not ie < 9']`.

### Config in `.babelrc`

```json
{
  "presets": [["babel-preset-beidou-client", { "typescript": true }]]
}
```

**Options**

- typescript: enable typescript
- env: config passed to preset-env
