# babel-preset-beidou-client

This preset includes the following plugins:

- babel-preset-env
- babel-preset-react
- babel-preset-stage-2
- babel-plugin-typecheck
- react-hot-loader

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
