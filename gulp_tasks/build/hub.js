var gulp = require('gulp');

gulp.task('hub', function (done) {
    var fs = require('fs');
    var path = require('path');
    var rainbows = require('../../lib/api-models-rainbows');
    var meta = require('../../lib/api-models-meta');

    rainbows.load(function (rs) {
        meta.load(function (ms) {
            var data = {};
            var keys = Object.keys(ms);

            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];

                data[k] = {
                    colors: rs[k],
                    security: ms[k].security,
                    cors: ms[k].cors
                };
            }

            fs.writeFile(path.join(__dirname, '../../src/hub.json'), JSON.stringify(data), function () {
                done();
            });
        });
    });
});
