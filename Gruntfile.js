'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  var serveStatic = require('serve-static');

  var appConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({

    yeoman: appConfig,

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/**/*.js'],
        tasks: ['newer:jshint:src', 'newer:jscs:src'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/**/*.js'],
        tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/styles/**/*.css',
          '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
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
              serveStatic(appConfig.app),
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
              serveStatic('.tmp'),
              serveStatic('test'),
              connect().use(
                '/node_modules',
                serveStatic('./node_modules')
              ),
              serveStatic(appConfig.app)
            ];
          }
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      src: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.js']
      }
    },

    jscs: {
      options: {
        config: './.jscsrc'
      },
      src: {
        files: {
          src: ['<%= yeoman.app %>/scripts/**/*.js']
        }
      },
      test: {
        src: ['test/spec/**/*.js']
      }
    },

    jsonlint: {
      src: 'test/mock/**/*.json'
    },

    clean: {
      server: '.tmp'
    },

    karma: {
      options: {
        singleRun: true
      },
      vanilla: {
        configFile: 'test/karma.vanilla.conf.js'
      },
      mox: {
        configFile: 'test/karma.mox.conf.js'
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
          root: 'test'
        }
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
