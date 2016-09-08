var appRoot = require('app-root-path');
var path = require('path');
var fs = require('fs');

var utils = require('./utils');

var COMPONENT_NAME = 'loopback-component-model-fragments';

module.exports = function loopbackComponentModelFragments(app, options) {
  if (!options.sources) {
    throw new Error(COMPONENT_NAME+': Missing required parameter \'sources\'!');
  }

  var sources = Array.isArray(options.sources) ? options.sources : [options.sources];

  var basePath = options.appRootDir || app.get('appRootDir') || utils.divineLoopbackServerPath();
  sources = sources.map(function (s) { return path.join(basePath,s); });

  app.models().forEach( function (Model) {
    utils.loadModelFragments(Model, sources)
  });

};
