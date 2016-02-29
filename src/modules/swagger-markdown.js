'use strict';

angular.module('markdown').config(function (markdownProvider) {
    markdownProvider.config({
        simplifiedAutoLink: true,
        tables: true,
        ghCodeBlocks: true,
        tasklists: true
    });
});

angular.module('swaggerUiMarkdown', ['swaggerUi', 'markdown'])
    .service('markdownToHtml', function ($q, $filter) {
        this.execute = function (parseResult) {
            var deferred = $q.defer();

            // TODO: is there any other GFM field to be transformed? Find "GFM" in http://swagger.io/specification/ page

            if (parseResult.infos && parseResult.infos.description) {
                parseResult.infos.description = $filter('markdown')(parseResult.infos.description);
            }

            angular.forEach(parseResult.resources, function (resource) {
                angular.forEach(resource.operations, function (operation) {
                    operation.description = $filter('markdown')(operation.description);

                    angular.forEach(operation.responses, function (response) {
                        response.description = $filter('markdown')(response.description);
                    });
                });
            });

            deferred.resolve(true);

            return deferred.promise;
        };
    })
    .run(function (swaggerModules, markdownToHtml) {
        swaggerModules.add(swaggerModules.BEFORE_DISPLAY, markdownToHtml);
    });
