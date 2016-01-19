var eslint           = require('gulp-eslint'),
    gulp             = require('gulp'),
    mocha            = require('gulp-mocha'),
    path             = require('path')

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
      './test/integration/**/*.js',
    ], {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .once('end', function () {
      process.exit()
    })

})

gulp.task('t',      ['mocha'])
