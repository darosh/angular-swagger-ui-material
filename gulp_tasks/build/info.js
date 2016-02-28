var gulp = require('gulp');

gulp.task('info', function () {
    var GENERATE_ARRAY = true;

    var replace = require('gulp-replace');
    var rename = require('gulp-rename');
    var know = require('know-your-http-well');

    var header = {};

    know.headers.forEach(function (i) {
        if (GENERATE_ARRAY) {
            header[i.header.toLowerCase()] = [
                i.header,
                i.description.replace(/^"(.*)"/, '$1'),
                i.spec_title,
                i.spec_href
            ];
        } else {
            header[i.header.toLowerCase()] = {
                header: i.header,
                description: i.description.replace(/^"(.*)"/, '$1'),
                title: i.spec_title,
                url: i.spec_href
            };
        }
    });

    var status = {};

    know.statusCodes.forEach(function (i) {
        if (GENERATE_ARRAY) {
            status[i.code] = [
                i.phrase,
                i.description.replace(/^"(.*)"/, '$1'),
                i.spec_title,
                i.spec_href
            ];
        } else {
            status[i.code] = {
                phrase: i.phrase,
                description: i.description.replace(/^"(.*)"/, '$1'),
                title: i.spec_title,
                url: i.spec_href
            };
        }
    });

    var method = {};
    var swaggerMethods = ['DELETE', 'GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'OPTIONS'];

    know.methods.forEach(function (i) {
        if (swaggerMethods.indexOf(i.method) > -1) {
            if (GENERATE_ARRAY) {
                method[i.method.toLowerCase()] = [
                    i.description.replace(/^"(.*)"/, '$1'),
                    i.spec_title,
                    i.spec_href,
                    i.safe,
                    i.idempotent,
                    i.cacheable
                ];
            } else {
                method[i.method.toLowerCase()] = {
                    description: i.description.replace(/^"(.*)"/, '$1'),
                    title: i.spec_title,
                    url: i.spec_href,
                    safe: i.safe,
                    idempotent: i.idempotent,
                    cacheable: i.cacheable
                };
            }
        }
    });

    function stringify (obj) {
        var space = '        ';

        return JSON.stringify(obj, null, 4)
            .replace(/^/gm, space)
            .replace(space + '{', '{')
            .replace(/^( *)"(([a-zA-Z]+[0-9]*)|([0-9]+))": (.*)(,?)$/gm, '$1$2: $5$6')
            .replace(/^( *)"([^"]+)": (.*)(,?)$/gm, '$1\'$2\': $3$4')
            .replace(/^( *)([^:]+): "(.*)"(,?)$/gm, function (whole, p1, p2, p3, p4) {
                return p1 + p2 + ': \'' + p3.replace(/'/g, '\\\'') + '\'' + p4;
            })
            .replace(/^( *)"(.*)"(,?)$/gm, function (whole, p1, p2, p3) {
                return p1 + '\'' + p2.replace(/'/g, '\\\'') + '\'' + p3;
            });
    }

    return gulp.src('src/scripts/swagger-ui-material-http-info.template')
        .pipe(replace(/(method: ){.*}/, '$1' + stringify(method)))
        .pipe(replace(/(status: ){.*}/, '$1' + stringify(status)))
        .pipe(replace(/(header: ){.*}/, '$1' + stringify(header)))
        .pipe(rename('swagger-ui-material-http-info.js'))
        .pipe(gulp.dest('src/scripts'));
});
