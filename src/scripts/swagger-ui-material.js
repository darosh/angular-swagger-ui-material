/*
 * Orange angular-swagger-ui - v0.3.0
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular.module('swaggerUiMaterial',
    [
        'swaggerUi',
        'ngMaterial',
        'ngSanitize',
        'toolbarSearch',
        'toolbarEdit',
        'truncate'
    ])
    // Derived from original swaggerUi directive
    .directive('swaggerUiMaterial', function ($timeout, $window,
                                              swaggerLoader, swaggerClient, swaggerPlugins, swaggerFormat,
                                              theme, style, display, syntax, utils, security) {
        return {
            restrict: 'A',
            templateUrl: 'views/main.html',
            scope: {
                url: '=',
                loading: '=?',
                apiExplorer: '=?',
                errorHandler: '=?',
                trustedSources: '=?',
                theme: '=?',
                parser: '@?',
                validatorUrl: '@?'
            },
            link: function (scope, element, attr) {
                // WARNING: Authentication is not implemented

                // Directive properties
                scope.theme = theme.$configure(scope.theme);
                attr.parser = attr.parser || 'auto';
                attr.validatorUrl = angular.isUndefined(attr.validatorUrl)
                    ? 'http://online.swagger.io/validator' : attr.validatorUrl;

                // Services
                scope.style = style;
                scope.utils = utils;

                // UI
                scope.sidenavOpen = false;
                scope.sidenavLockedOpen = false;
                scope.grouped = true;
                scope.descriptions = false;
                scope.searchOpened = false;
                scope.searchFilter = '';
                scope.searchObject = {httpMethod: '', path: ''};

                scope.ngForm = {explorerForm: {}};
                scope.proxy = security.proxy;

                // Selected operation
                scope.sop = null;

                scope.editUrl = {
                    model: scope.url,
                    changed: editedUrl
                };

                scope.selectOperation = selectOperation;
                scope.open = open;
                scope.toggleApi = toggleApi;
                scope.toggleSidenav = toggleSidenav;
                scope.submit = submit;
                scope.openFile = openFile;

                scope.$watch('url', urlUpdated);
                scope.$watch('searchFilter', searchFilterUpdated);

                scope.showSecurity = showSecurity;
                scope.showProxy = showProxy;

                var swagger;

                function init () {
                    swagger = null;
                    security.setSwagger(null, null);
                    scope.info = {};
                    scope.resources = [];
                    scope.form = {};
                    scope.meta = null;
                }

                /**
                 * Load Swagger descriptor
                 */
                function loadSwagger (url, callback, onError) {
                    scope.loading = true;
                    swaggerLoader.load(url, callback, onError);
                }

                /**
                 * Swagger descriptor has been loaded, launch parsing
                 */
                function swaggerLoaded (swaggerUrl, swaggerType) {
                    scope.loading = false;
                    var parseResult = {};
                    var swaggerCopy = angular.copy(swagger);
                    // execute modules
                    swaggerPlugins
                        .execute(swaggerPlugins.PARSE, scope.parser, swaggerUrl, swaggerType, swaggerCopy, scope.trustedSources, parseResult)
                        .then(function (executed) {
                            if (executed) {
                                swaggerParsed(parseResult);
                                security.setSwagger(swaggerCopy, parseResult);
                            } else {
                                onError({
                                    message: 'no parser found for Swagger descriptor of type ' + swaggerType + ' and version ' + swagger.swagger
                                });
                            }
                        })
                        .catch(onError);
                }

                function urlUpdated (url) {
                    init();

                    if (url) {
                        if (scope.loading) {
                            // TODO cancel current loading swagger
                        }

                        // load Swagger descriptor
                        loadSwagger(url, function (response) {
                            swagger = response.data;
                            // execute modules
                            swaggerPlugins
                                .execute(swaggerPlugins.BEFORE_PARSE, url, swagger)
                                .then(function () {
                                    var contentType = response.headers()['content-type'] || 'application/json';
                                    var swaggerType = contentType.split(';')[0];

                                    swaggerLoaded(url, swaggerType);
                                })
                                .catch(onError);
                        }, onError);
                    }
                }

                function searchFilterUpdated () {
                    if (!scope.searchFilter) {
                        scope.searchObject = {httpMethod: '', path: ''};
                    } else {
                        var t = scope.searchFilter.toLowerCase().trim();
                        var s = t.split(' ');
                        var isMethod = (s.length) === 1 && scope.theme[s[0]];
                        var method = (s.length > 1) ? s[0] : (isMethod ? s[0] : '');
                        var path = (s.length > 1) ? s[1] : (isMethod ? '' : s[0]);

                        scope.searchObject = {httpMethod: method, path: path};
                    }
                }

                function editedUrl () {
                    scope.url = scope.editUrl.model;
                }

                /**
                 * sends a sample API request
                 */
                function submit (operation) {
                    if (!scope.ngForm.explorerForm.$valid) {
                        return;
                    }

                    operation.loading = true;

                    swaggerClient
                        .send(scope.info, operation, scope.form[operation.id])
                        .then(function (response) {
                            clientDone(operation, response);
                        });
                }

                function clientDone (operation, response) {
                    operation.loading = false;
                    operation.explorerResult = response;

                    if (response && response.status) {
                        response.statusString = response.status.toString();
                    }

                    response.fullUrl = swaggerFormat.fullUrl(response);
                    response.body = angular.isObject(response.data) ? angular.toJson(response.data, true) : response.data;

                    response.headerArray = [];

                    if (response && response.headers) {
                        angular.forEach(response.headers(), function (v, k) {
                            response.headerArray.push({
                                name: k,
                                value: v
                            });
                        });

                        response.headerArray.sort(function (a, b) {
                            a.name.localeCompare(b.name);
                        });
                    }

                    var knownStatus = scope.sop.responseArray.find(
                        function (i) {
                            return i.code === response.status.toString();
                        }
                    );

                    knownStatus = knownStatus || (response.statusText ? {description: response.statusText} : {});

                    response.statusArray = [{
                        code: response.status.toString(),
                        description: knownStatus.description || utils.statusInfo(response.status)[0]
                    }];

                    $timeout(function () {
                        operation.tab = 2;
                    }, 50);
                }

                function openFile ($event, isSwagger) {
                    var text;
                    var type;

                    if (isSwagger) {
                        // TODO: fromJson is lazy fix for https://github.com/crucialfelix/supercolliderjs/issues/17
                        var json = angular.toJson(swagger, true);

                        text = (isSwagger === 'swagger.json')
                            ? json : $window.jsyaml.safeDump(angular.fromJson(json));
                        type = (isSwagger === 'swagger.json') ? 'application/json' : 'text/yaml';
                    } else {
                        text = scope.sop.explorerResult.body;
                        type = scope.sop.explorerResult.headers('content-type') || 'text/plain';
                    }

                    // noinspection JSUnresolvedFunction
                    var out = new $window.Blob([text], {type: type});

                    // noinspection JSUnresolvedFunction
                    $event.target.href = $window.URL.createObjectURL(out);
                }

                function toggleSidenav () {
                    scope.sidenavLockedOpen = !scope.sidenavLockedOpen;
                }

                function toggleApi (api, $event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    // Space bar does not stop propagation :-(
                    if (($event.keyCode || $event.which) === 32) {
                        return;
                    }

                    api.open = !api.open;
                }

                function open (open) {
                    angular.forEach(scope.resources, function (api) {
                        api.open = open;
                    });
                }

                function selectOperation (op, $event) {
                    $event.stopPropagation();

                    var opening = !scope.sidenavOpen;
                    scope.sidenavOpen = true;
                    op.tab = op.tab || 0;

                    // fixes tab content width flickering (might be angular-material issue)
                    // and triggers .sum-fade animation
                    scope.omg = !opening;

                    $timeout(function () {
                        scope.sop = op;

                        $timeout(function () {
                            scope.omg = false;
                        }, 15);
                    }, 15);

                    if (op.responseClass && op.responseClass.schema && op.responseClass.schema.obj && !op.responseClass.schema.json) {
                        op.responseClass.schema.json = syntax.json(angular.toJson(op.responseClass.schema.obj, true));
                    }

                    // TODO: this is fixing not selected single "text/html" in produces,
                    // TODO: angular-swagger-ui probably setting this to "application/json" not present in op.produces
                    if ((op.produces.indexOf(scope.form[op.id].responseType)) === -1 && (op.produces.length === 1)) {
                        scope.form[op.id].responseType = op.produces[0];
                    }

                    op.responseArray = [];

                    if (op.responseClass && op.responseClass.status) {
                        op.responseArray.push({
                            code: op.responseClass.status,
                            description: op.responseClass.description || utils.statusInfo(op.responseClass.status)[0]
                        });
                    }

                    angular.forEach(op.responses, function (r, c) {
                        op.responseArray.push({
                            code: c,
                            description: r.description || utils.statusInfo(c)[0]
                        });
                    });

                    op.responseArray.sort(function (a, b) {
                        a.code.toString().localeCompare(b.code.toString());
                    });
                }

                /**
                 * Swagger descriptor has parsed, launch display
                 */
                function swaggerParsed (parseResult) {
                    // execute modules
                    swaggerPlugins
                        .execute(swaggerPlugins.BEFORE_DISPLAY, parseResult)
                        .then(function () {
                            // display swagger UI
                            scope.info = parseResult.info;
                            scope.form = parseResult.form;
                            scope.resources = parseResult.resources;
                            scope.meta = display.meta(scope.info, scope.url, scope.validatorUrl, scope.openFile);
                            scope.security = Object.keys(swagger.securityDefinitions || {}).length;
                        })
                        .catch(onError);
                }

                function onError (error) {
                    scope.loading = false;

                    if (angular.isFunction(scope.errorHandler)) {
                        scope.errorHandler(error);
                    }
                }

                function showSecurity ($event) {
                    security.show($event, swagger);
                }

                function showProxy ($event) {
                    security.showProxy($event, swagger);
                }
            }
        };
    });
