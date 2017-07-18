/**
 * @author Holden <holdenwei@qq.com>
 */
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
const is = require('is-type-of');
const homedir = require('node-homedir');
const groupBy = require('group-object');

require('colors');

module.exports = class Command {
  constructor() {
    this.name = 'beidou-init';
    this.pkgInfo = require('../../package.json');
    this.inquirer = inquirer;
    this.fileMapping = {
      gitignore: '.gitignore',
      _gitignore: '.gitignore',
      '_.gitignore': '.gitignore',
      '_package.json': 'package.json',
      '_.eslintignore': '.eslintignore',
    };
  }

  * run(cwd, args) {
    let processedArgs = args || [];
    const argv = this.argv = this.getParser().parse(processedArgs);
    this.cwd = cwd;

    // console.log('%j', argv);

    // detect registry url
    this.registryUrl = this.getRegistryByType();
    //this.log(`use registry: ${this.registryUrl}`);

    // check update
    yield updater({
      package: this.pkgInfo,
      level: 'major',
    });

    // ask for target dir
    this.targetDir = yield this.getTargetDirectory();

    // use local template
    let templateDir = yield this.getTemplateDir();
    if (!templateDir) {
      // list boilerplate
      const boilerplateMapping = yield this.fetchBoilerplateMapping();
      // ask for boilerplate
      let boilerplate;
      if (argv.type && boilerplateMapping.hasOwnProperty(argv.type)) {
        boilerplate = boilerplateMapping[argv.type];
      } else {
        boilerplate = yield this.askForBoilerplateType(boilerplateMapping);
      }
      this.log(`use boilerplate: ${boilerplate.name}(${boilerplate.package})`);
      // download boilerplate
      templateDir = yield this.downloadBoilerplate(boilerplate.package);
    }

    // copy template
    yield this.processFiles(this.targetDir, templateDir);
    // done
    this.printUsage(this.targetDir);
  }

  /**
   * show boilerplate list and let user choose one
   *
   * @param {Object} mapping - boilerplate config mapping, `{ simple: { "name": "admin", "package": "@ali/beidou-example-admin", "description": "基于淘宝登录的后台管理应用" } }`
   * @return {Object} boilerplate config item
   */
  * askForBoilerplateType(mapping) {
    // group by category
    const groupMapping = groupBy(mapping, (acc, value) => value.category || 'other');
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
    const choices = Object.keys(group).map(key => {
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

  /**
   * ask user to provide variables which is defined at boilerplate
   * @param {String} targetDir - target dir
   * @param {String} templateDir - template dir
   * @return {Object} variable scope
   */
  * askForVariable(targetDir, templateDir) {
    let questions;
    try {
      questions = require(templateDir);
      // support function
      if (is.function(questions)) {
        questions = questions(this);
      }
      // use target dir name as `name` default
      if (questions.name && !questions.name.default) {
        questions.name.default = path.basename(targetDir).replace(/^beidou-/, '');
      }
    } catch (err) {
      if (err.code !== 'MODULE_NOT_FOUND') {
        this.log(`load boilerplate config got trouble, skip and use defaults, ${err.message}`.yellow);
      }
      return {};
    }

    this.log('collecting boilerplate config...');
    const keys = Object.keys(questions);
    if (this.argv.silent) {
      const result = keys.reduce((result, key) => {
          result[key] = questions[key].default || '';
      return result;
    }, {});
      this.log('use default due to --silent, %j', result);
      return result;
    } else {
      return yield inquirer.prompt(keys.map(key => {
          const question = questions[key];
      return {
        type: 'input',
        name: key,
        message: question.description || question.desc,
        default: question.default,
      };
    }));
    }
  }

  /**
   * copy boilerplate to target dir with template scope replace
   * @param {String} targetDir - target dir
   * @param {String} templateDir - template dir, must contain a folder which named `boilerplate`
   * @return {Array} file names
   */
  * processFiles(targetDir, templateDir) {
    //const src = path.join(templateDir, 'boilerplate');
    const src = path.join(templateDir);
    const locals = yield this.askForVariable(targetDir, templateDir);
    const fsEditor = editor.create(memFs.create());
    const files = glob.sync('**/*', { cwd: src, dot: true, nodir: true });
    files.forEach(file => {
      const from = path.join(src, file);
    const to = path.join(targetDir, this.replaceTemplate(this.fileMapping[file] || file, locals));
    fsEditor.copy(from, to, {
        process: content => {
        this.log('写入 %s', to);
    return this.replaceTemplate(content, locals);
  },
  });
  });

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
    return files;
  }

  /**
   * get argv parser
   * @return {Object} yargs instance
   */
  getParser() {
    return yargs
      .usage('Init beidou app from boilerplate.\nUsage: $0 init [dir] --type=simple')
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
      dir: {
        type: 'string',
        description: 'target directory',
      },
      force: {
        type: 'boolean',
        description: 'force to override directory',
        alias: 'f',
      },
      template: {
        type: 'string',
        description: 'local path to boilerplate',
      },
      registry: {
        type: 'string',
        description: 'npm registry, support china/npm/custom, default to auto detect',
        alias: 'r',
      },
      silent: {
        type: 'boolean',
        description: 'don\'t ask, just use default value',
      },
    };
  }

  /**
   * get registryUrl by short name
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
    const dir = this.argv._[0] || this.argv.dir || '';
    let targetDir = path.resolve(this.cwd, dir);
    const force = this.argv.force;

    const validate = dir => {
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
          this.log(`${dir} already exists and will be override due to --force`.red);
          return true;
        }
        return `${dir} already exists and not empty: ${JSON.stringify(files)}`.red;
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
          default: dir || '.',
          filter: dir => path.resolve(this.cwd, dir),
        validate,
    });
      targetDir = answer.dir;
    }
    //this.log(`target dir is ${targetDir}`);
    return targetDir;
  }

  /**
   * find template dir from support `--template=`
   * @return {String} template files dir
   */
  * getTemplateDir() {
    let templateDir;
    // when use `beidou-init --template=PATH`
    if (this.argv.template) {
      templateDir = path.resolve(this.cwd, this.argv.template);
      if (!fs.existsSync(templateDir)) {
        this.log(`${templateDir} is not exists`.red);
      } else if (!fs.existsSync(path.join(templateDir, 'boilerplate'))) {
        this.log(`${templateDir} should contain boilerplate folder`.red);
      } else {
        this.log(`local template dir is ${templateDir.green}`);
        return templateDir;
      }
    }
  }

  /**
   * fetch boilerplate mapping from `beidou-init-config`
   * @param {String} [pkgName] - config package name
   * @return {Object} boilerplate config mapping, `{ simple: { "name": "admin", "package": "@ali/beidou-example-admin", "description": "基于淘宝登录的后台管理应用" } }`
   */
  * fetchBoilerplateMapping(pkgName) {
    const pkgInfo = this.pkgInfo;
    const mapping = pkgInfo.config.boilerplate;
    Object.keys(mapping).forEach(key => {
      const item = mapping[key];
    item.name = item.name || key;
    item.from = pkgInfo;
  });
    return mapping;
  }

  /**
   * print usage guide
   */
  printUsage() {
    this.log(`Initialization is completed`.green);
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
    return content.toString().replace(/(\\)?{{ *(\w+) *}}/g, (block, skip, key) => {
        if (skip) {
      return block.substring(skip.length);
    }
    return scope.hasOwnProperty(key) ? scope[key] : block;
  });
  }

  /**
   * download boilerplate by pkgName then extract it
   * @param {String} pkgName - boilerplate package name
   * @return {String} extract directory
   */
  * downloadBoilerplate(pkgName) {
    const result = yield this.getPackageInfo(pkgName, false);
    const tgzUrl = result.dist.tarball;
    const saveDir = path.join(os.tmpdir(), 'beidou-init-boilerplate');
    this.log(`downloading ${tgzUrl}`);
    yield this.downloadAndUnzip(tgzUrl, saveDir);
    this.log(`extract to ${saveDir}`);
    return saveDir;
  }

  /**
   * download tgz and extract
   * @param {String} url - tgzball url
   * @param {String} saveDir - target dir, will rm it first
   * @return {Function} thunk function
   */
  downloadAndUnzip(url, saveDir) {
    return function(callback) {
      rimraf.sync(saveDir);
      function handleError(err) {
        rimraf.sync(saveDir);
        callback(err);
      }

      urllib.request(url, {
        followRedirect: true,
        streaming: true,
      }, (err, _, res) => {
        if (err) {
        return callback(err);
      }

      const gunzip = zlib.createGunzip();
      gunzip.on('error', handleError);

      const extracter = tar.Extract({ path: saveDir, strip: 1 });
      extracter.on('error', handleError);
      extracter.on('end', callback);

      res.pipe(gunzip).pipe(extracter);
    });
    };
  }

  /**
   * get package info from registry
   *
   * @param {String} pkgName - package name
   * @param {Boolean} [withFallback] - when http request fail, whethe to require local
   * @return {Object} pkgInfo
   */
  * getPackageInfo(pkgName, withFallback) {
    try {
      const result = yield urllib.request(`${this.registryUrl}/${pkgName}/latest`, {
        dataType: 'json',
          followRedirect: true,
      });
      return result.data;
    } catch (err) {
      if (withFallback) {
        this.log('use fallback from ${pkgName}');
        return require(`${pkgName}/package.json`);
      } else {
        throw err;
      }
    }
  }

  /**
   * log with prefix
   */
  log() {
    const args = Array.prototype.slice.call(arguments);
    args[0] = `[${this.name}] `.blue + args[0];
    console.log.apply(console, args);
  }
};