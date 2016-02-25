var gulp = require('gulp');

gulp.task('sort', function () {
    var uglifyjs = require('gulp-uglifyjs');
    var ngAnnotate = require('gulp-ng-annotate');

    return gulp.src('src/modules/swagger-sort.js')
        .pipe(gulp.dest('dist/modules'))
        .pipe(ngAnnotate())
        .pipe(uglifyjs('swagger-sort.min.js'))
        .pipe(gulp.dest('dist/modules'));
});
