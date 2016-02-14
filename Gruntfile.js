'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  var serveStatic = require('serve-static');

  var paths = {
    app: 'app',
    tmp: '.tmp',
    dist: 'dist',
    test: 'test'
  };

  grunt.initConfig({
    clean: {
      server: paths.tmp
    },
    connect: {
      options: {
        port: 1337,
        hostname: 'localhost',
        livereload: 35729
      },
      dev: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              serveStatic(paths.app),
              connect().use('/node_modules', serveStatic('./node_modules'))
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              serveStatic(paths.tmp),
              serveStatic(paths.test),
              connect().use(
                '/node_modules',
                serveStatic('./node_modules')
              ),
              serveStatic(paths.app)
            ];
          }
        }
      }
    },
    coverage: {
      dist: {
        options: {
          thresholds: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100
          },
          dir: 'coverage',
          root: paths.test
        }
      }
    },
    jscs: {
      options: {
        config: './.jscsrc',
        reporter: require('jscs-stylish').path
      },
      src: {
        files: {
          src: [paths.app + '/scripts/**/*.js']
        }
      },
      test: {
        src: [paths.test + '/spec/**/*.js']
      },
      config: {
        src: ['{,test/}*.js']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      src: {
        src: paths.app + '/scripts/**/*.js'
      },
      test: {
        options: {
          jshintrc: paths.test + '/.jshintrc'
        },
        src: [paths.test + '/spec/**/*.js']
      },
      config: {
        src: ['{,test/}*.js']
      }
    },
    jsonlint: {
      src: paths.test + '/mock/**/*.json'
    },
    karma: {
      options: {
        singleRun: true
      },
      vanilla: {
        configFile: paths.test + '/karma.vanilla.conf.js'
      },
      mox: {
        configFile: paths.test + '/karma.mox.conf.js'
      }
    },
    watch: {
      js: {
        files: [paths.app + '/scripts/**/*.js'],
        tasks: ['newer:jshint:src', 'newer:jscs:src'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          paths.app + '/**/*.html',
          '.tmp/styles/**/*.css'
        ]
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function () {
    grunt.task.run([
      'clean',
      'connect:dev',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'connect:test',
    'karma:mox',
    'coverage',
    'karma:vanilla',
    'coverage'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'jscs',
    'jsonlint',
    'test'
  ]);
};
