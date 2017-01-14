let reporters = ['progress'];

module.exports = function (config) {
  reporters.push('coverage');
  if (config.coverage || process.env.COVERAGE) {
  }

  config.set({
    autoWatch: true,
    basePath: '../',
    frameworks: ['jasmine'],
    preprocessors: {
      'app/scripts/**/*.html': 'ng-html2js',
      'test/testConfig.js': ['webpack'],
      'test/spec/**/*.js': ['webpack']
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/'
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-webpack'), // This is used (instead of karma-babel-preprocessor) to make sure that commonJS modules can be loaded
      require('karma-phantomjs2-launcher'),
      require('karma-coverage'),
      require('karma-sourcemap-loader'),
      require('karma-ng-html2js-preprocessor')
    ],
    webpack: {
      module: {
        preLoaders: [
          {
            test: /\.js$/,
            //include: /scripts/,
            loader: 'isparta'
          }
        ],
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel' // 'babel-loader' is also a legal name to reference
          }/*,
          {
            test: /\.js$/,
            include: /app\/scripts/,
            loader: 'isparta'
          }*/
        ]
      },
      devtool: 'inline-source-map'
    },
    reporters: reporters,
    coverageReporter: {
      dir: 'test/coverage',
      subdir: '.',
      reporters: [
        { type: 'lcov' },
        { type: 'text-summary' },
        { type: 'json' }
      ]
    },
    port: 8080,
    browsers: ['PhantomJS2'],
    singleRun: true,
    colors: true,
    logLevel: config.LOG_INFO
  });
};
