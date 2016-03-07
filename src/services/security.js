'use strict';

angular.module('swaggerUiMaterial')
    .factory('security', function ($q, $http, $timeout, $interval, $window, dialog) {
        var storage = $window.sessionStorage;
        var swagger;
        var credentials;
        var config;
        var configPromise = $http({
            method: 'GET',
            url: './auth.json'
        }).then(function (response) {
            config = response.data;
        });

        checkCode();

        return {
            show: show,
            execute: execute,
            setSwagger: setSwagger
        };

        function setSwagger (value) {
            if (!value) {
                swagger = null;
                credentials = null;
            } else {
                swagger = angular.copy(value);
                init();
            }
        }

        function init () {
            var stored = storage.getItem('swaggerUiSecurity:' + swagger.host);
            credentials = stored ? angular.fromJson(stored) : {};

            angular.forEach(swagger.securityDefinitions, function (sec, name) {
                if (sec.type === 'apiKey') {
                    credentials[name] = credentials[name] || '';
                } else if (sec.type === 'basic') {
                    credentials[name] = credentials[name] || {username: '', password: ''};
                } else if (sec.type === 'oauth2') {
                    var scope = getScope(sec.scopes);
                    credentials[name + ':' + scope] = credentials[name + ':' + scope] ||
                        {
                            accessToken: '',
                            tokenType: '',
                            expiresIn: null,
                            expiresFrom: null
                        };
                }
            });
        }

        function execute (options) {
            var deferred = $q.defer();

            angular.forEach(swagger.securityDefinitions, function (sec, name) {
                if (sec.type === 'apiKey') {
                    if (sec.in === 'header') {
                        options.headers[sec.name] = credentials[name].apiKey;
                    } else if (sec.in === 'query') {
                        options.params[sec.name] = credentials[name].apiKey;
                    }
                } else if (sec.type === 'basic') {
                    var username = '...';
                    var password = '...';
                    var auth = $window.btoa(username + ':' + password);
                    options.headers['Authorization'] = 'Basic ' + auth;
                } else if (sec.type === 'oauth2') {
                    var scope = getScope(sec.scopes);

                    if (credentials[name + ':' + scope].accessToken) {
                        options.headers['Authorization'] = credentials[name + ':' + scope].tokenType + ' ' + credentials[name + ':' + scope].accessToken;
                    }
                }
            });

            deferred.resolve();

            return deferred.promise;
        }

        function getScope (secScopes) {
            var scopes = [];

            angular.forEach(secScopes, function (v, k) {
                scopes.push(encodeURIComponent(k));
            });

            return scopes.join('+');
        }

        function show ($event) {
            configPromise.then(
                function () {
                    showInternal($event);
                },
                function () {
                    showInternal($event);
                }
            );
        }

        function showInternal ($event) {
            var locals = {
                security: swagger.securityDefinitions,
                credentials: credentials
            };

            angular.forEach(swagger.securityDefinitions,
                function (sec, name) {
                    if (sec.type === 'apiKey') {
                    } else if (sec.type === 'basic') {
                    } else if (sec.type === 'oauth2') {
                        var scope = getScope(sec.scopes);
                        var clientId = null;
                        var redirectUrl = $window.location.href.replace($window.location.hash, '') + 'index.html';

                        if (config && config[swagger.host] && config[swagger.host][sec.type]) {
                            if (config[swagger.host][sec.type].clientId) {
                                clientId = encodeURIComponent(config[swagger.host][sec.type].clientId);
                            }

                            if (config[swagger.host][sec.type].redirectUrl) {
                                redirectUrl = config[swagger.host][sec.type].redirectUrl;
                            }
                        }

                        sec.link = sec.authorizationUrl.replace(/\\/g, '').replace(/\/\//g, '/') +
                            '?response_type=token' +
                            (clientId ? ('&client_id=' + clientId) : '') +
                            '&scope=' + scope +
                            '&redirect_uri=' + redirectUrl;

                        sec.clicked = function () {
                            storage.setItem('swaggerUiRedirect', $window.location.href);
                            storage.setItem('swaggerUiRedirectHost', swagger.host);
                            storage.setItem('swaggerUiRedirectName', name);
                            storage.setItem('swaggerUiRedirectScope', scope);
                        };

                        sec.scope = getScope(sec.scopes);

                        var c = credentials[name + ':' + scope];

                        if (c.expiresIn) {
                            sec.counter = Math.round((c.expiresFrom + c.expiresIn * 1000 - Date.now()) / 1000) + ' seconds';

                            var promise = $interval(function () {
                                if (!locals.opened) {
                                    $interval.cancel(promise);
                                }

                                sec.counter = Math.round((c.expiresFrom + c.expiresIn * 1000 - Date.now()) / 1000) + ' seconds';
                            }, 1000, c.expiresIn * 1000);
                        }
                    }
                }
            );

            dialog.show($event, locals, 'security');
        }

        function checkCode () {
            // from https://github.com/swagger-api/swagger-ui/blob/master/dist/o2c.html
            var qp;

            if ($window.window.location.hash) {
                qp = $window.location.hash.substring(1).replace(/^\//, '');
            } else {
                qp = $window.location.search.substring(1);
            }

            qp = qp ? angular.fromJson('{"' + qp.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
                function (key, value) {
                    return key === '' ? value : decodeURIComponent(value);
                }
            ) : {};

            var url = storage.getItem('swaggerUiRedirect');
            var host = storage.getItem('swaggerUiRedirectHost');
            var name = storage.getItem('swaggerUiRedirectName');
            var scope = storage.getItem('swaggerUiRedirectScope');

            if (qp['access_token'] && url && host && name) {
                storage.removeItem('swaggerUiRedirect');
                storage.removeItem('swaggerUiRedirectHost');
                storage.removeItem('swaggerUiRedirectName');
                storage.removeItem('swaggerUiRedirectScope');

                var stored = storage.getItem('swaggerUiSecurity:' + host);
                credentials = stored ? angular.fromJson(stored) : {};

                credentials[name + ':' + scope] = {
                    accessToken: qp['access_token'],
                    tokenType: qp['token_type'],
                    expiresIn: parseInt(qp['expires_in']),
                    expiresFrom: Date.now()
                };

                storage.setItem('swaggerUiSecurity:' + host, angular.toJson(credentials));

                $timeout(function () {
                    $window.location.href = url;
                }, 100);
            }
        }
    })
    .run(function (swaggerPlugins, security) {
        swaggerPlugins.add(swaggerPlugins.BEFORE_EXPLORER_LOAD, security);
    });
