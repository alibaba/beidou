'use strict';

module.exports = {
  beidouView: {
    enable: true,
    package: 'beidou-view',
  },

  /**
   * Beidou view plugin
   * @member {Object} Plugin#react view
   * @property {Boolean} enable - Default: true
   * @since 1.0.0
   */
  react: {
    enable: true,
    package: 'beidou-view-react',
  },

  /**
   * webpack plugin
   * @property {Boolean} enable - Default: true
   * @property {Array} env - Default: ['local']
   */
  webpack: {
    enable: true,
    package: 'beidou-webpack',
    env: ['local', 'unittest'],
  },

  /**
   * Isomorphic plugin
   * @property {Boolean} enable - Default: true
   */
  isomorphic: {
    enable: true,
    package: 'beidou-isomorphic',
  },

  /**
   * Isomorphic plugin
   * @property {Boolean} enable - Default: true
   */
  router: {
    enable: true,
    package: 'beidou-router',
  },

  /**
   * @member {Object} Plugin#i18n
   * @property {Boolean} enable - Default: false
   * @since 1.0.0
   */
  i18n: {
    enable: false,
  },
};
