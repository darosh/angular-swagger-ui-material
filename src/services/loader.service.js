/*
 * Orange angular-swagger-ui - v0.3.0
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular.module('swaggerUi')
    .factory('loader', function ($http, swaggerModules) {
        return {
            load: load
        };

        /**
         * Load Swagger descriptor
         */
        function load (url, callback, onError) {
            var options = {
                method: 'GET',
                url: url
            };

            swaggerModules
                .execute(swaggerModules.BEFORE_LOAD, options)
                .then(function () {
                    $http(options)
                        .success(callback)
                        .error(function (data, status) {
                            onError({
                                code: status,
                                message: data
                            });
                        });
                })
                .catch(onError);
        }
    });
