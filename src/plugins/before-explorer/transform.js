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

                deferred.resolve();

                return deferred.promise;
            }
        };
    })
    .run(function (swaggerPlugins, transform) {
        swaggerPlugins.add(swaggerPlugins.BEFORE_EXPLORER_LOAD, transform);
    });
