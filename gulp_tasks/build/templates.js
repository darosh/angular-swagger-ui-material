var gulp = require('gulp');

gulp.task('templates', function () {
    var angularTemplatecache = require('gulp-angular-templatecache');
    var htmlmin = require('gulp-htmlmin');
    var rename = require('gulp-rename');
    var uglifyjs = require('gulp-uglifyjs');
    var ngAnnotate = require('gulp-ng-annotate');

    return gulp.src(['src/**/*.html', '!src/index.html'])
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            keepClosingSlash: true,
            caseSensitive: true
        }))
        .pipe(angularTemplatecache({
            root: null,
            module: 'swaggerUiMaterial'
        }))
        .pipe(rename('swagger-ui-material.templates.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(ngAnnotate())
        .pipe(uglifyjs('swagger-ui-material.templates.min.js'))
        .pipe(gulp.dest('dist/scripts'));
});
