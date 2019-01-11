import * as Egg from 'egg';
import  { EggAppInfo, EggAppConfig, PowerPartial, Context, IHelper }  from 'egg';
import { ReactViewProps } from 'beidou-view-react';

declare global {
  const __CLIENT__: boolean;
}
declare module 'egg' {
  // extend egg app config
  export interface EggAppConfig {
    /**
     * Isomorphic Plugin Config
     */
    isomorphic?: {
      /**
       * [Server Side]
       * set true to enable polyfill in server side
       * this will inject some global variables required.
       * such as __SERVER__, __CLIENT__, __DEV__ and window object.
       */
      polyfill?: boolean;

      /**
       * [Server Side]
       * Babel register config
       */
      babel?: {
        presets?: string[],
        plugins?: string[],
        babelrc?: boolean,
        ignore?: RegExp | string[] | ((filename: string) => boolean);
        only?: RegExp;
        extensions?: string[];
        cache?: boolean;
      } | false,
  
      /**
       * [Server Side]
       * Universal config for non-js resources.
       */
      universal?: {
        /**
         * Full file path of `assets.json`, where universal data saved.
         */
        assetsFilePath?: string;

        /**
         * Extensions of files should be deal in isomorphic-plugin.
         * Such as `.png`, `.less` for url-loader usage or css-modules
         */
        assets?: string[];

        /**
         * Set true to cache the universal data, recommended in production
         */
        cache?: boolean;
      },
  
      /**
       * [Server Side]
       * Module resolve alias in node, similar with resolve.alias in webpack config.
       * this filed should correspend to resolve.alias in webpack.
       */
      alias?: {
        [key: string]: string;
      },
    };

    /**
     * Webpack plugin config
     */
    webpack?: {

      /**
       * Custom config filed, emitted when passed into webpack compile.
       */
      custom?: {
        configPath?: string;
        [key: string]: any;
      },
      mode?: string;
      output?: {
        path?: string;
        filename?: string;
        chunkFilename?: string;
        publicPath?: string;
      },

      resolve?: {
        extensions?: string[];
        alias?: {
          [key: string]: string;
        },
      },

      optimization?: {
        namedModules?: boolean;
        splitChunks?: {
          name?: string;
          chunks?: string;
        },
        noEmitOnErrors?: boolean,
        concatenateModules?: boolean,
      },

      devServer?: {
        /**
         * must be false, we have a static server already, don't need another one.
         */
        contentBase?: false;
        port?: 6002;
        noInfo?: boolean;
        quiet?: boolean;
        clientLogLevel?: 'warning'|'error';
        lazy: boolean;
        watchOptions?: {
          aggregateTimeout?: number;
        };
        headers?: {
          [key: string]: string;
        };
        stats?: {
          colors?: boolean;
          chunks?: boolean;
        };
        publicPath?: string;
        hot?: boolean;
      };
    };

    router?: {
      root?: string;
      urlPrefix?: string;
      exclude?: string;
      mapping?: {
        [key: string]: any;
      },
      entry?: string;
      exts?: string[];
    };

    react?: {
      middlewares?: string[];
      beautify?: boolean;
      cache?: boolean;
      static?: boolean;
      doctype?: string;
      assetHost?: string;
      assetPath?: string;
      placeHolder?: string;
    }
  }
  
  export type ViewProps = ReactViewProps<Context, IHelper>;
}

export = Egg;
