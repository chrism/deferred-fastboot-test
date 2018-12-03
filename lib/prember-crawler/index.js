/* eslint-env node */
'use strict';

const chokidar = require('chokidar');

module.exports = {
  name: require('./package').name,

  postBuild(result) {
    console.log("postBuild: prember crawler");
  },

  urlsForPrember(distDir, visit) {
    console.log("urlsForPrember: prember crawler");

    const fileAdded = new Promise(resolve => {
      console.log("waiting for assetMap.json");

      chokidar.watch(distDir, {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
        console.log(event, path);
      });
      // return setTimeout(() => {
      //   return resolve();
      // }, 5000);
    });

    // let assetMapFilePath = `${distDir}/assets/assetMap.json`;
    // let assetMapFilePath = `${distDir}/assets/example.json`;

    // let fileExists = fs.existsSync(assetMapFilePath);
    // console.log('does it exist?', fileExists);

    // fs.watchFile(assetMapFilePath, (curr, prev) => {
    //   console.log(`the current mtime is: ${curr.mtime}`);
    //   console.log(`the previous mtime was: ${prev.mtime}`);
    // });

    // checkExistsWithTimeout(assetMapFilePath, 5000).then(result => {
    //   console.log('found file', result);
    //   return ['/'];
    // });

    return fileAdded
    .then(() => {
      return ['/'];
    });
  }
};
