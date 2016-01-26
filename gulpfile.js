var chalk                  = require('chalk'),
    clean                  = require('gulp-clean'),
    concat                 = require('gulp-concat'),
    eslint                 = require('gulp-eslint'),
    gulp                   = require('gulp'),
    gutil                  = require('gulp-util'),
    mocha                  = require('gulp-mocha'),
    nodemon                = require('nodemon'),
    path                   = require('path'),
    size                   = require('gulp-size')

gulp.task('lint', function () {

    return gulp.src([
      'models/**/*.js',
      'schemas/**/*.js',
      'test/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())

})

gulp.task('mocha', function() {

  return gulp
    .src([
      './test/helpers/runner.js',
      './test/unit/**/*.js',
      './test/integration/**/*.js',
    ], {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .once('end', function () {
      process.exit()
    })

})

gulp.task('t',      ['mocha'])
