'use strict';

const path = require('path');

module.exports = (appInfo) => {
  const config = {};

  /**
   * React view options
   * @member Config#react
   */
  config.react = {
    middlewares: ['cache', 'redux', 'partial', 'render', 'doctype', 'beautify'],
    beautify: false,
    cache: true,
    // loadPath: `${appInfo.baseDir}/client`,
    // clientPath: `${appInfo.baseDir}/client`,

    /**
     * Use `renderToStaticMarkup` if true, otherwise `renderToString`
     */
    static: false,
    doctype: '<!DOCTYPE html>',
    assetHost: '',
    assetPath: '',
  };
  config.view = {
    defaultViewEngine: 'react',
    defaultExtension: '.jsx',
    root: `${path.join(appInfo.baseDir, 'app/views')},${path.join(
      appInfo.baseDir,
      'client'
    )}`,
  };

  return config;
};
