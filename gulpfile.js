// Require Modules
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

// Setup Options
var sassSRC = 'public/resources/css/*.scss';
var cssDEST = 'public/resources/css/';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

// Compile Sass and Autoprefix
gulp.task('styles', function() {
  return gulp
    .src(sassSRC)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(cssDEST));
});

// Watch Task
gulp.task('default', function() {
  gulp.watch('public/resources/css/*.scss', ['styles']);
});