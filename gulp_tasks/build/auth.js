var gulp = require('gulp');

gulp.task('auth', function () {
    return gulp.src(['src/auth.html', 'src/auth.json'])
        .pipe(gulp.dest('dist'));
});
