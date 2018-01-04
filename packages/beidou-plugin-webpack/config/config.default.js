/**
 * default config
 */

exports.webpack = {
  // config: 'path/to/webpack/config/file',
  // publicPath: 'webpack/dev/custom-webpack-config/public/path'
  path: [], // the path of request should be transferred to webpack. e.g HMR: /__webpack_hmr
  noInfo: true,
  quiet: true,
  clientLogLevel: 'warning',
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
  headers: { 'X-Custom-Header': 'yes' },
  stats: {
    colors: true,
    chunks: false,
  },
  defaultEntryName: 'index.jsx',
  outputPath: './build',
  publicPath: '/build',
  hmr: {
    reload: true,
  },
};
