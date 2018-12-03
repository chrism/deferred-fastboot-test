/* eslint-env node */
'use strict';

module.exports = {
  name: require('./package').name,

  postBuild(build) {
    console.log("postBuild: asset map generator");
  }
};
