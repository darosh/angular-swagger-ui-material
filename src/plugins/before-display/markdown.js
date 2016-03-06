'use strict';

angular.module('swaggerUiMarkdown', ['swaggerUi'])
    .factory('markdownToHtml', function ($q, $window) {
        var showdown = new $window.showdown.Converter({
            simplifiedAutoLink: true,
            tables: true,
            ghCodeBlocks: true,
            tasklists: true
        });

        return {
            execute: function (parseResult) {
                var deferred = $q.defer();

                // TODO: is there any other GFM field to be transformed? Find "GFM" in http://swagger.io/specification/ page

                if (parseResult.info && parseResult.info.description) {
                    parseResult.info.description = markdown(parseResult.info.description);
                }

                angular.forEach(parseResult.resources, function (resource) {
                    resource.description = markdown(resource.description);

                    angular.forEach(resource.operations, function (operation) {
                        operation.description = markdown(operation.description);

                        angular.forEach(operation.responses, function (response) {
                            response.description = markdown(response.description);
                        });
                    });
                });

                deferred.resolve();

                return deferred.promise;
            }
        };

        function markdown (text) {
            return showdown.makeHtml(text || '');
        }
    })
    .run(function (swaggerPlugins, markdownToHtml) {
        swaggerPlugins.add(swaggerPlugins.BEFORE_DISPLAY, markdownToHtml);
    });
