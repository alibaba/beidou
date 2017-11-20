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
    loadPath: `${appInfo.baseDir}/client`,
    clientPath: `${appInfo.baseDir}/client`,
    internals: true,
    doctype: '<!DOCTYPE html>',
    host: '',
  };
  config.view = {
    defaultViewEngine: 'react',
    defaultExtension: '.jsx',
    root: `${appInfo.baseDir}/client`,
  };

  return config;
};
