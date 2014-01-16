module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      watch: {
        js: {
          files: ['/js/**'],
          tasks: ['jshint'],
          options: {
            livereload: true,
          },
        },
        html: {
          files: ['templates/**/'],
          options: {
            livereload: true,
          },
        },
        css: {
          files: ['css/**'],
          options: {
            livereload: true
          }
        }
      },
      jshint: {
        all: ['gruntfile.js', '/js/**/*.js']
            // all: ['gruntfile.js', '/js/**/*.js', 'test/mocha/**/*.js', 'test/karma/**/*.js', 'app/**/*.js']
          },
          nodemon: {
            dev: {
              options: {
                file: 'server.js',
                args: [],
                ignoredFiles: ['README.md', '.DS_Store'],
                    // ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['js'],
                    debug: true,
                    delayTime: 1,
                    env: {
                      PORT: 3000
                    },
                    cwd: __dirname
                  }
                }
              },
              concurrent: {
                tasks: ['nodemon', 'watch'],
                options: {
                  logConcurrentOutput: true
                }
              },
              jasmine: {
                src: 'js/*.js',
                options: {
                  specs: 'test/jasmine/*.js'
                },
              },
              env: {
                test: {
                  NODE_ENV: 'test'
                }
              }
              /* karma: {
                unit: {
                  configFile: 'test/karma/karma.conf.js'
                }
              } */
            });

    //Load NPM tasks 
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'concurrent']);

    //Test task.
    grunt.registerTask('test', ['env:test', 'jasmine']);
    // grunt.registerTask('test', ['env:test', 'jasmine', 'karma:unit']);
  };