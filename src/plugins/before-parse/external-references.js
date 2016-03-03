/*
 * Orange angular-swagger-ui - v0.3.0
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular
    .module('swaggerUi')
    .factory('swaggerUiExternalReferences', function ($http, $q, $window, swaggerPlugins) {
        var deferred;

        return {
            /**
             * Module entry point
             */
            execute: function (url, swagger) {
                deferred = $q.defer();
                loadExternalReferences(url, swagger);

                return deferred.promise;
            }
        };

        function onError (error) {
            deferred.reject(error);
        }

        /**
         * Load external definition
         */
        function getUrl (externalUrl, callback) {
            var options = {
                method: 'GET',
                url: externalUrl
            };

            swaggerPlugins
                .execute(swaggerPlugins.BEFORE_LOAD, options)
                .then(function () {
                    $http(options).then(callback, onError);
                })
                .catch(onError);
        }

        /**
         * Generate external URL
         */
        function getExternalUrl (baseUrl, $ref) {
            var parts = $ref.split('#/');
            var externalUrl = parts[0];

            if (externalUrl.indexOf('http') !== 0 && externalUrl.indexOf('https') !== 0) {
                // relative url
                if (externalUrl.indexOf('/') === 0) {
                    var swaggerUrlParts = $window.URL.parse(baseUrl);
                    externalUrl = swaggerUrlParts.protocol + '//' + swaggerUrlParts.host + externalUrl;
                } else {
                    var pos = baseUrl.lastIndexOf('/');
                    externalUrl = baseUrl.substring(0, pos) + '/' + externalUrl;
                }
            }
            return externalUrl;
        }

        /**
         * Find and resolve external definitions
         */
        function loadExternalReferences (baseUrl, swagger) {
            var loading = 0;

            function load (url, obj) {
                loading++;

                getUrl(url, function (json) {
                    loading--;

                    var subPath = obj.$ref.split('#/')[1];
                    var subJson = subPath ? json[subPath] : json;

                    angular.extend(obj, subJson);

                    delete obj.$ref;

                    if (loading === 0) {
                        deferred.resolve(true);
                    }
                });
            }

            function iterate (obj) {
                angular.forEach(obj, function (v, k) {
                    if (k === '$ref') {
                        var externalUrl = getExternalUrl(baseUrl, v);

                        if (externalUrl) {
                            load(externalUrl, obj);
                        }
                    } else if (angular.isObject(v) || angular.isArray(v)) {
                        iterate(v);
                    }
                });
            }

            iterate(swagger);
        }
    })
    .run(function (swaggerPlugins, swaggerUiExternalReferences) {
        swaggerPlugins.add(swaggerPlugins.BEFORE_PARSE, swaggerUiExternalReferences);
    });
