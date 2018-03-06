'use strict';

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const imageLoaderConfig = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000,
    name: '[name]-[hash:5].[ext]',
  },
};

const fileLoaderConfig = {
  test: [
    /\.ico$/,
    /\.woff2?$/,
    /\.svgz?$/,
    /\.otf$/,
    /\.tiff?$/,
    /\.ttf$/,
    /\.eot$/,
    /\.midi?$/,
  ],
  loader: require.resolve('file-loader'),
  options: {
    name: '[name]-[hash:5].[ext]',
  },
};

function getCssLoaderConfig(dev, modules = false) {
  return {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 1,
      minimize: !dev,
      sourceMap: dev,
      modules,
      localIdentName: '[local]_[hash:base64:5]',
    },
  };
}

const postCssLoaderConfig = {
  loader: require.resolve('postcss-loader'),
  options: {
    // Necessary for external CSS imports to work
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
        flexbox: 'no-2009',
      }),
    ],
  },
};

const getStyleFallbackConfig = dev => ({
  loader: require.resolve('style-loader'),
  options: {
    hmr: dev,
  },
});

function getStyleCongfigs(dev) {
  return [
    {
      test: /\.css$/,
      exclude: /\.module\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: getStyleFallbackConfig(dev),
        use: [getCssLoaderConfig(dev), postCssLoaderConfig],
      }),
    },
    {
      test: /\.module\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: getStyleFallbackConfig(dev),
        use: [getCssLoaderConfig(dev, true), postCssLoaderConfig],
      }),
    },
    {
      test: /\.s(c|a)ss$/,
      exclude: /\.module\.s(c|a)ss$/,
      use: ExtractTextPlugin.extract({
        fallback: getStyleFallbackConfig(dev),
        use: [
          getCssLoaderConfig(dev),
          postCssLoaderConfig,
          {
            loader: require.resolve('sass-loader'),
          },
        ],
      }),
    },
    {
      test: /\.module\.s(c|a)ss$/,
      use: ExtractTextPlugin.extract({
        fallback: getStyleFallbackConfig(dev),
        use: [
          getCssLoaderConfig(dev, true),
          postCssLoaderConfig,
          {
            loader: require.resolve('sass-loader'),
          },
        ],
      }),
    },
  ];
}

exports.imageLoaderConfig = imageLoaderConfig;
exports.fileLoaderConfig = fileLoaderConfig;
exports.ExtractTextPlugin = ExtractTextPlugin;
exports.getStyleCongfigs = getStyleCongfigs;
