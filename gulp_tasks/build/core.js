var gulp = require('gulp');

gulp.task('core', function () {
    var ngAnnotate = require('gulp-ng-annotate');
    var angularFilesort = require('gulp-angular-filesort');
    var uglifyjs = require('gulp-uglifyjs');
    var concat = require('gulp-concat');

    return gulp.src(
        [
            'src/directives/**/*.js',
            'src/services/**/*.js',
            'src/sw.ui*/**/*.js',
            'src/plugins/**/*.core.js',
            'src/modules/**/*.js'
        ]
        )
        .pipe(ngAnnotate())
        .pipe(angularFilesort())
        .pipe(concat('swagger-ui-material.core.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(uglifyjs('swagger-ui-material.core.min.js'))
        .pipe(gulp.dest('dist/scripts'));
});
