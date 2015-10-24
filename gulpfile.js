var gulp = require('gulp'),
    babel = require('gulp-babel'),
    child_process = require('child_process');
 
gulp.task('default', function () {
    return gulp.src('src/*')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});

gulp.task('build', ['default']);

gulp.task('publish', ['build'], function () {
    child_process.execSync('npm version patch');
    child_process.execSync('npm publish');    
});