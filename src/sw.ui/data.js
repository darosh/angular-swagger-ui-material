'use strict';

angular.module('sw.ui')
    .factory('data', function ($log, $rootScope, $http, plugins) {
        var self = {
            options: {
                url: null,
                validatorUrl: null,
                parser: 'auto',
                trustedSources: false,
                proxy: null,
                errorHandler: null
            },
            ui: {
                grouped: true,
                descriptions: false,
                explorer: true,
                sidenavOpen: false,
                sidenavLocked: false
            },
            model: {
                info: null,
                groups: null,
                operations: null,
                form: null,
                hasSecurity: false,
                securityDefinitions: null,
                search: {},
                sop: null
            },
            swagger: null,
            loading: false,
            setUrl: setUrl
        };

        function reset () {
            self.swagger = null;

            self.model = {
                info: null,
                groups: null,
                form: null,
                security: null,
                securityDefinitions: null
            };

            $log.debug('sw:reset');
            $rootScope.$broadcast('sw:changed');
        }

        function setUrl (url) {
            if (self.options.url === url) {
                return;
            }

            $log.debug('sw:url', url);

            reset();

            self.options.url = url;

            if (!url) {
                return;
            }

            self.loading = true;

            load(url, function (response) {
                if (response.config.url !== self.options.url) {
                    return;
                }

                self.swagger = response.data;
                plugins
                    .execute(plugins.BEFORE_PARSE, url, self.swagger)
                    .then(function () {
                        var type = (response.headers()['content-type'] || 'application/json').split(';')[0];
                        loaded(url, type);
                        self.loading = false;
                    })
                    .catch(onError);
            }, onError);
        }

        function load (url, callback, onError) {
            var options = {
                method: 'GET',
                url: url
            };

            plugins
                .execute(plugins.BEFORE_LOAD, options)
                .then(function () {
                    $http(options).then(callback, onError);
                })
                .catch(onError);
        }

        function loaded (url, type) {
            var parseResult = {};
            var swaggerCopy = angular.copy(self.swagger);

            $log.debug('sw:loaded');

            plugins
                .execute(
                    plugins.PARSE,
                    self.options.parser,
                    url,
                    type,
                    swaggerCopy,
                    self.options.trustedSources,
                    parseResult)
                .then(function (executed) {
                    if (executed) {
                        parsed(parseResult);
                    } else {
                        onError({
                            message: 'no parser found'
                        });
                    }
                })
                .catch(onError);
        }

        function parsed (parseResult) {
            plugins
                .execute(plugins.BEFORE_DISPLAY, parseResult)
                .then(function () {
                    self.model.info = parseResult.info;
                    self.model.form = parseResult.form;
                    self.model.groups = parseResult.resources;
                    self.model.operations = parseResult.info.operations;
                    self.model.securityDefinitions = parseResult.securityDefinitions;
                    self.model.hasSecurity = hasSecurity(self.swagger);

                    $log.debug('sw:parsed');
                    $rootScope.$broadcast('sw:changed');
                })
                .catch(onError);
        }

        function hasSecurity (swagger) {
            return Object.keys(swagger.securityDefinitions || {}).length;
        }

        function onError (error) {
            self.loading = false;

            if (angular.isFunction(self.options.errorHandler)) {
                self.options.errorHandler(error);
            }
        }

        return self;
    })
;
