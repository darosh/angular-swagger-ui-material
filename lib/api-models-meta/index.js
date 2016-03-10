var APIs = 'https://apis-guru.github.io/api-models/api/v1/list.json';
var DIR = __dirname;
var DATA = DIR + '/api-models-meta.json';
var EXAMPLE = 'https://example.com';
var METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];
var OPTS = {
    headers: {
        origin: EXAMPLE,
        referer: EXAMPLE,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
    }
};

const fs = require('fs');
const async = require('async');
const got = require('./got');
const url = require('url');

module.exports.download = download;
module.exports.load = load;

if (!module.parent) {
    download();
}

function load (done) {
    try {
        done(require(DATA));
    } catch (ign) {
        download(done);
    }
}

function download (done) {
    got(APIs).then(response => {
        var apis = JSON.parse(response.body);
        var data = {};

        async.forEachOfLimit(apis, 32,
            (item, key, callback) => {
                var swaggerUrl = item.versions[item.preferred].swaggerUrl;
                data[key] = {};

                got(swaggerUrl, OPTS).then(response => {
                    var swagger = JSON.parse(response.body);

                    data[key].security = [];

                    if (swagger.securityDefinitions) {
                        var sKeys = Object.keys(swagger.securityDefinitions);

                        if (sKeys.length) {
                            sKeys.forEach(function (sKey) {
                                data[key].security.push(swagger.securityDefinitions[sKey].flow || swagger.securityDefinitions[sKey].type);
                            });
                        }
                    }

                    if (!data[key].security.length) {
                        // TODO: detect local security
                    }

                    data[key].operations = numOperations(swagger);

                    var api = url.format({
                        protocol: swagger.schemes[0] || 'http',
                        host: swagger.host,
                        pathname: swagger.basePath
                    });

                    got(api, OPTS).then(response => {
                        var acal = response.headers['access-control-allow-origin'];
                        data[key].cors = (acal === '*') || (acal === EXAMPLE);
                        console.log(api, response.statusCode, response.statusMessage, data[key]);

                        if (data[key]) {
                            callback();
                        } else if (response.statusCode >= 404) {
                            api = url.format({
                                protocol: swagger.schemes[0] || 'http',
                                host: swagger.host,
                                pathname: swagger.basePath + getPath(swagger)
                            });

                            got(api, OPTS).then(response => {
                                acal = response.headers['access-control-allow-origin'];
                                data[key].cors = (acal === '*') || (acal === EXAMPLE);
                                console.log(api, response.statusCode, response.statusMessage, data[key]);
                                callback();
                            }, error => {
                                console.error(api, 'ERROR', error.statusCode, error.message);
                                callback()
                            });
                        } else {
                            callback();
                        }
                    }, error => {
                        console.error(api, 'ERROR', error.statusCode, error.message);
                        data[key].cors = null;
                        callback();
                    });
                });
            }, () => {
                fs.writeFile(DATA, JSON.stringify(data), function () {
                    if (done) {
                        done(data)
                    }
                });
            })
            .catch(exception => {
                console.error('EXCEPTION', exception);
            });
    });

    function getPath (swagger) {
        var paths = Object.keys(swagger.paths);

        for (var i = 0; i < paths.length; i++) {
            var p = paths[i];

            if (swagger.paths[p]['get']) {
                return p;
            }
        }

        return paths[0];
    }

    function numOperations (swagger) {
        var paths = (swagger.paths || {});
        var count = 0;

        for (var path in paths) {
            METHODS.forEach(function (m) {
                if (paths[path][m]) {
                    count++;
                }
            });
        }

        return count;
    }
}
