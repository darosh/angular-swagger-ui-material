/*
 * Orange angular-swagger-ui - v0.3.0
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular
    .module('sw.ui')
    .factory('client', function ($q, $window, $http, $httpParamSerializer, $log, plugins) {
        // var reqCnt = 1;

        return {
            configure: configure,
            send: send,
            base: base
        };

        /**
         * Send API explorer request
         */
        function send (swagger, operation, values, mock) {
            var deferred = $q.defer();
            var baseUrl = base(swagger);
            var options = configure(operation, values, baseUrl);

            function done (response) {
                if ($window.performance) {
                    var items = $window.performance.getEntriesByType('resource');

                    response.timing = timing(items[items.length - 1]);

                    $log.debug('sw:measure', items[items.length - 1], response.timing);
                }

                // execute modules
                plugins
                    .execute(plugins.AFTER_EXPLORER_LOAD, response)
                    .then(function () {
                        deferred.resolve(response);
                    });
            }

            function time (e, s) {
                if (s && e) {
                    return e - s;
                } else {
                    return false;
                }
            }

            function timing (timing) {
                return [
                    ['redirect', time(timing.redirectEnd, timing.redirectStart)],
                    ['dns', time(timing.domainLookupEnd, timing.domainLookupStart)],
                    ['connect', time(timing.connectEnd, timing.connectStart)],
                    ['request', time(timing.responseStart, timing.requestStart)],
                    ['response', time(timing.responseEnd, timing.responseStart)],
                    ['fetch', time(timing.responseEnd, timing.fetchStart)]
                ];
            }

            // execute modules
            plugins
                .execute(plugins.BEFORE_EXPLORER_LOAD, options)
                .then(function () {
                    if (mock) {
                        deferred.resolve(options);
                    } else {
                        checkMixedContent(options).then(function () {
                            // send request
                            // $window.performance.mark('mark_start_xhr');
                            $http(options).then(done, done);
                        }, done);
                    }
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
                        if (values.contentType === 'application/x-www-form-urlencoded') {
                            body = body || {};
                            if (value) {
                                body[param.name] = value;
                            }
                        } else {
                            body = body || new $window.FormData();
                            if (value) {
                                // make browser defining it by himself
                                values.contentType = (param.type === 'file') ? undefined : values.contentType;
                                body.append(param.name, value);
                            }
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

            if (values.contentType === 'application/x-www-form-urlencoded') {
                body = $httpParamSerializer(body);
            }

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
                (swaggerInfo.basePath === '/' ? '' : swaggerInfo.basePath) || ''
            ].join('');
        }

        function protocol (url) {
            return angular.element('<a href="' + url + '"></a>')[0].protocol.replace(':');
        }

        function checkMixedContent (options) {
            var deferred = $q.defer();

            if ((protocol($window.location.href) === 'https') && (protocol(options.url) === 'http')) {
                deferred.reject({config: options, status: -1, statusText: 'HTTPS mixed with HTTP content'});
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        }
    });
