#!/usr/bin/env node
var pkg = require(`${process.cwd()}/package.json`);
var fs = require('fs');
var path = require('path');

// check if package.json exists
fs.exists(`${process.cwd()}/package.json`, function(dir) {
  if (!dir) throw 'Cannot find ./package.json file';
  // check if node_modules exists
  fs.exists(`${process.cwd()}/node_modules`, function(dir) {
    if (!dir) throw 'Cannot find ./node_modules/ directory';
    // check if dependencies exist
    if (pkg.dependencies) {
      var pkgDependencies = Object.getOwnPropertyNames(pkg.dependencies);
      // loop over dependencies
      pkgDependencies.forEach(function(prop) {
        // find the version and set it in the pkg variable
        var version = JSON.parse(fs.readFileSync(`${process.cwd()}/node_modules/${prop}/package.json`).toString()).version;
        pkg['dependencies'][prop] = version;
      });
    }
    // check if devDependencies exists
    if (pkg.devDependencies) {
      var pkgDevDependencies = Object.getOwnPropertyNames(pkg.devDependencies);
      // loop over dev dependencies
      pkgDevDependencies.forEach(function(prop) {
        // find the version and set it in the pkg variable      
        var version = JSON.parse(fs.readFileSync(`${process.cwd()}/node_modules/${prop}/package.json`).toString()).version;
        pkg['devDependencies'][prop] = version;
      });
    }
    // write the pkg variable out to package.json
    fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(pkg, null, 2) , 'utf-8');
  });
});
