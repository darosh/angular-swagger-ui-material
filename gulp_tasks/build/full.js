var gulp = require('gulp');

gulp.task('full', ['scripts'], function () {
    var concat = require('gulp-concat');
    var uglifyjs = require('gulp-uglifyjs');
    var ngAnnotate = require('gulp-ng-annotate');

    gulp.src(
        [
            'dist/scripts/swagger-ui-material.js',
            'src/plugins/**/*.js',
            '!src/plugins/**/*.core.js',
            '!src/plugins/**/*.sample.js'
        ])
        .pipe(concat('swagger-ui-material.full.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(ngAnnotate())
        .pipe(uglifyjs('swagger-ui-material.full.min.js'))
        .pipe(gulp.dest('dist/scripts'));
});
