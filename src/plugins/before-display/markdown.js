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

                if (parseResult.infos && parseResult.infos.description) {
                    parseResult.infos.description = markdown(parseResult.infos.description);
                }

                angular.forEach(parseResult.resources, function (resource) {
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
