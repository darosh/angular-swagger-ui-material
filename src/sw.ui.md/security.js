'use strict';

angular.module('sw.ui.md')
    .factory('security', function ($q, $httpParamSerializer, $http, $timeout, $interval, $window, $rootScope, dialog, data) {
        var storage = $window.sessionStorage;
        var securityDefinitions;
        var credentials;
        var host;
        var config;
        var configPromise = $http({
            method: 'GET',
            url: './auth.json'
        }).then(function (response) {
            config = response.data;
        });

        var deReg = $rootScope.$on('sw:changed', setSwagger);

        $rootScope.$on('$destroy', function () {
            deReg();
        });

        return {
            execute: execute,
            showSecurity: showSecurity,
            showProxy: showProxy
        };

        function setSwagger () {
            if (!data.swagger) {
                host = null;
                securityDefinitions = null;
                credentials = null;
            } else {
                host = data.swagger.host;
                securityDefinitions = data.model.securityDefinitions;
                configPromise.then(init);
            }
        }

        function init () {
            var stored = storage.getItem('swaggerUiSecurity:' + host);
            credentials = stored ? angular.fromJson(stored) : {};
            angular.forEach(securityDefinitions, function (sec, name) {
                if (sec.type === 'apiKey') {
                    credentials[name] = credentials[name] || '';
                } else if (sec.type === 'basic') {
                    credentials[name] = credentials[name] || {username: '', password: ''};
                } else if (sec.type === 'oauth2') {
                    sec.scopeKey = getScopeKey(name, sec);
                    if (config[host] && config[host]['oauth2']) {
                        var cid = config[host]['oauth2'].clientId;
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
            storage.setItem('swaggerUiSecurity:' + host, angular.toJson(credentials));
        }

        function execute (options) {
            var deferred = $q.defer();

            if (data.options.proxy) {
                options.url = data.options.proxy + options.url;
            }

            angular.forEach(securityDefinitions, function (sec, name) {
                if (sec.type === 'apiKey') {
                    if (sec.in === 'header') {
                        options.headers[sec.name] = credentials[name].apiKey;
                    } else if (sec.in === 'query') {
                        options.params[sec.name] = credentials[name].apiKey;
                    }
                } else if (sec.type === 'basic') {
                    var username = credentials[name].username;
                    var password = credentials[name].password;
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

        function showSecurity ($event) {
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
                options: data.options
            }, 'proxy');
        }

        function showInternal ($event) {
            var locals = {
                security: securityDefinitions,
                credentials: credentials,
                singleSecurity: Object.keys(securityDefinitions || {}).length === 1
            };

            var toBeDestroyed = $rootScope.$watch(function () {
                return credentials;
            }, saveCredentials, true);

            angular.forEach(securityDefinitions,
                function (sec) {
                    if (sec.type === 'apiKey') {
                    } else if (sec.type === 'basic') {
                    } else if (sec.type === 'oauth2') {
                        var redirectUrl = $window.location.href.replace($window.location.hash, '') + 'auth.html';
                        sec.friendlyScopes = friendlyScopes(sec);
                        sec.link = '#';

                        counter(sec, locals);

                        // Oauth2 Password Flow
                        sec.clickedPassword = function ($event) {
                            $event.preventDefault();

                            $http({
                                method: 'POST',
                                url: sec.tokenUrl,
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                data: $httpParamSerializer({
                                    username: credentials[sec.scopeKey].username,
                                    password: credentials[sec.scopeKey].password
                                })
                            }).then(function (response) {
                                var qp = response.data;
                                angular.extend(credentials[sec.scopeKey], {
                                    accessToken: qp['access_token'],
                                    tokenType: qp['token_type'],
                                    expiresIn: parseInt(qp['expires_in']),
                                    expiresFrom: Date.now()
                                });
                            });
                        };

                        sec.clicked = function ($event) {
                            $event.preventDefault();
                            var clientId = encodeURIComponent(credentials[sec.scopeKey].clientId || '');

                            sec.link = sec.authorizationUrl +
                                '?response_type=token' +
                                (clientId ? ('&client_id=' + clientId) : '') +
                                '&scope=' + getSelectedScopes(sec) +
                                '&redirect_uri=' + redirectUrl;

                            $window.open(sec.link);

                            $window.onOAuthFinished = function (qp) {
                                // using $timeout as $apply in non-Angular event
                                $timeout(function () {
                                    if (qp.code) {
                                        $http({
                                            method: 'POST',
                                            url: sec.tokenUrl,
                                            headers: {
                                                Accept: 'application/json'
                                            },
                                            params: {
                                                grant_type: 'authorization_code',
                                                code: qp.code,
                                                redirect_url: redirectUrl,
                                                client_id: clientId,
                                                client_secret: config[host]['oauth2'].clientSecret
                                            }
                                        }).then(function (response) {
                                            var qp = response.data;

                                            angular.extend(credentials[sec.scopeKey], {
                                                accessToken: qp['access_token'],
                                                tokenType: qp['token_type'],
                                                expiresIn: parseInt(qp['expires_in']),
                                                expiresFrom: Date.now()
                                            });
                                        });
                                    } else {
                                        angular.extend(credentials[sec.scopeKey], {
                                            accessToken: qp['access_token'],
                                            tokenType: qp['token_type'],
                                            expiresIn: parseInt(qp['expires_in']),
                                            expiresFrom: Date.now()
                                        });
                                    }
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
                console.log('REPLACE', v, k, sec.scopes);
                obj[k] = k.replace(/^.*\/([^\/]+)$/g, '$1') || k;
                console.log('AFTER REPLACE');
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
    .run(function (plugins, security) {
        plugins.add(plugins.BEFORE_EXPLORER_LOAD, security);
    });
