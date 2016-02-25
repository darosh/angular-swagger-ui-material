var gulp = require('gulp');

gulp.task('markdown', function () {
    var uglifyjs = require('gulp-uglifyjs');
    var ngAnnotate = require('gulp-ng-annotate');

    return gulp.src('src/modules/swagger-markdown.js')
        .pipe(gulp.dest('dist/modules'))
        .pipe(ngAnnotate())
        .pipe(uglifyjs('swagger-markdown.min.js'))
        .pipe(gulp.dest('dist/modules'));
});
