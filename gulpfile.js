'use strict';

var gulp = require('gulp'),
    clean = require('gulp-rimraf'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
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

gulp.task('lint', function () {
    return gulp.src('./app/js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('js', ['lint'], function() {
    return gulp.src('./app/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('images', function() {
    return gulp.src('./app/img/*.jpg')
        .pipe(gulp.dest('./public/img'))
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

gulp.task('lib-flight', function() {
    return gulp.src('./bower_components/flight/lib/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/flight/lib'));
});

gulp.task('build', ['less', 'js', 'images', 'lib', 'lib-flight']);

gulp.task('watch', function() {
    gulp.watch('./app/less/*.less', ['less']);
    gulp.watch('./app/js/**/*.js', ['js']);
});

gulp.task('default', ['build', 'watch']);