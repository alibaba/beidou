'use strict';

const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const codependency = require('codependency');

const requirePeer = codependency.register(module, { strictCheck: false });

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
    /\.svgz?$/,
    /\.woff2?$/,
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
      localIdentName: modules ? '[local]_[hash:base64:5]' : undefined,
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
        // browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
        // please set browserslist in package.json
        flexbox: 'no-2009',
      }),
    ],
  },
};

const lessLoaderConfig = {
  loader: require.resolve('less-loader'),
  options: {
    javascriptEnabled: true,
  },
};

function getStyleCongfigs(dev) {
  const loaders = [
    {
      test: /\.css$/,
      exclude: /\.m(odule)?\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: dev,
          },
        },
        getCssLoaderConfig(dev),
        postCssLoaderConfig,
      ],
    },
    {
      test: /\.m(odule)?\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: dev,
          },
        },
        getCssLoaderConfig(dev, true),
        postCssLoaderConfig,
      ],
    },
    {
      test: /\.less$/,
      exclude: /\.m(odule)?\.less$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: dev,
          },
        },
        getCssLoaderConfig(dev),
        postCssLoaderConfig,
        lessLoaderConfig,
      ],
    },
    {
      test: /\.m(odule)?\.less$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: dev,
          },
        },
        getCssLoaderConfig(dev, true),
        postCssLoaderConfig,
        lessLoaderConfig,
      ],
    },
  ];
  if (requirePeer.resolve('sass-loader').isValid) {
    return loaders.concat([
      {
        test: /\.s(c|a)ss$/,
        exclude: /\.m(odule)?\.s(c|a)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: dev,
            },
          },
          getCssLoaderConfig(dev),
          postCssLoaderConfig,
          {
            loader: require.resolve('sass-loader'),
          },
        ],
      },
      {
        test: /\.m(odule)?\.s(c|a)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: dev,
            },
          },
          getCssLoaderConfig(dev, true),
          postCssLoaderConfig,
          {
            loader: require.resolve('sass-loader'),
          },
        ],
      },
    ]);
  }

  return loaders;
}

exports.imageLoaderConfig = imageLoaderConfig;
exports.fileLoaderConfig = fileLoaderConfig;
exports.MiniCssExtractPlugin = MiniCssExtractPlugin;
exports.getStyleCongfigs = getStyleCongfigs;
