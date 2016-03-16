module.exports = function (config) {
  config.set({
    autoWatch: true,
    basePath: '../',
    frameworks: ['jasmine'],
    preprocessors: {
      'app/scripts/**/*.html': 'ng-html2js',
      'test/spec/**/*.js': ['webpack', 'sourcemap']
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
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel' // 'babel-loader' is also a legal name to reference
          },
          {
            test: /\.js$/,
            include: /src/,
            loader: 'isparta'
          }
        ]
      },
      devtool: 'inline-source-map'
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'test/coverage',
      reporters: [
        { type: 'lcov' },
        { type: 'text-summary' },
        { type: 'json' }
      ]
    },
    port: 8080,
    browsers: ['PhantomJS2'],
    singleRun: false,
    colors: true,
    logLevel: config.LOG_INFO
  });
};
