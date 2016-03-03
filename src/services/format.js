/*
 * Orange angular-swagger-ui - v0.3.0
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular.module('swaggerUi')
    .factory('swaggerClient', function () {
        return {
            fullUrl: fullUrl
        };

        function fullUrl (response) {
            var query = '';
            var config = response.config || {};

            if (config.params) {
                var parts = [];
                for (var key in config.params) {
                    parts.push(key + '=' + encodeURIComponent(config.params[key]));
                }
                if (parts.length > 0) {
                    query = '?' + parts.join('&');
                }
            }

            return config.url + query;
        }
    });
