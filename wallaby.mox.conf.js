var
  webpackConfig = file => ({ pattern: file, instrument: true, load: false, ignore: false }),
  wallabyFiles = require('test-runner-config').getWallabyFiles(require('./test/testFiles.js'), {
    config: webpackConfig,
    specs: webpackConfig
  });

module.exports = function (wallaby) {
  return Object.assign(require('./wallaby.base.conf.js')(wallaby), {
    files: wallabyFiles.files,
    tests: wallabyFiles.tests
  });
};
