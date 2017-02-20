var gulp = require('gulp');
var preprocess = require('gulp-preprocess');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

gulp.task('build', function() {
  gulp.src(['./lib/**/*.*'])
    .pipe(gulp.dest('./dist'));

  gulp.src(['./src/**/*.html', './src/**/*.js', './src/**/*.csv', './src/**/*.css'])
    .pipe(preprocess())
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/**/*.es6')
    .pipe(babel({
      presets: ['es2015', 'react'],
      //plugins: ["transform-es2015-modules-amd", "add-module-exports"]
      plugins: ["add-module-exports", "transform-es2015-modules-amd"]
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
    watch(['./src/**/*.*'],
      batch(function (events, done) {
        gulp.start('build', done);
      })
    );
});

gulp.task('default', function() {
  gulp.start('build');
  gulp.start('watch');
});
