module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      pivotal: {
        options: {
          specs: [
            '**/**/*[Ss]pecPO.js'
          ]
        }
      }
    }
  })
  grunt.loadNpmTasks('grunt-contrib-jasmine')

  grunt.registerTask('test', ['jasmine'])
  grunt.registerTask('default', ['jasmine'])
}

