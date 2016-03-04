var gulp = require('gulp');

gulp.task('copy', ['build'], function () {
    return gulp.src(['dist/scripts/swagger-ui-material.full.min.js',
        'dist/styles/swagger-ui-material.min.css',
        'test/fixtures/examples/*.json']).pipe(gulp.dest('demo'));
});
