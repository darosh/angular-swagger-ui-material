var gulp = require('gulp');

gulp.task('copy', ['build'], function () {
    return gulp.src(['dist/scripts/swagger-ui-material.full.min.js',
        'dist/styles/swagger-ui-material.min.css',
        'src/*.json',
        'src/auth.html',
        'test/fixtures/examples/*.json',
        'test/fixtures/markdown/*.json']).pipe(gulp.dest('demo'));
});

gulp.task('copy:hub', function () {
    return gulp.src('src/hub/*.*').pipe(gulp.dest('demo/hub'));
});
