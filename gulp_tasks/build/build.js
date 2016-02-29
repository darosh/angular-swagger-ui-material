var gulp = require('gulp');

gulp.task('build', ['scripts', 'full', 'markdown', 'sort', 'split', 'yaml', 'styles', 'styles:gfm', 'eslint']);
