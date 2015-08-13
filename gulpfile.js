// See: https://github.com/gulpjs/gulp/blob/master/docs/recipes/mocha-test-runner-with-gulp.md

var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('default', function() {
  return gulp.src(['test/test-*.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec',
      globals: '*'
/*      globals: {
        should: require('should')
      }*/
    }));
});