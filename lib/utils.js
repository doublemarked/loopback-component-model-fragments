var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var appRoot = require('app-root-path');
var requireAll = require('require-all');

module.exports = {
  /* Unfortunately Loopback does not give us a clean way of determining the
   * path in which component-config.json exists, making it difficult for us
   * to work with relative paths from that file.
   * The approach below has flaws, but it will work for the typical
   * Loopback app, including any app created with the slc generator.
   */
  divineLoopbackServerPath: function divineLoopbackServerPath() {
    var package = appRoot.require('/package.json');
    return path.dirname(appRoot.resolve(package.main));
  },

  loadModelFragments: function loadModelFragments(ModelType, sources) {
    var modelPath = _.kebabCase(ModelType.modelName);

    // Load any fragments of this model from any of the source paths
    sources.forEach(function (s) {
      module.exports.loadModelFragmentPath(ModelType, path.join(s, modelPath));
    });
  },

  loadModelFragmentPath: function loadModelFragment(ModelType, fragmentPath) {
    try {
      return requireAll({
        dirname: fragmentPath,
        resolve: function (fragment) {
          if (_.isFunction(fragment)) {
            return fragment(ModelType);
          }

          return fragment;
        }
      });
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    return null;
  }
};
