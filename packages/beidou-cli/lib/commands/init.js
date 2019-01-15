'use strict';

const os = require('os');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const zlib = require('zlib');
const tar = require('tar');
const urllib = require('urllib');
const updater = require('npm-updater');
const mkdirp = require('mkdirp');
const inquirer = require('inquirer');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');
const glob = require('glob');
const groupBy = require('group-object');
const chalk = require('chalk');
const { Command } = require('egg-bin');
const helper = require('../helper');

const { log, configs } = helper;

module.exports = class InitCMD extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = `Usage: ${configs.cmdName} init [options]`;
    this.options = {
      type: {
        description: 'boilerplate type',
        alias: 't',
        type: 'string',
      },
      tag: {
        description: 'boilerplate tag',
        alias: 'a',
        type: 'string',
      },
      force: {
        type: 'boolean',
        description: 'force to overwrite directory',
        alias: 'f',
      },
      skipInstall: {
        type: 'boolean',
        description: 'skip npm install',
        alias: 's',
        default: false,
      },
    };

    this.pkgInfo = require(path.join(configs.root, 'package.json'));
    this.fileMapping = {
      gitignore: '.gitignore',
      _gitignore: '.gitignore',
      '_.gitignore': '.gitignore',
      '_package.json': 'package.json',
      '_.eslintignore': '.eslintignore',
    };
    this.proxyMapping = [];
  }

  get description() {
    return 'Init beidou boilerplate';
  }

  async run(context) {
    const { cwd, argv } = context;
    this.cwd = cwd;
    this.argv = argv;
    this.registryUrl = await helper.getRegistry();
    log.info(`use registry: ${this.registryUrl}`);

    // check update
    await updater({
      package: this.pkgInfo,
      registry: this.registryUrl,
      level: 'major',
    });

    this.targetDir = await this.getTargetDirectory();
    const boilerplateMapping = this.fetchBoilerplateMapping();

    let boilerplate;
    if (
      argv.type &&
      Object.hasOwnProperty.call(boilerplateMapping, argv.type)
    ) {
      boilerplate = boilerplateMapping[argv.type];
    } else {
      boilerplate = await this.askForBoilerplateType(boilerplateMapping);
    }
    log.info(`you have selected: ${boilerplate.name}(${boilerplate.package})`);

    const tag = argv.tag || boilerplate.tag || 'latest';
    try {
      const templateDir = await this.downloadBoilerplate(
        boilerplate.package,
        tag
      );

      // copy template
      await this.processFiles(this.targetDir, templateDir);

      if (!argv.skipInstall) {
        log.green('start to install the dependencies ... ');

        await helper.install(this.targetDir, this.registryUrl);
      }

      log.green('npm packages installed');
      // done
      this.exitInfo();
    } catch (e) {
      log.error(e.message);
    }
  }

  /**
   * ask for target directory, will check if dir is valid.
   * @return {String} Full path of target directory
   */
  async getTargetDirectory() {
    let targetDir = path.resolve(this.cwd, '');
    const { force } = this.argv;

    const validate = (dir) => {
      // create dir if not exist
      if (!fs.existsSync(dir)) {
        mkdirp.sync(dir);
        return true;
      }

      // not a directory
      if (!fs.statSync(dir).isDirectory()) {
        log.error(`${dir} already exists as a file`);
        return false;
      }

      // check if directory empty
      const files = fs.readdirSync(dir).filter(name => name[0] !== '.');
      if (files.length) {
        if (force) {
          log.info(`${dir} already exists and will be override due to --force`);
          return true;
        }
        log.warn(
          `${dir} already exists and not empty, to override please use --force`
        );
        return false;
      }
      return true;
    };

    // if argv dir is invalid, then ask user
    const isValid = validate(targetDir);
    if (!isValid) {
      const answer = await inquirer.prompt({
        name: 'dir',
        message: 'Please enter target dir: ',
        filter: dir => path.resolve(this.cwd, dir),
        validate,
      });
      targetDir = answer.dir;
    }
    log.info(`target dir is ${targetDir}`);
    return targetDir;
  }

  /**
   * fetch boilerplate mapping from `package.json`
   * @return {Object} boilerplate config mapping,
   * `{
   *   simple: {
   *     "name": "admin",
   *     "package": "beidou-template-simple",
   *     "description": "Simple beidou isomorphic app boilerplate"
   *   }
   * }`
   */
  fetchBoilerplateMapping() {
    const { pkgInfo } = this;
    const mapping = pkgInfo.boilerplates;
    for (const key of Object.keys(mapping)) {
      const item = mapping[key];
      item.name = item.name || key;
      item.from = pkgInfo;
    }
    return mapping;
  }

  /**
   * show boilerplate list and let user choose one
   *
   * @param {Object} mapping - boilerplate config mapping,
   * `{
   *   simple: {
   *     "name": "admin",
   *     "package": "beidou-example-admin",
   *     "description": "admin platform"
   *   }
   * }`
   * @return {Object} boilerplate config item
   */
  async askForBoilerplateType(mapping) {
    // group by category
    const groupMapping = groupBy(
      mapping,
      (acc, value) => value.category || 'other'
    );
    const groupNames = Object.keys(groupMapping);

    let group;
    if (groupNames.length > 1) {
      const answers = await inquirer.prompt({
        name: 'group',
        type: 'list',
        message: 'Please select a boilerplate category',
        choices: groupNames,
      });
      group = groupMapping[answers.group];
    } else {
      group = groupMapping[groupNames[0]];
    }

    // ask for boilerplate
    const choices = Object.keys(group).map((key) => {
      const item = group[key];
      return {
        name: `${key} - ${item.description}`,
        value: item,
      };
    });

    choices.unshift(new inquirer.Separator());

    const answers = await inquirer.prompt({
      name: 'type',
      type: 'list',
      message: 'Please select a boilerplate type',
      choices,
    });
    return answers.type;
  }

  /**
   * ownload boilerplate by pkgName then extract it
   * @param {String} pkgName - boilerplate package name
   * @param {String} tag - boilerplate package tag
   * @return {String} extract directory
   */
  async downloadBoilerplate(pkgName, tag = 'latest') {
    const result = await this.getPackageInfo(pkgName, tag, false);
    if (!result.dist) {
      throw new Error(`boilerplate: ${pkgName}@${tag} not found`);
    }
    const tgzUrl = result.dist.tarball;
    const saveDir = path.join(os.tmpdir(), 'beidou-init-boilerplate');
    log.info(`downloading: ${tgzUrl}`);
    await this.downloadAndUnzip(tgzUrl, saveDir);
    log.info(`extract to: ${saveDir}`);
    return saveDir;
  }

  /**
   * get package info from registry
   *
   * @param {String} pkgName package name
   * @param {String} tag package tag
   * @param {Boolean} [withFallback] when http request fail,
   *   whether to require local
   * @return {Object} pkgInfo
   */
  async getPackageInfo(pkgName, tag, withFallback) {
    try {
      const result = await urllib.request(`${this.registryUrl}/${pkgName}`, {
        dataType: 'json',
        followRedirect: true,
      });
      const info = result.data;

      if (tag && info['dist-tags'] && info['dist-tags'][tag]) {
        const version = info['dist-tags'][tag];
        return info.versions[version];
      }
      throw new Error('Package not found');
    } catch (err) {
      if (withFallback) {
        log.warn(`use fallback from ${pkgName}`);
        return require(`${pkgName}/package.json`);
      }
      throw err;
    }
  }

  /**
   * download tgz and extract
   * @param {String} url - tgzball url
   * @param {String} saveDir - target dir, will rm it first
   */
  async downloadAndUnzip(url, saveDir) {
    await new Promise((resolve, reject) => {
      rimraf.sync(saveDir);
      function handleError(err) {
        rimraf.sync(saveDir);
        reject(err);
      }

      urllib.request(
        url,
        {
          followRedirect: true,
          streaming: true,
        },
        (err, _, res) => {
          if (err) {
            return reject(err);
          }

          const gunzip = zlib.createGunzip();
          gunzip.on('error', handleError);

          const extractor = tar.Extract({ path: saveDir, strip: 1 });
          extractor.on('error', handleError);
          extractor.on('end', resolve);

          res.pipe(gunzip).pipe(extractor);
        }
      );
    });
  }

  /**
   * copy boilerplate to target dir with template scope replace
   * @param {String} targetDir - target dir
   * @param {String} templateDir - template dir
   * @return {Array} file names
   */
  async processFiles(targetDir, templateDir) {
    // const src = path.join(templateDir, 'boilerplate');
    const src = path.join(templateDir);
    const locals = {};
    const fsEditor = editor.create(memFs.create());
    const files = glob.sync('**/*', { cwd: src, dot: true, nodir: true });
    for (const file of files) {
      const from = path.join(src, file);
      const to = path.join(
        targetDir,
        this.replaceTemplate(this.fileMapping[file] || file, locals)
      );
      fsEditor.copy(from, to, {
        process: (content) => {
          log.info('write to:%s', to);
          return this.replaceTemplate(content, locals);
        },
      });
    }

    // write boilerplate base info to dist pkg info
    const tplPkgInfo = require(path.join(templateDir, 'package.json'));
    fsEditor.extendJSON(path.join(targetDir, 'package.json'), {
      boilerplate: {
        name: tplPkgInfo.name,
        version: tplPkgInfo.version,
        description: tplPkgInfo.description,
        repository: tplPkgInfo.repository,
        homepage: tplPkgInfo.homepage,
      },
    });

    // write file to disk
    await new Promise(resolve => fsEditor.commit(resolve));
    this.copyGitignore(targetDir);
    return files;
  }

  /**
   * replace content with template scope,
   * - `{{ test }}` will replace
   * - `\{{ test }}` will skip
   *
   * @param {String} content - template content
   * @param {Object} scope - variable scope
   * @return {String} new content
   */
  replaceTemplate(content, scope) {
    return content
      .toString()
      .replace(/(\\)?{{ *(\w+) *}}/g, (block, skip, key) => {
        if (skip) {
          return block.substring(skip.length);
        }
        return Object.hasOwnProperty.call(scope, key) ? scope[key] : block;
      });
  }

  copyGitignore(targetDir) {
    const to = path.join(targetDir, '.gitignore');
    log.info('write to:%s', to);
    fs.writeFileSync(
      to,
      fs.readFileSync(path.join(__filename, '../../files/_.gitignore'))
    );
  }

  exitInfo() {
    log.green('boilerplate initialization is completed, follow below commands');
    if (!configs.noInitUsageInfo) {
      log.info(`\n
    cd ${this.targetDir}
    ${configs.cmdName} dev ${chalk.gray('# start dev server')}
    ${configs.cmdName} start ${chalk.gray('# start prod server')}
    ${configs.cmdName} build ${chalk.gray('# build assets')}
        `);
    }
  }
};
