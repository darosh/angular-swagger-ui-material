'use strict';

angular.module('swaggerUiSplit', [])
    .service('split', function ($q, $window, swaggerParser) {
        this.execute = function (url, swagger) {
            var deferred = $q.defer();

            // TODO: split will not work for YAML response :-(
            if (swagger && swagger.swagger && !swagger.tags) {
                var tags = {};

                angular.forEach(swagger.paths, function (path, key) {
                    var t = key.replace(/^\/?([^\/]+).*$/g, '$1');
                    tags[t] = true;

                    angular.forEach(path, function (method) {
                        method.tags = [t];
                    });
                });

                swagger.tags = [];

                Object.keys(tags).forEach(function (tag) {
                    swagger.tags.push({name: tag});
                });
            }

            deferred.resolve(false);

            return deferred.promise;
        };
    })
    .run(function (swaggerModules, split) {
        swaggerModules.add(swaggerModules.BEFORE_PARSE, split);
    });
