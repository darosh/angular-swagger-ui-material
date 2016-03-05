var gulp = require('gulp');

gulp.task('copy', ['build'], function () {
    return gulp.src(['dist/scripts/swagger-ui-material.full.min.js',
        'dist/styles/swagger-ui-material.min.css',
        'src/hub.*',
        'test/fixtures/examples/*.json',
        'test/fixtures/markdown/*.json']).pipe(gulp.dest('demo'));
});
