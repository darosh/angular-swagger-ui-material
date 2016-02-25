var gulp = require('gulp');

require('require-dir')('./gulp_tasks', {recurse: true});

gulp.task('default', ['build']);
