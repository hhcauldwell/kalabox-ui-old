
module.exports = function(grunt) {

  // setup task config
  var config = {
    files: {
      less: {
        src: [
          'src/styles/style.less'
        ]
      }
    },
    // download vendor files via bower
    'bower-install-simple': {
      install: {
        options: {
          directory: 'bower_components'
        }
      },
      ci: {
        options: {
          interactive: false
        }
      }
    },
    // clean up
    clean: {
      init: ['bower_components'],
      build: ['dist']
    },
    // concat js files
    concat: {
      options: {
        separator: ';'
      },
      build: {
        src: [
          'src/js/app.js',
          'src/js/controllers/*.js'
        ],
        dest: 'dist/scripts/kalabox-dashboard.js'
      }
    },
    // copy files to dist
    copy: {
      main: {
        files: [
          // images
          {
            expand: true,
            flatten: true,
            src: ['src/images/*.png'],
            dest: 'dist/images/'
          },
          // index.html
          {
            expand: true,
            flatten: true,
            src: ['src/index.html'],
            dest: 'dist/'
          },
          // styles
          {
            expand: true,
            flatten: true,
            src: ['src/styles/*.css'],
            dest: 'dist/styles/'
          },
          // vendor js
          {
            expand: true,
            flatten: true,
            src: ['bower_components/**/*.js'],
            dest: 'dist/scripts/vendors/'
          },
          // vendor styles
          {
            expand: true,
            flatten: true,
            src: ['bower_components/**/*.css'],
            dest: 'dist/styles/vendors/'
          }
        ]
      }
    },
    // transcompile css
    less: {
      options: {
        paths: ['src/styles'],
        ieCompat: false
      },
      dev: {
        src: '<%= files.less.src %>',
        dest: 'src/styles/style.css'
      },
      dist: {
        options: {
          cleancss: true,
          compress: true
        },
        src: '<%= files.less.src %>',
        dest: 'src/styles/style.css'
      }
    },
    // watch
    watch: {
      options: {
        livereload: false
      },
      // TODO: REMOVE THIS!
      grunt: {
        files: [
          'Gruntfile.js',
        ],
        tasks: ['build']
      },
      less: {
        files: ['src/styles/*.less'],
        tasks: ['less', 'copy']
      },
      html: {
        files: ['src/index.html'],
        tasks: ['copy']
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['concat', 'copy']
      }
    }
  };

  // load task config
  grunt.initConfig(config);

  // load external tasks
  //grunt.loadTasks('tasks');

  // load grunt-* tasks from package.json dependencies
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  // setup workflows

  // init
  grunt.registerTask('init', [
    'clean:init',
    'bower-install-simple:install'
  ]);

  // build
  grunt.registerTask('build', [
    'clean:build',
    'less:dev',
    'concat:build',
    'copy'
  ]);

    // test

    // test:js

    // test:unit

    // test:e2e

    // build

    // version

    // release

}
