var gulp = require('gulp'),
  concat = require('gulp-concat'),
  pug = require('gulp-pug'),
  stylus = require('gulp-stylus'),
  connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./app/*.js')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./app/*.css')
    .pipe(connect.reload());
});

gulp.task('stylus', function () {
  return gulp.src('./app/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./app/'));
});

gulp.task('pug', function buildHTML() {
  return gulp.src('app/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./app/'))
});

gulp.task('watch', function () {
  gulp.watch(['./app/*.styl'], ['stylus']);
  gulp.watch(['./app/*.pug'], ['pug']);
  gulp.watch(['./app/*.js'], ['js']);
  gulp.watch(['./app/*.css'], ['css']);
  gulp.watch(['./app/*.html'], ['html']);
});

gulp.task('vendor', function() {
  return gulp.src(['./bower_components/threejs/build/three.min.js'])
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('./app/'));
});

gulp.task('default', ['connect', 'pug', 'stylus', 'vendor', 'watch']);
