'use strict';

angular.module('swaggerUiYaml', ['swaggerUi'])
    .factory('loadYaml', function ($q, $window) {
        return {
            execute: function (options) {
                var deferred = $q.defer();

                options.transformResponse = function (data, headersGetter) {
                    if (headersGetter('content-type').indexOf('text/yaml') > -1) {
                        return $window.jsyaml.load(data);
                    } else {
                        return angular.fromJson(data);
                    }
                };

                deferred.resolve(true);

                return deferred.promise;
            }
        };
    })
    .run(function (swaggerModules, loadYaml) {
        swaggerModules.add(swaggerModules.BEFORE_LOAD, loadYaml);
    })
    .factory('parseYaml', function ($q, $window, swaggerParser) {
        return {
            execute: function (parserType, url, contentType, data, isTrustedSources, parseResult) {
                var deferred = $q.defer();

                if (contentType === 'text/yaml') {
                    swaggerParser.execute('json', url, contentType, data, isTrustedSources, parseResult);
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }

                return deferred.promise;
            }
        };
    })
    .run(function (swaggerModules, parseYaml) {
        swaggerModules.add(swaggerModules.PARSE, parseYaml);
    });
