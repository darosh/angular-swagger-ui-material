var gulp = require('gulp');

gulp.task('build', ['scripts', 'full', 'plugins', 'styles', 'styles:gfm', 'eslint']);
