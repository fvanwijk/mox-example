var
  files = require('./test/testFiles.js')
    .map(function (group) {
      if (group.type === 'specs') {
        group.files = ['test/spec/vanilla/**/*.js'];
      }
      return group;
    }),
  wallabyFiles = require('test-runner-config').getWallabyFiles(files),
  config = require('./wallaby.base.conf.js');

config.files = wallabyFiles.files;
config.tests = wallabyFiles.tests;

module.exports = function () {
  return config;
};
