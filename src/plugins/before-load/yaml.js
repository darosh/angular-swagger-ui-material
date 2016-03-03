'use strict';

angular.module('swaggerUiYaml', ['swaggerUi'])
    .factory('loadYaml', function ($q, $window) {
        return {
            execute: function (options) {
                var deferred = $q.defer();

                options.transformResponse = function (data, headersGetter) {

                    try {
                        return angular.fromJson(data);
                    } catch (ign) {
                        try {
                            var obj = $window.jsyaml.safeLoad(data);

                            headersGetter()['content-type'] = 'application/json';

                            return obj;

                        } catch (ign) {
                            return data;
                        }
                    }
                };

                deferred.resolve();

                return deferred.promise;
            }
        };
    })
    .run(function (swaggerPlugins, loadYaml) {
        swaggerPlugins.add(swaggerPlugins.BEFORE_LOAD, loadYaml);
    });
