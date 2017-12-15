

const path = require('path');
const egg = require('egg');

/**
 * App Worker 进程的 Loader，继承 Egg.AppWorkerLoader
 * @extends Egg.AppWorkerLoader
 */
class BeidouAppWorkerLoader extends egg.AppWorkerLoader {
  constructor(options) {
    super(options);

    // 使用egg提供的console, 能够统一控制日志输出级别
    this.logger = options.logger || /* istanbul ignore next */ options.console || /* istanbul ignore next */ console;

    this.logger.info('[Beidou Loader] Beidou Loader started, pid is %s', process.pid);
  }

  /*
   * custom loadRouter
   * @method EggLoader#loadRouter
   */
  loadRouter() {
    super.loadRouter();
    this.loadCustomRouter();
  }

  loadCustomRouter() {
    this.getLoadUnits()
      .forEach(unit => this.loadFile(path.join(unit.path, 'app/extend/router.js')));
  }

  /*
   * custom loadConfig
   * @method EggLoader#loadConfig
   */
  loadConfig() {
    super.loadConfig();

    // 预留扩展
    this.loadAssetsInfo();
  }

  /**
   * @deprecated
   * 加载静态资源在CDN的根路径，如果没有配置 assetsInfo，则使用 package.json 中的信息
   * 比如 /cm/store-decoration-m/0.0.2/
   */
  loadAssetsInfo() {
    let assetsInfo = this.config.assetsInfo;
    if (!assetsInfo) {
      this.config.assetsInfo = assetsInfo = {};
    }

    let group = assetsInfo.group;
    if (!group) {
      group = '';
    }
    let project = assetsInfo.project;
    if (!project) {
      project = this.pkg.name;
    }
    let version = assetsInfo.version;
    if (!version) {
      version = this.pkg.version;
    }
    this.config.assetsInfo.cdnRoot = `/${group}/${project}/${version}/`;
  }
}


module.exports = BeidouAppWorkerLoader;
