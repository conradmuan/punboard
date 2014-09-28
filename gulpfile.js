var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    livereload = require('gulp-livereload');

gulp.task('less', function(){
  gulp.src('./public/less/style.less')
    .pipe(less())
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(livereload());
});

gulp.task('watch', function(){
  console.log('watch it');
  gulp.watch('./public/less/*.less', ['less']);
});

gulp.task('default', ['watch']);