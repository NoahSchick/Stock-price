'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

sass.compiler = require('node-sass');

gulp.task('scss', function() {
      return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', gulp.series('scss', function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch('./scss/**/*.scss', gulp.series('scss'));
    gulp.watch("./*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));
