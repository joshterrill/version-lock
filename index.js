var pkg = require('./package.json');
var fs = require('fs');
var path = require('path');
// check if package.json exists
fs.exists('./package.json', function(dir) {
  if (!dir) throw 'Cannot find ./package.json file';
  // check if node_modules exists
  fs.exists('./node_modules', function(dir) {
    if (!dir) throw 'Cannot find ./node_modules/ directory';
    if (pkg.dependencies) {
      var pkgDependencies = Object.getOwnPropertyNames(pkg.dependencies);
      // loop over dependencies
      pkgDependencies.forEach(function(prop) {
        // find the version and set it in the pkg variable
        var version = JSON.parse(fs.readFileSync(`./node_modules/${prop}/package.json`).toString()).version;
        pkg['dependencies'][prop] = version;
      });
    }

    if (pkg.devDependencies) {
      var pkgDevDependencies = Object.getOwnPropertyNames(pkg.devDependencies);
      // loop over dev dependencies
      pkgDevDependencies.forEach(function(prop) {
        // find the version and set it in the pkg variable      
        var version = JSON.parse(fs.readFileSync(`./node_modules/${prop}/package.json`).toString()).version;
        pkg['devDependencies'][prop] = version;
      });
    }
    
    // write the pkg variable out to package.json
    fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2) , 'utf-8');
  });
});
