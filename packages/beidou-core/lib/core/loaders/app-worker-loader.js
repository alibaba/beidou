const path = require('path');
const egg = require('egg');

/**
 * App Worker Loader, extend Egg.AppWorkerLoader
 * @extends Egg.AppWorkerLoader
 */
class BeidouAppWorkerLoader extends egg.AppWorkerLoader {
  constructor(options) {
    super(options);

    this.logger =
      options.logger ||
      /* istanbul ignore next */ options.console ||
      /* istanbul ignore next */ console;

    this.logger.info(
      '[Beidou Loader] Beidou Loader started, pid is %s',
      process.pid
    );
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
    this.getLoadUnits().forEach(unit =>
      this.loadFile(path.join(unit.path, 'app/extend/router.js'))
    );
  }

  /*
   * custom loadConfig
   * @method EggLoader#loadConfig
   */
  loadConfig() {
    super.loadConfig();

    this.loadAssetsInfo();
  }

  /**
   * @deprecated
   * load static resources based on CDN root.
   * eg. /cm/store-decoration-m/0.0.2/
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
