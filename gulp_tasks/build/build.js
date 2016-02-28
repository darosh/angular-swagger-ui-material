var gulp = require('gulp');

gulp.task('build', ['scripts', 'full', 'markdown', 'sort', 'yaml', 'styles', 'styles:gfm', 'eslint']);
