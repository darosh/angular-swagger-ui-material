var gulp = require('gulp');

gulp.task('yaml', function () {
    var uglifyjs = require('gulp-uglifyjs');
    var ngAnnotate = require('gulp-ng-annotate');

    return gulp.src('src/modules/swagger-yaml.js')
        .pipe(gulp.dest('dist/modules'))
        .pipe(ngAnnotate())
        .pipe(uglifyjs('swagger-yaml.min.js'))
        .pipe(gulp.dest('dist/modules'));
});
