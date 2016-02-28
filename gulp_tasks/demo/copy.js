var gulp = require('gulp');

gulp.task('copy', ['build'], function () {
    return gulp.src(['dist/scripts/swagger-ui-material.full.min.js',
        'dist/modules/swagger-markdown.min.js',
        'dist/modules/swagger-sort.min.js',
        'dist/modules/swagger-yaml.min.js',
        'dist/styles/swagger-ui-material.min.css',
        'dist/styles/github-markdown.min.css',
        'examples/*.json',
        'bower_components/angular-markdown-filter/markdown.js']).pipe(gulp.dest('demo'));
});
