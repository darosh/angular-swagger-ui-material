var gulp = require('gulp');

gulp.task('graph', function () {
    var ngGraph = require('gulp-angular-architecture-graph');

    return gulp.src('src/**/*.js')
        .pipe(ngGraph({
            dest: '.architecture'
        }));
});
