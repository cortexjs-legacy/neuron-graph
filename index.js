'use strict';

module.exports = graph;

var jf = require('jsonfile');
var path = require('path');
var fs = require('fs');
var shrinkwrap = require('cortex-shrinkwrap');
var graph = require('gen-graph');

function graph(pkg, options, callback ) {
  options || (options = {});
  (options.dependencyKeys) || (options.dependencyKeys = ['dependencies', 'asyncDependencies']);

  (function (done) {
    if (options.shrinkwrap) {
      return done(null, options.shrinkwrap);
    }

    read_shrinkwrap(pkg, options, function (err, tree) {
      if (err) {
        return done(err);
      }
      
      done(null, tree);
    });
  })(function (err, shrinkwrap) {
    if (err) {
      return callback(err);
    }

    var keys = options.dependencyKeys;
    var rs = graph(shrinkwrap, {
      edge_keys : keys
    });

    callback(null, rs, shrinkwrap);
  });
}


function read_shrinkwrap (pkg, options, callback) {
  var shrinkwrap_json = path.join(options.cwd, 'cortex-shrinkwrap.json');

  var keys = options.dependencyKeys;
  var shrink_options = {
    stableOnly: options.stable_only || true,
    async: ~keys.indexOf('asyncDependencies'),
    dev: ~keys.indexOf('devDependencies')
  };

  if (options.ignore_shrink_file) {
    return shrinkwrap(pkg, options.built_root, shrink_options, callback);
  }

  fs.exists(shrinkwrap_json, function(exists) {
    if (exists) {
      return jf.readFile(shrinkwrap_json, callback);
    }

    shrinkwrap(pkg, options.built_root, shrink_options, callback);
  });
};
