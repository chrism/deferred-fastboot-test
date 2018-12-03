'use strict';

const chokidar = require('chokidar');

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const urls = async function({ distDir, visit }) {
  const fileAdded = new Promise(resolve => {
    console.log("waiting for assetMap.json");

    chokidar.watch(distDir, {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
      console.log(event, path);
    });
    // return setTimeout(() => {
    //   return resolve();
    // }, 5000);
  });

  return fileAdded
  .then(() => {
    return ['/'];
  });
};

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      enabled: true,
      generateAssetMap: true
    },

    prember: {
      enabled: true,
      urls
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
