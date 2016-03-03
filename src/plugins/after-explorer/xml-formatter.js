/*
 * Orange angular-swagger-ui - v0.3.0
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular
    .module('swaggerUi')
    .factory('swaggerUiXmlFormatter', function ($q) {
        return {
            /**
             * Module entry point
             */
            execute: function (response) {
                var executed = false;
                var deferred = $q.defer();
                var contentType = response.headers && response.headers()['content-type'];

                if (contentType && contentType.toLowerCase().indexOf('/xml') > 0) {
                    response.data = formatXml(response.data);
                    executed = true;
                }
                deferred.resolve(executed);
                return deferred.promise;
            }
        };

        function formatXml (xml) {
            var formatted = '';
            var reg = /(>)(<)(\/*)/g;
            var pad = 0;

            xml = xml.replace(reg, '$1\r\n$2$3');
            angular.forEach(xml.split('\r\n'), function (node) {
                var indent = 0;
                var padding = '';

                if (node.match(/.+<\/\w[^>]*>$/)) {
                    indent = 0;
                } else if (node.match(/^<\/\w/)) {
                    if (pad !== 0) {
                        pad -= 1;
                    }
                } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                    indent = 1;
                } else {
                    indent = 0;
                }

                for (var i = 0; i < pad; i++) {
                    padding += '    ';
                }

                formatted += padding + node + '\r\n';
                pad += indent;
            });

            return formatted;
        }
    })
    .run(function (swaggerPlugins, swaggerUiXmlFormatter) {
        swaggerPlugins.add(swaggerPlugins.AFTER_EXPLORER_LOAD, swaggerUiXmlFormatter);
    });
