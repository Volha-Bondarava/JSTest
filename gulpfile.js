const gulp = require('gulp')
const jasmine = require('gulp-jasmine')

gulp.task('default', async function () {
  return gulp.src('spec/test/*[Ss]pecPO.js')
    .pipe(jasmine())
})
  