var gulp = require('gulp');

gulp.task('plugins', function () {
    var uglify = require('gulp-uglify');
    var ngAnnotate = require('gulp-ng-annotate');
    var rename = require('gulp-rename');

    return gulp.src(['src/plugins/**/*.js', '!src/plugins/parse/*.js'])
        .pipe(gulp.dest('dist/plugins'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/plugins'));
});
