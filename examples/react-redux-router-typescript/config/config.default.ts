'use strict';
import * as path from 'path';

module.exports =  () => {
    return {
        keys: 'secret',
        react: {
            assetPath: '/public',
        },

        view: {
            defaultExtension: '.tsx',
        },
        router: {
            entry: 'page',
            exts: ['.tsx']
        },
        isomorphic: {
            babel: false,
        },
        webpack: {
            // your webpack config file
            custom: {
                configPath: path.resolve(__dirname, './webpack.config.ts'),
            },
            resolve: {
                extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
                alias: {
                    client: path.join(__dirname, '../client'),
                },
            },
        },
    }
};
