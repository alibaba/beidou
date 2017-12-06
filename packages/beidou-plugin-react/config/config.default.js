'use strict';

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
    root: `${appInfo.baseDir}/app/views,${appInfo.baseDir}/client`,
  };

  return config;
};
