const karmaFiles = require('test-runner-config').getKarmaFiles(require('./testFiles.js'));

module.exports = function (config) {
  require('./karma.base.conf')(config);

  config.set(karmaFiles);
};
