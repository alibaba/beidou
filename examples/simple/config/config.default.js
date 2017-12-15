
module.exports = {
  keys: 'secrets',
  isomorphic: {
    universal: {
      assets: ['.scss'],
    },
  },
  react: {
    assetPath: '/public/',
  },
  router: {
    entry: 'page',
  },
};
