'use strict';

//set app root
global.appRoot = require('path').resolve(__dirname);

//include app js
module.exports = require(appRoot + '/src/app/');