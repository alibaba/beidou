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


function getStyleCongfigs(dev, options) {
  const extractLoader = { loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: dev,
    },
  };
  const styleLoader = {
    loader: require.resolve('style-loader'),
    options: {
      hmr: dev,
    },
  };

  const defaultLoader = options.cssExtract ? extractLoader : styleLoader;

  const dynamicProcessor = (rule) => {
    const use = rule.use.slice(1);

    rule.processor = function (factory) {
      if (factory.cssExtract === undefined) {
        return {};
      }
      if (factory.cssExtract) {
        return {
          use: [
            extractLoader,
            ...use,
          ],
        };
      } else {
        return {
          use: [
            styleLoader,
            ...use,
          ],
        };
      }
    };

    return rule;
  };


  const loaders = [
    dynamicProcessor({
      test: /\.css$/,
      exclude: /\.m(odule)?\.css$/,
      use: [
        defaultLoader,
        getCssLoaderConfig(dev),
        postCssLoaderConfig,
      ],
    }),
    dynamicProcessor({
      test: /\.m(odule)?\.css$/,
      use: [
        defaultLoader,
        getCssLoaderConfig(dev, true),
        postCssLoaderConfig,
      ],
    }),
    dynamicProcessor({
      test: /\.less$/,
      exclude: /\.m(odule)?\.less$/,
      use: [
        defaultLoader,
        getCssLoaderConfig(dev),
        postCssLoaderConfig,
        lessLoaderConfig,
      ],
    }),
    dynamicProcessor({
      test: /\.m(odule)?\.less$/,
      use: [
        defaultLoader,
        getCssLoaderConfig(dev, true),
        postCssLoaderConfig,
        lessLoaderConfig,
      ],
    }),
  ];
  if (requirePeer.resolve('sass-loader').isValid) {
    return loaders.concat([
      dynamicProcessor({
        test: /\.s(c|a)ss$/,
        exclude: /\.m(odule)?\.s(c|a)ss$/,
        use: [
          defaultLoader,
          getCssLoaderConfig(dev),
          postCssLoaderConfig,
          {
            loader: require.resolve('sass-loader'),
          },
        ],
      }),
      dynamicProcessor({
        test: /\.m(odule)?\.s(c|a)ss$/,
        use: [
          defaultLoader,
          getCssLoaderConfig(dev, true),
          postCssLoaderConfig,
          {
            loader: require.resolve('sass-loader'),
          },
        ],
      }),
    ]);
  }

  return loaders;
}

exports.imageLoaderConfig = imageLoaderConfig;
exports.fileLoaderConfig = fileLoaderConfig;
exports.MiniCssExtractPlugin = MiniCssExtractPlugin;
exports.getStyleCongfigs = getStyleCongfigs;
