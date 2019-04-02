'use strict';

const path = require('path');

exports.webpack = {
  custom: {
    depth: 2,
  },
  output: {
    path: path.join(__dirname, '../output'),
  },
};

exports.view = {
  useHashAsset:true,
  hashAssetPath:path.join(__dirname,'../foo.json')
}