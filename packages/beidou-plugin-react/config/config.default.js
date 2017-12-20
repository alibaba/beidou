const path = require('path');

module.exports = (appInfo) => {
  const config = {};

  /**
   * View options
   * @member Config#view
   */
  config.react = {
    beautify: false,
    cache: true,
    // loadPath: `${appInfo.baseDir}/client`,
    // clientPath: `${appInfo.baseDir}/client`,
    static: false,
    doctype: '<!DOCTYPE html>',
    assetHost: '',
    assetPath: '',
  };
  config.view = {
    defaultViewEngine: 'react',
    defaultExtension: '.jsx',
    root: `${path.join(appInfo.baseDir, 'app/views')},${path.join(appInfo.baseDir, 'client')}`,
  };

  return config;
};
