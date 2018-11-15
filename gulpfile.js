const gulp = require('gulp')
const gulp_jasmine = require('gulp-jasmine')
let Jasmine = require('jasmine')
let jasmine = new Jasmine()

gulp.task('default', async function () {
  return gulp.src('../spec/test/SearchTestSpecPO.js')
    .pipe(gulp_jasmine({
      config: jasmine.loadConfigFile('jasmine.js'),
      timeout: 15000,
/*      config: [
        jasmine.loadConfig({
          spec_dir: 'spec',
          spec_files: [
            '../test/SearchTestSpecPO.js'
          ]
        }),
        jasmine.randomizeTests(false)
      ]*/
    }))
})
