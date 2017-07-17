'use strict';

const url = require('url');
const path = require('path');

module.exports = (app) => {
  class ViewHelper extends app.Helper {
    constructor(ctx) {
      super(ctx);
      this.ctx = ctx;
      this.env = app.config.env;
      this.host = app.config.react.host;
    }

    /**
    * resolve local resource address
    * @param {Array<String>} pathes relative path
    * @return {string} full address
    */
    resolveLocalResource(...pathes) {
      return path.join(...pathes);
    }

    /**
    * resolve resource address with `react.host` config
    * @param {string} resourcePath relative path
    * @param {string} host optional, default `react.host`
    * @return {string} full http address
    */
    resolveResource(resourcePath, host = this.host) {
      if (host) {
        return url.resolve(`${this.ctx.protocol}://${this.host}/`, resourcePath);
      }

      return this.resolveLocalResource(resourcePath);
    }
  }

  return ViewHelper;
};
