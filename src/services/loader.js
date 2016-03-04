/*
 * Orange angular-swagger-ui - v0.3.0
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular.module('swaggerUi')
    .factory('swaggerLoader', function ($http, swaggerPlugins) {
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

            swaggerPlugins
                .execute(swaggerPlugins.BEFORE_LOAD, options)
                .then(function () {
                    $http(options).then(callback, onError);
                })
                .catch(onError);
        }
    });
