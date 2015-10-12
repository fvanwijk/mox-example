var
  testFiles = require('./test/testFiles.js'),
  wallabyFiles = require('test-runner-config').getWallabyFiles(testFiles),
  config = require('./wallaby.base.conf.js');

config.files = wallabyFiles.files;
config.tests = wallabyFiles.tests;

module.exports = function () {
  return config;
};
