module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
        kiosk_scripts: {
          files: {
            'build/js/maya_beautification.min.js': [
              'libs/jquery-1.9.1.min.js',
              'libs/jquery-ui-1.10.2.custom.min.js',
              'libs/jquery.ui.touch-punch.min.js',
              'source/js/translate.js',
              'source/js/camera.js',
              'source/js/beautify.js',
              'source/js/screensaver.js'
            ]
          }
        }
    },
    cssmin: {
      compress: {
        files: {
          'build/css/maya_beautification.min.css': ['source/css/build.css', 'source/css/maya.css', 'libs/jquery-ui-1.10.2.custom.min.css']
        }
      }
    },
    smushit: {
      path: {
        src:['assets']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // CSSMin plugin
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Image optimizer
  grunt.loadNpmTasks('grunt-smushit');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin']);

};
