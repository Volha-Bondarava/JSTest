module.exports = function (grunt) {

  grunt.initConfig({
    run: {
      integration_server: {
        options: {},
        args: [
          'spec/support/jasmine'
        ]
      }
    }
  })
  grunt.loadNpmTasks('grunt-run')

  grunt.registerTask('test', ['run'])
  grunt.registerTask('default', ['run'])
}
