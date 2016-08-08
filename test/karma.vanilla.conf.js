var files = require('./testFiles.js')
  .map(function (group) {
    // Replace mox specs with vanilla specs
    if (group.type === 'specs') {
      group.files = ['test/spec/vanilla/*.js'];
    }
    return group;
  });

var karmaFiles = require('test-runner-config').getKarmaFiles(files);

module.exports = function (config) {
  require('./karma.base.conf')(config);

  config.set(karmaFiles);

};
