module.exports = {
  basePath: '../',
  //debug: true,
  testFramework: 'jasmine',
  delays: {
    edit: 500
  },
  preprocessors: {
    'app/scripts/**/*.html': function html2js(file) {
      return require('wallaby-ng-html2js-preprocessor').transform(file, {
        stripPrefix: 'app/'
      });
    }
  },
  env: {
    runner: require('phantomjs2-ext').path,
    params: {
      runner: '--web-security=false'
    }
  }
};
