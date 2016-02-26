var gulp = require('gulp');

gulp.task('styles:gfm', function () {
    var csso = require('gulp-csso');
    var rename = require('gulp-rename');

    return gulp.src('bower_components/github-markdown-css/github-markdown.css')
        .pipe(csso())
        .pipe(rename('github-markdown.min.css'))
        .pipe(gulp.dest('demo'));
});
