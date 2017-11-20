/**
 * default config
 */

exports.webpack = {
  // config: 'path/to/webpack/config/file',
  // publicPath: 'webpack/dev/custom-webpack-config/public/path'
  path: [], // the path of request should be transfered to webpack. e.g HMR: /__webpack_hmr
  noInfo: false,
  quiet: false,
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
    enable: false,
    path: '__webpack_hmr',
    timeout: '20000',
    heartbeat: '10000',
  },
};
