'use strict';

angular.module('swaggerUiMarkdown', ['swaggerUi', 'markdown'])
    .service('markdownToHtml', function ($q, $filter) {
        this.execute = function (parseResult) {
            var deferred = $q.defer();

            if (parseResult.infos && parseResult.infos.description) {
                parseResult.infos.description = $filter('markdown')(parseResult.infos.description);
            }

            angular.forEach(parseResult.resources, function (resource) {
                angular.forEach(resource.operations, function (operation) {
                    operation.description = $filter('markdown')(operation.description);
                });
            });

            deferred.resolve(true);

            return deferred.promise;
        };
    })
    .run(function (swaggerModules, markdownToHtml) {
        swaggerModules.add(swaggerModules.BEFORE_DISPLAY, markdownToHtml);
    });
