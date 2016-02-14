module.exports = function (config) {
  config.set({
    autoWatch: true,
    basePath: '../',
    frameworks: ['jasmine'],
    port: 8080,
    browsers: ['PhantomJS2'],
    singleRun: false,
    colors: true,
    logLevel: config.LOG_INFO,
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'test/coverage',
      reporters: [
        { type: 'lcov' },
        { type: 'text-summary' },
        { type: 'json' }
      ]
    },
    preprocessors: {
      'app/scripts/**/*.html': 'ng-html2js',
      'app/scripts/**/*.js': 'coverage'
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/'
    }
  });
};
