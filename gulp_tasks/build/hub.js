var gulp = require('gulp');

gulp.task('hub', function (done) {
    var fs = require('fs');
    var path = require('path');
    var rainbows = require('../../lib/api-models-rainbows');

    rainbows.load(function (data) {
        fs.writeFile(path.join(__dirname, '../../src/hub.json'), JSON.stringify(data), function () {
            done();
        });
    });
});
