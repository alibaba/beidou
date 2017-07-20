'use strict'; // eslint-disable-line

const path = require('path');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const cwd = process.cwd();

// see this link for more info on what all of this means
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
module.exports = {

  // when adding "js" extension to asset types
  // and then enabling debug mode, it may cause a weird error:
  //
  // [0] npm run start-prod exited with code 1
  // Sending SIGTERM to other processes..
  //
  // development: true,
  debug: false,
  webpack_stats_file_path: path.resolve(__dirname, `${cwd}/.run/isomorphic/stats.json`),
  webpack_assets_file_path: path.resolve(__dirname, `${cwd}/.run/isomorphic/assets.json`),
  assets: {
    style_modules: {
      extensions: ['less', 'scss'],
      filter(module, regex, options) {
        if (options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          // return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
          const cssLoader = module.name.split('!')[0];
          return regex.test(module.name) &&
            // The paths below have the form of "/~/css-loader"
            // and not the form of "./~/css-loader"
            // because in some (non-standard) cases
            // Webpack project context can be set
            // not to project root folder.
            //
            // For a discussion see:
            // https://github.com/halt-hammerzeit/webpack-isomorphic-tools/pull/68
            // (there the `context` is set to the "${project_root}/src" folder
            //  so that the asset paths in `webpack-assets.json` wouldn't
            //  contain the "./src" prefix and therefore they will be found
            //  when require()d from code in "./target"
            //  which is compiled with Babel from the "./src" folder)
            //
            // I personally don't compile sources on the server side,
            // so I haven't thought of better ways of doing all that.
            //
            (cssLoader.indexOf('/~/css-loader') > 0 ||
             cssLoader.indexOf('/~/.npminstall/css-loader') > 0 ||
             cssLoader.indexOf('/~/.store/css-loader') > 0 ||
             // 适配tnpm@4
             /\.\/~\/\.\d*\.\d*\.\d*@css-loader/.test(cssLoader));
        }
        // in production mode there's no webpack "style-loader",
        // so the module.name will be equal to the asset path
        return regex.test(module.name);
      },
      path(module, options, log) {
        if (options.development) {
          // in development mode there's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        }
        // in production mode there's no webpack "style-loader",
        // so the module.name will be equal to the asset path
        return module.name;
      },
      parser(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        }
        // in production mode there's Extract Text Loader which extracts CSS text away
        return module.source;
      },
    },
  },
};
