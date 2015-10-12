var
  testFiles = require('./testFiles.js'),
  karmaFiles = require('test-runner-config').getKarmaFiles(testFiles);

module.exports = function (config) {
  require('./karma.base.conf')(config);

  config.set(karmaFiles);
};
