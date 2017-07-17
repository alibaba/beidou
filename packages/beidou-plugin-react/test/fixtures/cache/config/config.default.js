module.exports = function (appInfo) {
  const exports = {
    keys: '123456',
    view: {
      defaultViewEngine: 'react',
      defaultExtension: '.jsx',
      root: `${appInfo.baseDir}/app/views`
    },
    react: {
      internals: false,
    }
  };
  return exports;
};
