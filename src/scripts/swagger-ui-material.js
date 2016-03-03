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
    .directive('swaggerUiMaterial', function ($location, $q, $log, $anchorScroll, $timeout, $window,
                                              loader, swaggerClient, swaggerPlugins,
                                              theme, style, httpInfoUtils) {
        return {
            restrict: 'A',
            templateUrl: 'views/main.html',
            scope: {
                url: '=',
                parser: '@?',
                loading: '=?',
                permalinks: '=?',
                apiExplorer: '=?',
                errorHandler: '=?',
                trustedSources: '=?',
                validatorUrl: '@?',
                theme: '=?'
            },
            link: function (scope) {
                // Directive properties
                scope.theme = theme.$configure(scope.theme);
                scope.parser = scope.parser || 'auto';
                scope.validatorUrl = angular.isUndefined(scope.validatorUrl)
                    ? 'http://online.swagger.io/validator' : scope.validatorUrl;

                // Services
                scope.style = style;
                scope.httpInfoUtils = httpInfoUtils;

                // UI
                scope.sidenavOpen = false;
                scope.sidenavLockedOpen = false;
                scope.grouped = true;
                scope.descriptions = false;
                scope.searchOpened = false;
                scope.searchFilter = '';
                scope.searchObject = {httpMethod: '', path: ''};
                scope.editOpen = false;
                scope.editUrl = scope.url;
                scope.ngForm = {explorerForm: {}};

                // Original properties

                // Selected operation
                scope.sop = null;

                var swagger;

                // WARNING authentication is not implemented, please use 'api-explorer-transform' directive's param to customize API calls

                /**
                 * Load Swagger descriptor
                 */
                function loadSwagger (url, callback, onError) {
                    scope.loading = true;
                    loader.load(url, callback, onError);
                }

                /**
                 * Swagger descriptor has been loaded, launch parsing
                 */
                function swaggerLoaded (swaggerUrl, swaggerType) {
                    scope.loading = false;
                    var parseResult = {};
                    // execute modules
                    swaggerPlugins
                        .execute(swaggerPlugins.PARSE, scope.parser, swaggerUrl, swaggerType, swagger, scope.trustedSources, parseResult)
                        .then(function (executed) {
                            if (executed) {
                                swaggerParsed(parseResult);
                            } else {
                                onError({
                                    code: 415,
                                    message: 'no parser found for Swagger descriptor of type ' + swaggerType + ' and version ' + swagger.swagger
                                });
                            }
                        })
                        .catch(onError);
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
                            scope.infos = parseResult.infos;
                            scope.form = parseResult.form;
                            scope.resources = parseResult.resources;
                            if (scope.permalinks) {
                                $timeout(function () {
                                    $anchorScroll();
                                }, 100);
                            }
                        })
                        .catch(onError);
                }

                function onError (error) {
                    scope.loading = false;
                    if (angular.isFunction(scope.errorHandler)) {
                        scope.errorHandler(error.message, error.code);
                    } else {
                        $log.error(error.code, 'AngularSwaggerUI: ' + error.message);
                    }
                }

                /**
                 * show all resource's operations as list or as expanded list
                 */
                scope.expand = function (resource, expandOperations) {
                    resource.open = true;
                    for (var i = 0, op = resource.operations, l = op.length; i < l; i++) {
                        op[i].open = expandOperations;
                    }
                };

                scope.permalink = function (name) {
                    if (scope.permalinks) {
                        $location.hash(name);
                        $timeout(function () {
                            $anchorScroll();
                        }, 50);
                    }
                };

                scope.selectOperation = function (op, $event) {
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

                    // TODO: this is fixing not selected single "text/html" in produces,
                    // TODO: angular-swagger-ui probably setting this to "application/json" not present in op.produces
                    if ((op.produces.indexOf(scope.form[op.id].responseType)) === -1 && (op.produces.length === 1)) {
                        scope.form[op.id].responseType = op.produces[0];
                    }

                    op.responseArray = [];

                    if (op.responseClass && op.responseClass.status) {
                        op.responseArray.push({
                            code: op.responseClass.status,
                            description: op.responseClass.description
                        });
                    }

                    angular.forEach(op.responses, function (r, c) {
                        op.responseArray.push({
                            code: c,
                            description: r.description
                        });
                    });

                    op.responseArray.sort(function (a, b) {
                        a.code.toString().localeCompare(b.code.toString());
                    });
                };

                // Expand/Collapse
                scope.open = function (open) {
                    angular.forEach(scope.resources, function (api) {
                        api.open = open;
                    });
                };

                scope.toggleApi = function (api, $event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    // Space bar does not stop propagation :-(
                    if (($event.keyCode || $event.which) === 32) {
                        return;
                    }

                    api.open = !api.open;
                };

                scope.toggleSidenav = function () {
                    scope.sidenavLockedOpen = !scope.sidenavLockedOpen;
                };

                /**
                 * sends a sample API request
                 */
                scope.submit = function (operation) {
                    if (scope.ngForm.explorerForm.$valid) {
                        // Commented for tab UI: operation.explorerResult = false;
                        operation.loading = true;

                        // TODO: this is replacing original scope.submitExplorer call,
                        // we need the send promise and the var swagger is inaccessible

                        var swagger = {
                            schemes: [scope.infos.scheme],
                            host: scope.infos.host,
                            basePath: scope.infos.basePath
                        };

                        swaggerClient
                            .send(swagger, operation, scope.form[operation.id])
                            .then(function (result) {
                                operation.loading = false;
                                operation.explorerResult = result;

                                if (result.response && result.response.status) {
                                    result.response.statusString = result.response.status.toString();
                                }

                                result.response.headerArray = [];

                                // TODO: result.response.headers is String object
                                if (result.response && result.response.headers) {
                                    result.response.headers = angular.fromJson(result.response.headers);

                                    for (var k in result.response.headers) {
                                        result.response.headerArray.push({
                                            name: k,
                                            value: result.response.headers[k]
                                        });
                                    }

                                    result.response.headerArray.sort(function (a, b) {
                                        a.name.localeCompare(b.name);
                                    });
                                }

                                // TODO: model with no content should be null or undefined
                                if (scope.sop.explorerResult.response.body === 'no content') {
                                    scope.sop.explorerResult.response.body = null;
                                }

                                var knownStatus = scope.sop.responseArray.find(
                                        function (i) {
                                            return i.code === scope.sop.explorerResult.response.status.toString();
                                        }
                                    ) || {};

                                scope.sop.explorerResult.response.statusArray = [{
                                    code: scope.sop.explorerResult.response.status.toString(),
                                    description: knownStatus.description || scope.getCodeInfo(scope.sop.explorerResult.response.status)[0]
                                }];

                                $timeout(function () {
                                    operation.tab = 1;
                                }, 50);
                            });
                    }
                };

                scope.openFile = function ($event) {
                    var text = scope.sop.explorerResult.response.body;
                    var type = scope.sop.explorerResult.response.headers['content-type'] || 'text/plain';
                    var out = new $window.Blob([text], {type: type});

                    $event.target.href = $window.URL.createObjectURL(out);
                };

                scope.$watch('url', function (url) {
                    // reset
                    scope.infos = {};
                    scope.resources = [];
                    scope.form = {};
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
                });

                scope.$watch('searchFilter', function () {
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
                });

                scope.$watch('editOpen', function () {
                    if (!scope.editOpen) {
                        scope.url = scope.editUrl;
                    }
                });

                scope.$watch('infos', function () {
                    if (!scope.infos || !Object.keys(scope.infos).length) {
                        scope.metas = [];

                        return;
                    }

                    var i = scope.infos;
                    i.contact = i.contact || {};
                    i.license = i.license || {};

                    scope.metas = [
                        ['Contact', 'person', (i.contact.name && !i.contact.email) ? i.contact.name : null, null],
                        ['Email', 'email', i.contact.email ? (i.contact.name || i.contact.email) : null, 'mailto:' + i.contact.email + '?subject=' + i.title],
                        ['License', 'vpn_key', i.license.name || i.license.url, i.license.url],
                        ['Terms of service', 'work', i.termsOfService, i.termsOfService],
                        ['Host', 'home', i.scheme + '://' + i.host, i.scheme + '://' + i.host],
                        ['Base URL', 'link', i.basePath, (i.sheme ? (i.sheme + '://') : '') + i.host + i.basePath],
                        ['API version', 'developer_board', i.version, null],
                        ['Download', 'file_download', 'swagger.json', scope.url],
                        [null, 'code', ((scope.validatorUrl !== 'false') && scope.url) ? (scope.validatorUrl + '/debug?url=' + scope.url) : null, scope.validatorUrl + '?url=' + scope.url]
                    ];
                });
            }
        };
    });
