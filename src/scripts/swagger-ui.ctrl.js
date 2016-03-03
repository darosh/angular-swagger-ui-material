/*
 * Orange angular-swagger-ui - v0.3.0
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular
    .module('swaggerUi')
    .controller('swaggerUiController', function ($scope, $location, $q, $log, $anchorScroll, $timeout, loader, swaggerClient, swaggerModules) {

        var swagger;

        // WARNING authentication is not implemented, please use 'api-explorer-transform' directive's param to customize API calls

        /**
         * Load Swagger descriptor
         */
        function loadSwagger (url, callback, onError) {
            $scope.loading = true;
            loader.load(url, callback, onError);
        }

        /**
         * Swagger descriptor has been loaded, launch parsing
         */
        function swaggerLoaded (swaggerUrl, swaggerType) {
            $scope.loading = false;
            var parseResult = {};
            // execute modules
            $scope.parser = $scope.parser || 'auto';
            swaggerModules
                .execute(swaggerModules.PARSE, $scope.parser, swaggerUrl, swaggerType, swagger, $scope.trustedSources, parseResult)
                .then(function (executed) {
                    if (executed) {
                        swaggerParsed(parseResult);
                    } else {
                        onError({
                            code: 415,
                            message: 'no parser found for Swagger descriptor of type ' + swaggerType + ' and version ' + swagger.swagger
                        });
                    }
                })
                .catch(onError);
        }

        /**
         * Swagger descriptor has parsed, launch display
         */
        function swaggerParsed (parseResult) {
            // execute modules
            swaggerModules
                .execute(swaggerModules.BEFORE_DISPLAY, parseResult)
                .then(function () {
                    // display swagger UI
                    $scope.infos = parseResult.infos;
                    $scope.form = parseResult.form;
                    $scope.resources = parseResult.resources;
                    if ($scope.permalinks) {
                        $timeout(function () {
                            $anchorScroll();
                        }, 100);
                    }
                })
                .catch(onError);
        }

        function onError (error) {
            $scope.loading = false;
            if (angular.isFunction($scope.errorHandler)) {
                $scope.errorHandler(error.message, error.code);
            } else {
                $log.error(error.code, 'AngularSwaggerUI: ' + error.message);
            }
        }

        $scope.$watch('url', function (url) {
            //reset
            $scope.infos = {};
            $scope.resources = [];
            $scope.form = {};
            if (url && url !== '') {
                if ($scope.loading) {
                    //TODO cancel current loading swagger
                }
                // load Swagger descriptor
                loadSwagger(url, function (data, status, headers) {
                    swagger = data;
                    // execute modules
                    swaggerModules
                        .execute(swaggerModules.BEFORE_PARSE, url, swagger)
                        .then(function () {
                            var contentType = headers()['content-type'] || 'application/json',
                                swaggerType = contentType.split(';')[0];

                            swaggerLoaded(url, swaggerType);
                        })
                        .catch(onError);
                }, onError);
            }
        });

        /**
         * show all resource's operations as list or as expanded list
         */
        $scope.expand = function (resource, expandOperations) {
            resource.open = true;
            for (var i = 0, op = resource.operations, l = op.length; i < l; i++) {
                op[i].open = expandOperations;
            }
        };

        $scope.permalink = function (name) {
            if ($scope.permalinks) {
                $location.hash(name);
                $timeout(function () {
                    $anchorScroll();
                }, 50);
            }
        };

        /**
         * sends a sample API request
         */
        $scope.submitExplorer = function (operation) {
            operation.loading = true;
            swaggerClient
                .send(swagger, operation, $scope.form[operation.id])
                .then(function (result) {
                    operation.loading = false;
                    operation.explorerResult = result;
                });
        };

    });
