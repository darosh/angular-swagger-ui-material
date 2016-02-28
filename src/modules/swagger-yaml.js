'use strict';

angular.module('swaggerUiYaml', ['swaggerUi'])
    .service('parseYaml', function ($q, $window, swaggerParser) {
        this.execute = function (parserType, url, contentType, data, isTrustedSources, parseResult) {
            var deferred = $q.defer();

            if (contentType === 'text/yaml') {
                swaggerParser.execute('json', url, contentType, $window.jsyaml.load(data), isTrustedSources, parseResult);
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
