var gulp = require('gulp');

gulp.task('eslint', function () {
    var eslint = require('gulp-eslint');

    return gulp.src(['src/**/*.js', 'gulpfile.js', 'gulp_tasks/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
