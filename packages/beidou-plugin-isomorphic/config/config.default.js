

module.exports = () => {
  const config = {};

  config.isomorphic = {
    webpackAlias: {},  // resolve.alias of webpack config
    match: 'NO_MATCH', // Default to 'NO_MATCH'
  };

  return config;
};
