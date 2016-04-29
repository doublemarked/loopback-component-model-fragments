var _ = require('lodash');
var appRoot = require('app-root-path');
var path = require('path');
var fs = require('fs');

var utils = require('./utils');

var COMPONENT_NAME = 'loopback-component-model-fragments';

module.exports = function loopbackComponentModelFragments(app, options, hmm) {
  if (!options.sources) {
    throw new Error(COMPONENT_NAME+': Missing required parameter \'sources\'!');
  }

  var sources = _.isArray(options.sources) ? options.sources : [options.sources];

  var basePath = utils.divineLoopbackServerPath();
  sources = sources.map(function (s) { return path.join(basePath,s); });

  sources.forEach(function (s) {
    if (!fs.existsSync(s)) {
      throw new Error(COMPONENT_NAME + ': Source path does not exist: ' + s);
    }
  });

  Object.keys(app.models).forEach(function (modelName) {
    utils.loadModelFragments(app.models[modelName], sources);
  });

};
