var gulp = require('gulp');

gulp.task('full', ['scripts'], function () {
    var merge = require('gulp-merge');
    var replace = require('gulp-replace');
    var concat = require('gulp-concat');
    var uglifyjs = require('gulp-uglifyjs');
    var ngAnnotate = require('gulp-ng-annotate');

    var from = /(function\(\$templateCache\))(.|[\r\n])*}/g;
    var to = '$1{}';

    return merge(
        gulp.src('bower_components/angular-swagger-ui/dist/scripts/swagger-ui.js')
            .pipe(replace(from, to)),
        gulp.src('dist/scripts/swagger-ui-material.js')
    )
        .pipe(concat('swagger-ui-material.full.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(ngAnnotate())
        .pipe(uglifyjs('swagger-ui-material.full.min.js'))
        .pipe(gulp.dest('dist/scripts'));
});
