var gulp = require('gulp');

gulp.task('split', function () {
    var uglifyjs = require('gulp-uglifyjs');
    var ngAnnotate = require('gulp-ng-annotate');

    return gulp.src('src/modules/swagger-split.js')
        .pipe(gulp.dest('dist/modules'))
        .pipe(ngAnnotate())
        .pipe(uglifyjs('swagger-split.min.js'))
        .pipe(gulp.dest('dist/modules'));
});
