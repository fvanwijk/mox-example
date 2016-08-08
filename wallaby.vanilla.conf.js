var
  webpackConfig = file => ({ pattern: file, instrument: true, load: false, ignore: false }),
  files = require('./test/testFiles.js')
    .map(function (group) {
      // Replace mox specs with vanilla specs
      if (group.type === 'specs') {
        group.files = ['test/spec/vanilla/**/*.js'];
      }
      return group;
    }),
  wallabyFiles = require('test-runner-config').getWallabyFiles(files, {
    specs: webpackConfig,
    config: webpackConfig
  });

module.exports = function (wallaby) {
  return Object.assign(require('./wallaby.base.conf.js')(wallaby), {
    files: wallabyFiles.files,
    tests: wallabyFiles.tests
  });
};
