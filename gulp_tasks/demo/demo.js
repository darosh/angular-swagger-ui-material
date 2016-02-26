var gulp = require('gulp');

gulp.task('demo', ['copy', 'styles:gfm'], function () {
    var inject = require('gulp-inject');

    function transform () {
        var args = arguments;

        args[0] = args[0].replace('/demo', '.');

        return inject.transform.apply(inject.transform, args);
    }

    return gulp.src('src/index.html')
        .pipe(inject(gulp.src('demo/*.css', {read: false}), {
            transform: transform
        }))
        .pipe(inject(gulp.src(['demo/*.js'], {read: false}), {
            transform: transform
        }))
        .pipe(gulp.dest('demo'));
});
