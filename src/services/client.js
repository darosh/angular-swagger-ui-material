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
        /**
         * format API explorer response before display
         */
        function formatResult (deferred, response) {
            var query = '';
            var data = response.data;
            var config = response.config;

            if (config.params) {
                var parts = [];
                for (var key in config.params) {
                    parts.push(key + '=' + encodeURIComponent(config.params[key]));
                }
                if (parts.length > 0) {
                    query = '?' + parts.join('&');
                }
            }
            deferred.resolve({
                url: config.url + query,
                response: {
                    body: data ? (angular.isString(data) ? data : angular.toJson(data, true)) : 'no content',
                    status: response.status,
                    headers: angular.toJson(response.headers(), true)
                }
            });
        }

        return {
            /**
             * Send API explorer request
             */
            send: function (swagger, operation, values) {
                var deferred = $q.defer();
                var query = {};
                var headers = {};
                var path = operation.path;
                var body = null;

                // build request parameters
                for (var i = 0, params = operation.parameters || [], l = params.length; i < l; i++) {
                    // TODO manage 'collectionFormat' (csv etc.) !!
                    var param = params[i];
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
                                if (param.type === 'file') {
                                    values.contentType = undefined; // make browser defining it by himself
                                }
                                body.append(param.name, value);
                            }
                            break;
                        case 'body':
                            body = body || value;
                            break;
                    }
                }

                // add headers
                headers.Accept = values.responseType;
                headers['Content-Type'] = body ? values.contentType : 'text/plain';

                // build request
                var baseUrl = [
                    swagger.schemes[0],
                    '://',
                    swagger.host,
                    swagger.basePath || ''
                ].join('');
                var options = {
                    method: operation.httpMethod,
                    url: baseUrl + path,
                    headers: headers,
                    data: body,
                    params: query
                };
                var callback = function (data, status, headers, config) {
                    // execute modules
                    var response = {
                        data: data,
                        status: status,
                        headers: headers,
                        config: config
                    };
                    swaggerPlugins
                        .execute(swaggerPlugins.AFTER_EXPLORER_LOAD, response)
                        .then(function () {
                            formatResult(deferred, response);
                        });
                };

                // execute modules
                swaggerPlugins
                    .execute(swaggerPlugins.BEFORE_EXPLORER_LOAD, options)
                    .then(function () {
                        // send request
                        $http(options).then(callback, callback);
                    });

                return deferred.promise;
            }
        };
    });
