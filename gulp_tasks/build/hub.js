var gulp = require('gulp');

gulp.task('hub', function (done) {
    var fs = require('fs');
    var path = require('path');
    var rainbows = require('../../lib/api-models-rainbows');
    var meta = require('../../lib/api-models-meta');
    var manual = require('../../test/manual/manual.json');

    rainbows.load(function (rs) {
        meta.load(function (ms) {
            var data = {};
            var keys = Object.keys(ms);

            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];

                data[k] = {
                    colors: rs[k],
                    security: ms[k].security,
                    cors: ms[k].cors,
                    operations: ms[k].operations
                };

                if (manual[k] && (manual[k].tested !== undefined)) {
                    data[k].tested = manual[k].tested;
                }

                if (manual[k] && manual[k].local) {
                    data[k].security.push('local');
                }

                // if (manual[k].notes !== undefined) {
                // data[k].notes = manual[k].notes;
                // }
            }

            fs.writeFile(path.join(__dirname, '../../src/hub.json'), JSON.stringify(data), function () {
                done();
            });
        });
    });
});
