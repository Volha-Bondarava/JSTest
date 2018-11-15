const gulp = require('gulp')
const gulp_jasmine = require('gulp-jasmine')

gulp.task('default', async function () {
  return await gulp.src('spec/support/jasmine.js')
    .pipe(gulp_jasmine())
})
