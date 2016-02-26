var gulp = require('gulp');

gulp.task('gfm', function (done) {
    var fs = require('fs');
    var path = require('path');
    var minimal = require('../../examples/swagger-minimal.json');

    fs.readFile(path.join(__dirname, '../../node_modules/github-flavored-markdown-test/README.md'), 'utf8', function (err, data) {
        if (err) {
            done(err);
            return;
        }

        minimal.info.title = 'GiHub Flavored Markdown Test';
        minimal.info.description = data;

        fs.writeFile(path.join(__dirname, '../../examples/swagger-gfm.json'), JSON.stringify(minimal, null, 2), done);
    });
});
