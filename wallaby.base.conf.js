var wallabyWebpack = require('wallaby-webpack');
var webpackPostprocessor = wallabyWebpack({});

module.exports = function (wallaby) {
  return {
    basePath: '../',
    //debug: true,
    testFramework: 'jasmine',
    delays: {
      edit: 500
    },
    compilers: {
      'test/spec/**/*.js': wallaby.compilers.babel()
    },
    preprocessors: {
      'app/scripts/**/*.html': function html2js(file) {
        return require('wallaby-ng-html2js-preprocessor').transform(file, {
          stripPrefix: 'app/'
        });
      }
    },
    postprocessor: webpackPostprocessor,
    bootstrap: function () {
      window.__moduleBundler.loadTests();
    },
    env: {
      runner: require('phantomjs2-ext').path,
        params: {
        runner: '--web-security=false'
      }
    }
  }
};
