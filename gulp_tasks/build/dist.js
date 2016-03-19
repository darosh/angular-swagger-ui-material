var gulp = require('gulp');

gulp.task('dist', ['scripts', 'full', 'plugins', 'styles'], function () {
    var inject = require('gulp-inject');

    function transform () {
        var args = arguments;

        args[0] = args[0].replace('/dist', '.');

        return inject.transform.apply(inject.transform, args);
    }

    return gulp.src('src/index.html')
        .pipe(inject(gulp.src('dist/styles/swagger-ui-material.min.css', {read: false}), {
            transform: transform
        }))
        .pipe(inject(gulp.src(['dist/scripts/swagger-ui-material.full.min.js'], {read: false}), {
            transform: transform
        }))
        .pipe(gulp.dest('dist'));
});
