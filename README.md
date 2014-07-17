# neuron-graph [![NPM version](https://badge.fury.io/js/neuron-graph.svg)](http://badge.fury.io/js/neuron-graph) [![Build Status](https://travis-ci.org/cortexjs/neuron-graph.svg?branch=master)](https://travis-ci.org/cortexjs/neuron-graph) [![Dependency Status](https://gemnasium.com/cortexjs/neuron-graph.svg)](https://gemnasium.com/cortexjs/neuron-graph)

Generate neuron config graph from package/shrinkwrap.

## Install

```bash
$ npm install neuron-graph --save
```

## Usage

```js
var graph = require('neuron-graph');
graph(pkg, {
   shrinkwrap: shrinkwrap_object_if_already_have_one,
   dependencyKeys: ['dependencies', 'asyncDependencies']
}, function(err, g) {

});
```

## Options

### shrinkwrap

Shrinkwrap object

### dependencyKeys

Dependencies will parse during the processing. Default is ['dependencies', 'asyncDependencies']

### stable_only

Pass to cortex-shrinkwrap

### ignore_shrink_file

Always regenerate shrinkwrap object even `cortex-shrinkwrap.json` exists.

## Licence

MIT
<!-- do not want to make nodeinit to complicated, you can edit this whenever you want. -->
