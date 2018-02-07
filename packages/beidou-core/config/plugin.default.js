'use strict';

module.exports = {
  /**
   * Beidou view plugin
   * @member {Object} Plugin#react view
   * @property {Boolean} enable - Default: true
   * @since 1.0.0
   */
  react: {
    enable: true,
    package: 'beidou-plugin-react',
  },

  /**
   * webpack plugin
   * @property {Boolean} enable - Default: true
   * @property {Array} env - Default: ['local']
   */
  webpack: {
    enable: true,
    package: 'beidou-plugin-webpack',
    env: ['local', 'unittest'],
  },

  /**
   * Isomorphic plugin
   * @property {Boolean} enable - Default: true
   */
  isomorphic: {
    enable: true,
    package: 'beidou-plugin-isomorphic',
  },

  /**
   * Isomorphic plugin
   * @property {Boolean} enable - Default: true
   */
  router: {
    enable: true,
    package: 'beidou-plugin-router',
  },

  /**
   * @member {Object} Plugin#i18n
   * @property {Boolean} enable - Default: false
   * @since 1.0.0
   */
  i18n: {
    enable: false,
  },

  beidouView: {
    enable: true,
    package: 'beidou-view',
  },
};
