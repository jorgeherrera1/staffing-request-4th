'use strict';

var gulp = require('gulp'),
    clean = require('gulp-rimraf'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('clean', function() {
    return gulp.src('./public', { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('less', function() {
    return gulp.src('./app/less/app.less')
        .pipe(less({ cleancss: true }))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('js', function() {
    return gulp.src('./app/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('lib', function() {
    return gulp.src([
        './bower_components/jquery/dist/jquery.js',
        './bower_components/bootstrap/dist/js/bootstrap.js',
        './bower_components/requirejs/require.js'])
        .pipe(uglify())
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./public/js'));
});