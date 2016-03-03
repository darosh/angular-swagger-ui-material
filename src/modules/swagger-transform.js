angular.module('swaggerUiMaterial')
    // Catch default transform invalid JSON parse
    .factory('transform', function ($q, $http) {
        return {
            execute: function (config) {
                var deferred = $q.defer();

                config.transformResponse = function (data, headersGetter, status) {
                    try {
                        return $http.defaults.transformResponse[0](data, headersGetter, status);
                    } catch (ing) {
                        return data;
                    }
                };

                deferred.resolve(true);

                return deferred.promise;
            }
        };
    })
    .run(function (swaggerModules, transform) {
        swaggerModules.add(swaggerModules.BEFORE_EXPLORER_LOAD, transform);
    });
