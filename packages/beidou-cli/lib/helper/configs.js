'use strict';

const path = require('path');

exports.framework = 'beidou-core';
exports.name = 'beidou-cli';
exports.port = 6001;
exports.cmdName = 'beidou';
exports.root = path.join(__dirname, '../../');
exports.noInitUsageInfo = false;
