'use strict';

angular.module('swaggerUiYaml', ['swaggerUi'])
    .service('loadYaml', function ($q, $window) {
        this.execute = function (options) {
            var deferred = $q.defer();

            options.transformResponse = function (data, headersGetter) {
                if (headersGetter('content-type').indexOf('text/yaml') > -1) {
                    return $window.jsyaml.load(data);
                } else {
                    return JSON.parse(data);
                }
            };

            deferred.resolve(true);

            return deferred.promise;
        };
    })
    .run(function (swaggerModules, loadYaml) {
        swaggerModules.add(swaggerModules.BEFORE_LOAD, loadYaml);
    })
    .service('parseYaml', function ($q, $window, swaggerParser) {
        this.execute = function (parserType, url, contentType, data, isTrustedSources, parseResult) {
            var deferred = $q.defer();

            if (contentType === 'text/yaml') {
                swaggerParser.execute('json', url, contentType, data, isTrustedSources, parseResult);
                deferred.resolve(true);
            } else {
                deferred.resolve(false);
            }

            return deferred.promise;
        };
    })
    .run(function (swaggerModules, parseYaml) {
        swaggerModules.add(swaggerModules.PARSE, parseYaml);
    });
