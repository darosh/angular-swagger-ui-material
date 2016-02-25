'use strict';

angular.module('swaggerUiSort', ['swaggerUi'])
    .service('sortResult', function ($q) {
        this.execute = function (parseResult) {
            var deferred = $q.defer();

            angular.forEach(parseResult.resources, function (resource) {
                resource.operations.sort(function (a, b) {
                    return (a.path.toLowerCase().replace(/[^a-z]+/gi, '') + '-' + a.httpMethod)
                        .localeCompare(b.path.toLowerCase().replace(/[^a-z]+/gi, '') + '-' + b.httpMethod);
                });
            });

            deferred.resolve(true);

            return deferred.promise;
        };
    })
    .run(function (swaggerModules, sortResult) {
        swaggerModules.add(swaggerModules.BEFORE_DISPLAY, sortResult);
    });
