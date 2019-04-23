'use strict';
const path = require('path');

module.exports = _ => ({
    view: {
        useHashAsset: true,
        hashAssetPath: path.join(__dirname,'../foo.json')
    },
});
