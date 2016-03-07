'use strict';

angular.module('swaggerUiMaterial')
    .factory('security', function ($q, $http, $timeout, $interval, $window, $rootScope, dialog) {
        var storage = $window.sessionStorage;
        var swagger;
        var parsed;
        var credentials;
        var config;
        var configPromise = $http({
            method: 'GET',
            url: './auth.json'
        }).then(function (response) {
            config = response.data;
        });
        var proxy = {
            url: ''
        };

        return {
            show: show,
            showProxy: showProxy,
            execute: execute,
            setSwagger: setSwagger
        };

        function setSwagger (value, parsedValue) {
            if (!value) {
                swagger = null;
                parsed = null;
                credentials = null;
            } else {
                swagger = angular.copy(value);
                parsed = parsedValue;
                init();
            }
        }

        function init () {
            var stored = storage.getItem('swaggerUiSecurity:' + swagger.host);
            credentials = stored ? angular.fromJson(stored) : {};

            angular.forEach(parsed.securityDefinitions, function (sec, name) {
                if (sec.type === 'apiKey') {
                    credentials[name] = credentials[name] || '';
                } else if (sec.type === 'basic') {
                    credentials[name] = credentials[name] || {username: '', password: ''};
                } else if (sec.type === 'oauth2') {
                    sec.scopeKey = getScopeKey(name, sec);

                    if (config[swagger.host] && config[swagger.host]['oauth2']) {
                        var cid = config[swagger.host]['oauth2'].clientId;
                    }

                    credentials[sec.scopeKey] = credentials[sec.scopeKey] ||
                        {
                            clientId: cid || '',
                            accessToken: '',
                            tokenType: '',
                            expiresIn: null,
                            expiresFrom: null,
                            scopes: initScopes(sec)
                        };
                }
            });
        }

        function saveCredentials () {
            storage.setItem('swaggerUiSecurity:' + swagger.host, angular.toJson(credentials));
        }

        function execute (options) {
            var deferred = $q.defer();

            if (proxy.url) {
                options.url = proxy.url + options.url;
            }

            angular.forEach(parsed.securityDefinitions, function (sec, name) {
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
                    var c = credentials[sec.scopeKey];

                    if (c.accessToken) {
                        var a = [];

                        if (c.tokenType) {
                            a.push(c.tokenType);
                        }

                        a.push(c.accessToken);

                        options.headers['Authorization'] = a.join(' ');
                    }
                }
            });

            deferred.resolve();

            return deferred.promise;
        }

        function getScopeKey (name, sec) {
            var scopes = [];

            angular.forEach(sec.scopes, function (v, k) {
                scopes.push(k);
            });

            return name + ':' + hashCode(scopes.join(' '));
        }

        function initScopes (sec) {
            var obj = {};

            angular.forEach(sec.scopes, function (v, k) {
                obj[k] = true;
            });

            return obj;
        }

        function getSelectedScopes (sec) {
            var s = [];

            angular.forEach(credentials[sec.scopeKey].scopes, function (v, k) {
                if (v) {
                    s.push(k);
                }
            });

            return s.join('+');
        }

        // from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
        function hashCode (text) {
            var hash = 0;

            if (text.length === 0) {
                return hash;
            }

            for (var i = 0; i < text.length; i++) {
                var character = text.charCodeAt(i);

                hash = ((hash << 5) - hash) + character;
                hash = (hash & hash) + 0x80000000;
            }

            return hash.toString(16);
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

        function showProxy ($event) {
            dialog.show($event, {
                proxy: proxy
            }, 'proxy');
        }

        function showInternal ($event) {
            var locals = {
                security: parsed.securityDefinitions,
                credentials: credentials
            };

            var toBeDestroyed = $rootScope.$watch(function () {
                return credentials;
            }, saveCredentials, true);

            angular.forEach(parsed.securityDefinitions,
                function (sec) {
                    if (sec.type === 'apiKey') {
                    } else if (sec.type === 'basic') {
                    } else if (sec.type === 'oauth2') {
                        var redirectUrl = $window.location.href.replace($window.location.hash, '') + 'auth.html';
                        sec.friendlyScopes = friendlyScopes(sec);
                        sec.link = '#';

                        counter(sec, locals);

                        sec.clicked = function ($event) {
                            $event.preventDefault();
                            var clientId = encodeURIComponent(credentials[sec.scopeKey].clientId || '');

                            sec.link = sec.authorizationUrl.replace(/\\/g, '').replace(/\/\//g, '/') +
                                '?response_type=token' +
                                (clientId ? ('&client_id=' + clientId) : '') +
                                '&scope=' + getSelectedScopes(sec) +
                                '&redirect_uri=' + redirectUrl;

                            $window.open(sec.link);

                            $window.onOAuthFinished = function (qp) {
                                $timeout(function () {
                                    angular.extend(credentials[sec.scopeKey], {
                                        accessToken: qp['access_token'],
                                        tokenType: qp['token_type'],
                                        expiresIn: parseInt(qp['expires_in']),
                                        expiresFrom: Date.now()
                                    });
                                });
                            };
                        };
                    }
                }
            );

            dialog.show($event, locals, 'security').then(function () {
                toBeDestroyed();
            });
        }

        function friendlyScopes (sec) {
            var obj = {};

            angular.forEach(sec.scopes, function (v, k) {
                obj[k] = k.replace(/^.*\/([^\/]+)$/g, '$1') || k;
            });

            return obj;
        }

        function counter (sec, locals) {
            var c = credentials[sec.scopeKey];

            if (c.expiresIn) {
                sec.counter = Math.round((c.expiresFrom + c.expiresIn * 1000 - Date.now()) / 1000) + ' seconds';
            }

            var promise = $interval(function () {
                if (!locals.opened) {
                    $interval.cancel(promise);
                }

                if (c.expiresIn) {
                    sec.counter = Math.round((c.expiresFrom + c.expiresIn * 1000 - Date.now()) / 1000) + ' seconds';
                }
            }, 1000);
        }
    })
    .run(function (swaggerPlugins, security) {
        swaggerPlugins.add(swaggerPlugins.BEFORE_EXPLORER_LOAD, security);
    });
