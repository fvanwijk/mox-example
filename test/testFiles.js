module.exports = [
  {
    type: 'lib',
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-resource/angular-resource.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/lodash/lodash.js',
      'node_modules/jasmine-mox-matchers/src/jasmine-mox-matchers.js',
      'node_modules/angular-mox/dist/mox.js'
    ]
  },
  {
    type: 'config',
    files: [
      'test/testConfig.js',
      'test/moxConfig.js'
    ]
  },
  {
    type: 'mock',
    files: [
      'test/mock/**/*.json'
    ]
  },
  {
    type: 'src',
    files: [
      'app/scripts/**/*.js',
      'app/scripts/**/*.html'
    ]
  },
  {
    type: 'specs',
    files: [
      'test/spec/mox/**/*.js'
    ]
  }
];
