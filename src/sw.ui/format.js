/*
 * Orange angular-swagger-ui - v0.3.0
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular.module('sw.ui')
    .factory('format', function () {
        return {
            fullUrl: fullUrl
        };

        function fullUrl (response) {
            var query = '';
            var config = response.config || {};

            if (config.params) {
                var parts = [];

                angular.forEach(config.params, function (v, k) {
                    parts.push(k + '=' + encodeURIComponent(v));
                });

                if (parts.length > 0) {
                    query = '?' + parts.join('&');
                }
            }

            return config.url + query;
        }
    });
