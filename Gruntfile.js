module.exports = function (grunt) {

  grunt.initConfig({
    jasmine: {
      pivotal: {
        src: 'spec/support/jasmine.js',
        options: {
          //specs: 'spec/test/SearchTestSpecPO.js',
        }
      }
    },
    browserify: {
      forJasmine: {
        src: 'spec/support/jasmine.js',
        dest: 'dist/jasmine.browserified.js',
        options: {
          require: ['jasmine']
        }
      }
    },
    concat: {
      'dist/bundle.js': ['dist/jasmine.browserified.js', 'spec/support/jasmine.js']
    }
  })
  grunt.loadNpmTasks('grunt-contrib-jasmine')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-browserify')

  grunt.registerTask('test', ['jasmine'])
  grunt.registerTask('default', ['jasmine', 'browserify', 'concat'])
}
