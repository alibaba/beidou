'use strict';

module.exports = {
  keys: 'secrets',
  isomorphic: {
    babel: {
      extensions: ['.jsx'],
    },
  },
  rax: {
    static: true,
    cache: false,
    beautify: true,
    assetPath: '/build/',
  },
  webpack: {
    output: {
      publicPath: '/build/',
    },
    devServer: {
      noInfo: false,
    },
  },
};
