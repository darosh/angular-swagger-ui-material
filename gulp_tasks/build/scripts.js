var gulp = require('gulp');

gulp.task('scripts', ['core', 'templates'], function () {
    var angularFilesort = require('gulp-angular-filesort');
    var concat = require('gulp-concat');
    var uglifyjs = require('gulp-uglifyjs');
    var ngAnnotate = require('gulp-ng-annotate');

    return gulp.src(['dist/scripts/swagger-ui-material.core.js', 'dist/scripts/swagger-ui-material.templates.js'])
        .pipe(angularFilesort())
        .pipe(concat('swagger-ui-material.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(ngAnnotate())
        .pipe(uglifyjs('swagger-ui-material.min.js'))
        .pipe(gulp.dest('dist/scripts'));
});
