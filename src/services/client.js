/*
 * Orange angular-swagger-ui - v0.3.0
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular
    .module('swaggerUi')
    .factory('swaggerClient', function ($q, $window, $http, swaggerPlugins) {
        return {
            configure: configure,
            send: send,
            base: base
        };

        /**
         * Send API explorer request
         */
        function send (swagger, operation, values) {
            var deferred = $q.defer();
            var baseUrl = base(swagger);
            var options = configure(operation, values, baseUrl);

            function done (response) {
                // execute modules
                swaggerPlugins
                    .execute(swaggerPlugins.AFTER_EXPLORER_LOAD, response)
                    .then(function () {
                        deferred.resolve(response);
                    });
            }

            // execute modules
            swaggerPlugins
                .execute(swaggerPlugins.BEFORE_EXPLORER_LOAD, options)
                .then(function () {
                    // send request
                    $http(options).then(done, done);
                });

            return deferred.promise;
        }

        function configure (operation, values, baseUrl) {
            var path = operation.path;
            var query = {};
            var headers = {};
            var body = null;

            // build request parameters
            angular.forEach(operation.parameters, function (param) {
                // TODO manage 'collectionFormat' (csv etc.) !!
                var value = values[param.name];

                switch (param.in) {
                    case 'query':
                        if (value) {
                            query[param.name] = value;
                        }
                        break;
                    case 'path':
                        path = path.replace('{' + param.name + '}', encodeURIComponent(value));
                        break;
                    case 'header':
                        if (value) {
                            headers[param.name] = value;
                        }
                        break;
                    case 'formData':
                        body = body || new $window.FormData();
                        if (value) {
                            // make browser defining it by himself
                            values.contentType = (param.type === 'file') ? undefined : values.contentType;
                            body.append(param.name, value);
                        }
                        break;
                    case 'body':
                        body = body || value;
                        break;
                }
            });

            // add headers
            headers.accept = values.responseType;
            headers['content-type'] = body ? values.contentType : 'text/plain';

            return {
                method: operation.httpMethod,
                url: baseUrl + path,
                headers: headers,
                data: body,
                params: query
            };
        }

        function base (swaggerInfo) {
            return [
                swaggerInfo.scheme,
                '://',
                swaggerInfo.host,
                swaggerInfo.basePath || ''
            ].join('');
        }
    });
