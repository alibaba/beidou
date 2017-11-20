

const url = require('url');
const path = require('path');

// key 值与 serverEnv的取值对应，与 loader 的逻辑保持一致
// 注： config/serverEnv 文件由构建脚本自动生成，本地环境serverEnv取值为local
const ENV_MAP = {
  daily: 'daily-url', // 日常
  project: 'project-url', // 项目
  pre: 'pre-url', // 预发
  prod: 'online-url', // 线上
};

module.exports = {
  /**
  * 根据环境拼接资源路径
  * @deprecated
  * @member {string} Context#helper
  * @param {string} resourcePath 资源路径
  * @return {string} 包含域名的资源全路径
  */
  resolveResource(resourcePath) {
    this.app.beidouDeprecate('resolveResource is deprecated in beidou, try beidou-plugin-view-react/lib/helper.resolveResource');
    resourcePath = path.join(this.app.config.assetsInfo.cdnRoot, resourcePath);
    return url.resolve(`${this.ctx.protocol}://${this.getHostByEnv()}/`, resourcePath);
  },

  /**
  * 根据环境获取资源 host
  * @deprecated
  * @member {string} Context#helper
  * @return {string} 静态资源所在的 host
  */
  getHostByEnv() {
    this.app.beidouDeprecate('getHostByEnv is deprecated in beidou, try beidou-plugin-view-react/lib/helper.getHostByEnv');

    // serverEnv 来自于 config/serverEnv, app.env来自于 Process.env.NODE_ENV
    const env = this.app.serverEnv;
    if (env === 'local') {
      return this.ctx.host;
    }
    return ENV_MAP[env] || ENV_MAP.prod;
  },
};
