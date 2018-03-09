module.exports = {
  /**
   * webpack plugin: only should enable in local env
   * here we overwrite the default config to enable in prod env
   *    just for test performance
   * @property {Boolean} enable - Default: true
   * @property {Array} env - Default: ['local']
   */
  webpack: {
    enable: true,
    package: 'beidou-plugin-webpack',
    env: ['local', 'unittest', 'prod'],
  },
};
