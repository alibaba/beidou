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
const yargs = require('yargs');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');
const glob = require('glob');
const groupBy = require('group-object');
const BaseCommand = require('./base-command');

class InitCommand extends BaseCommand {
  constructor() {
    super();
    this.pkgInfo = require('../../package.json');
    this.inquirer = inquirer;
    this.fileMapping = {
      gitignore: '.gitignore',
      _gitignore: '.gitignore',
      '_.gitignore': '.gitignore',
      '_package.json': 'package.json',
      '_.eslintignore': '.eslintignore',
    };
    this.proxyMapping = [];
    // default to beidou
    this.toolkitName = 'beidou';
  }

  * run(cwd, args, toolkit) {
    const processedArgs = args || [];
    if (toolkit) {
      this.toolkitName = toolkit;
    }
    const argv = (this.argv = this.getParser().parse(processedArgs));
    this.cwd = cwd;

    // detect registry url
    this.registryUrl = yield this.helper.getRegistry();
    this.log(`use registry: ${this.registryUrl}`);

    // check update
    yield updater({
      package: this.pkgInfo,
      registry: this.registryUrl,
      level: 'major',
    });

    // ask for target dir
    this.targetDir = yield this.getTargetDirectory();

    // list boilerplate
    const boilerplateMapping = yield this.fetchBoilerplateMapping();
    // ask for boilerplate
    let boilerplate;
    if (
      argv.type &&
      Object.hasOwnProperty.call(boilerplateMapping, argv.type)
    ) {
      boilerplate = boilerplateMapping[argv.type];
    } else {
      boilerplate = yield this.askForBoilerplateType(boilerplateMapping);
    }
    this.log(`you have selected: ${boilerplate.name}(${boilerplate.package})`);

    try {
      // download boilerplate
      const templateDir = yield this.downloadBoilerplate(
        boilerplate.package,
        argv.tag
      );

      // copy template
      yield this.processFiles(this.targetDir, templateDir);

      this.log('start to install the dependencies ... '.green);

      yield this.helper.install(this.targetDir, this.registryUrl);

      this.log('npm packages installed'.green);
      // done
      this.printUsage();
    } catch (e) {
      this.log(e.message.red);
    } finally {
      process.exit();
    }
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
  * askForBoilerplateType(mapping) {
    // group by category
    const groupMapping = groupBy(
      mapping,
      (acc, value) => value.category || 'other'
    );
    const groupNames = Object.keys(groupMapping);

    let group;
    if (groupNames.length > 1) {
      const answers = yield inquirer.prompt({
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

    const answers = yield inquirer.prompt({
      name: 'type',
      type: 'list',
      message: 'Please select a boilerplate type',
      choices,
    });
    return answers.type;
  }

  * copyGitignore(targetDir) {
    const to = path.join(targetDir, '.gitignore');
    this.log('write to:%s', to);
    fs.writeFileSync(
      to,
      fs.readFileSync(path.join(__filename, '../../files/_.gitignore'))
    );
  }

  /**
   * copy boilerplate to target dir with template scope replace
   * @param {String} targetDir - target dir
   * @param {String} templateDir - template dir
   * @return {Array} file names
   */
  * processFiles(targetDir, templateDir) {
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
          this.log('write to:%s', to);
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
    yield new Promise(resolve => fsEditor.commit(resolve));
    yield this.copyGitignore(targetDir);
    return files;
  }

  /**
   * get argv parser
   * @return {Object} yargs instance
   */
  getParser() {
    return yargs
      .usage(
        'init beidou app from boilerplate.\nUsage: $0 init [dir] --type=simple --tag=next'
      )
      .options(this.getParserOptions())
      .alias('h', 'help')
      .version()
      .help();
  }

  /**
   * get yargs options
   * @return {Object} opts
   */
  getParserOptions() {
    return {
      type: {
        type: 'string',
        description: 'boilerplate type',
      },
      tag: {
        type: 'string',
        description: 'boilerplate tag',
      },
      force: {
        type: 'boolean',
        description: 'force to override directory',
        alias: 'f',
      },
    };
  }

  /**
   * get registryUrl
   * @return {String} registryUrl
   */
  getRegistryByType() {
    return 'https://registry.npmjs.org';
  }

  /**
   * ask for target directory, will check if dir is valid.
   * @return {String} Full path of target directory
   */
  * getTargetDirectory() {
    // const dir = this.argv._[0] || this.argv.dir || '';
    // const dir = '';
    let targetDir = path.resolve(this.cwd, '');
    const force = this.argv.force;

    const validate = (dir) => {
      // create dir if not exist
      if (!fs.existsSync(dir)) {
        mkdirp.sync(dir);
        return true;
      }

      // not a directory
      if (!fs.statSync(dir).isDirectory()) {
        return `${dir} already exists as a file`.red;
      }

      // check if directory empty
      const files = fs.readdirSync(dir).filter(name => name[0] !== '.');
      if (files.length > 0) {
        if (force) {
          this.log(
            `${dir} already exists and will be override due to --force`.red
          );
          return true;
        }
        return `${dir} already exists and not empty, to override please use --force`
          .red;
      }
      return true;
    };

    // if argv dir is invalid, then ask user
    const isValid = validate(targetDir);
    if (isValid !== true) {
      this.log(isValid);
      const answer = yield this.inquirer.prompt({
        name: 'dir',
        message: 'Please enter target dir: ',
        filter: dir => path.resolve(this.cwd, dir),
        validate,
      });
      targetDir = answer.dir;
    }
    this.log(`target dir is ${targetDir}`);
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
  * fetchBoilerplateMapping() {
    const pkgInfo = this.pkgInfo;
    const mapping = pkgInfo.config.boilerplate;
    for (const key of Object.keys(mapping)) {
      const item = mapping[key];
      item.name = item.name || key;
      item.from = pkgInfo;
    }
    return mapping;
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

  /**
   * ownload boilerplate by pkgName then extract it
   * @param {String} pkgName - boilerplate package name
   * @param {String} tag - boilerplate package tag
   * @return {String} extract directory
   */
  * downloadBoilerplate(pkgName, tag = 'latest') {
    const result = yield this.getPackageInfo(pkgName, tag, false);
    if (!result.dist) {
      throw new Error(`boilerplate: ${pkgName}@${tag} not found`);
    }
    const tgzUrl = result.dist.tarball;
    const saveDir = path.join(os.tmpdir(), 'beidou-init-boilerplate');
    this.log(`downloading: ${tgzUrl}`);
    yield this.downloadAndUnzip(tgzUrl, saveDir);
    this.log(`extract to: ${saveDir}`);
    return saveDir;
  }

  /**
   * download tgz and extract
   * @param {String} url - tgzball url
   * @param {String} saveDir - target dir, will rm it first
   * @return {Function} thunk function
   */
  downloadAndUnzip(url, saveDir) {
    return function (callback) {
      rimraf.sync(saveDir);
      function handleError(err) {
        rimraf.sync(saveDir);
        callback(err);
      }

      urllib.request(
        url,
        {
          followRedirect: true,
          streaming: true,
        },
        (err, _, res) => {
          if (err) {
            return callback(err);
          }

          const gunzip = zlib.createGunzip();
          gunzip.on('error', handleError);

          const extracter = tar.Extract({ path: saveDir, strip: 1 });
          extracter.on('error', handleError);
          extracter.on('end', callback);

          res.pipe(gunzip).pipe(extracter);
        }
      );
    };
  }

  /**
   * get package info from registry
   *
   * @param {String} pkgName package name
   * @param {String} tag package tag
   * @param {Boolean} [withFallback] when http request fail, whether to require local
   * @return {Object} pkgInfo
   */
  * getPackageInfo(pkgName, tag, withFallback) {
    try {
      const result = yield urllib.request(
        `${this.registryUrl}/${pkgName}/${tag}`,
        {
          dataType: 'json',
          followRedirect: true,
        }
      );
      return result.data;
    } catch (err) {
      if (withFallback) {
        this.log(`use fallback from ${pkgName}`);
        return require(`${pkgName}/package.json`);
      }
      throw err;
    }
  }

  /**
   * print usage guide
   */
  printUsage() {
    this.log('boilerplate initialization is completed'.green);
    this.log(`${this.toolkitName} start/dev - start server`.green);
    this.log(`${this.toolkitName} build - build assets`.green);
  }

  /**
   * help
   */
  help() {
    return 'init boilerplate';
  }
}

module.exports = InitCommand;
