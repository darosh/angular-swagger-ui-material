var gulp = require('gulp');

gulp.task('deploy', ['demo'], function () {
    var ghPages = require('gulp-gh-pages');

    return gulp.src('demo/**/*')
        .pipe(ghPages());
});
