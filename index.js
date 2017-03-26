#!/usr/bin/env node
var pkg = require('./package.json'),
    pkgDependencies = Object.getOwnPropertyNames(pkg.dependencies),
    pkgDevDependencies = Object.getOwnPropertyNames(pkg.devDependencies),
    fs = require('fs');

// check if package.json exists
fs.exists('./package.json', function(dir) {
  if (!dir) throw 'Cannot find ./package.json file';
  // check if node_modules exists
  fs.exists('./node_modules', function(dir) {
    if (!dir) throw 'Cannot find ./node_modules/ directory';
    // loop over dependencies
    pkgDependencies.forEach(function(prop) {
      // find the version and set it in the pkg variable
      var version = JSON.parse(fs.readFileSync(`./node_modules/${prop}/package.json`).toString()).version;
      pkg['dependencies'][prop] = version;
    });
    // loop over dev dependencies
    pkgDevDependencies.forEach(function(prop) {
      // find the version and set it in the pkg variable      
      var version = JSON.parse(fs.readFileSync(`./node_modules/${prop}/package.json`).toString()).version;
      pkg['devDependencies'][prop] = version;
    });
    // write the pkg variable out to package.json
    fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2) , 'utf-8');
  });
});
