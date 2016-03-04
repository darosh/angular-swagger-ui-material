var gulp = require('gulp');

gulp.task('format:src', function () {
    var format = require('gulp-clang-format');

    return gulp.src('src/**/*.js')
        .pipe(format.format('file'))
        .pipe(gulp.dest('.formatted/src'));
});

gulp.task('format:gulp', function () {
    var format = require('gulp-clang-format');

    return gulp.src('gulpfile.js')
        .pipe(format.format('file'))
        .pipe(gulp.dest('.formatted'));
});

gulp.task('format:tasks', function () {
    var format = require('gulp-clang-format');

    return gulp.src('gulp_tasks/**/*.js')
        .pipe(format.format('file'))
        .pipe(gulp.dest('.formatted/gulp_tasks'));
});

gulp.task('format', ['format:src', 'format:gulp', 'format:tasks']);
