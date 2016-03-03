'use strict';

angular.module('swaggerUiYaml', ['swaggerUi'])
    .factory('loadYaml', function ($q, $window) {
        return {
            execute: function (options) {
                var deferred = $q.defer();

                options.transformResponse = function (data, headersGetter) {
                    if (headersGetter('content-type').indexOf('text/yaml') > -1) {
                        headersGetter()['content-type'] = 'application/json';
                        return $window.jsyaml.load(data);
                    } else {
                        return angular.fromJson(data);
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
