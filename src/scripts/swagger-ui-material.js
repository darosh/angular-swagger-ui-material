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
    .directive('swaggerUiMaterial', function ($timeout, $mdDialog, swaggerClient, httpInfo) {
        return {
            restrict: 'A',
            controller: 'swaggerUiController',
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
                swaggerMethods: '='
            },
            link: function (scope, element) {
                if (scope.validatorUrl === undefined) {
                    scope.validatorUrl = 'http://online.swagger.io/validator';
                }

                // "Swager UI Material" === "sum" namespace
                var sum = scope.sum = {};

                // Selected Operation === "sop"
                sum.sop = null;

                sum.selectOperation = function (op, $event) {
                    $event.stopPropagation();
                    sum.sop = op;
                    sum.sidenavOpen = true;
                    sum.sop.tab = sum.sop.tab || 0;

                    // TODO: this is fixing not selected single "text/html" in produces,
                    // TODO: angular-swagger-ui probably setting this to "application/json" not present in op.produces
                    if ((op.produces.indexOf(scope.form[op.id].responseType)) === -1 && (op.produces.length === 1)) {
                        scope.form[op.id].responseType = op.produces[0];
                    }

                    if (sum.sop.responseClass && sum.sop.responseClass.status) {
                        sum.sop.defaultResponse = {};
                        sum.sop.defaultResponse[sum.sop.responseClass.status] = {description: sum.sop.responseClass.description};
                    }
                };

                // Toggle
                sum.descriptions = false;

                // Expand/Collapse
                sum.open = function (open) {
                    angular.forEach(scope.resources, function (api) {
                        api.open = open;
                    });
                };

                sum.toggleApi = function (api, $event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    // Spacebar does not stop propagation :-(
                    if (($event.keyCode || $event.which) === 32) {
                        return;
                    }

                    api.open = !api.open;
                };

                sum.sidenavOpen = false;
                sum.sidenavLockedOpen = false;

                sum.toggleSidenav = function () {
                    sum.sidenavLockedOpen = !sum.sidenavLockedOpen;
                };

                sum.explorerForm = {};

                sum.submit = function (operation) {
                    if (sum.explorerForm.$valid) {
                        //operation.explorerResult = false;
                        operation.loading = true;

                        // TODO: this is replacing original scope.submitExplorer call,
                        // we need the send promise and the var swagger is inaccesible

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

                                // TODO: result.response.headers is String object
                                if (result.response && result.response.headers) {
                                    result.response.headers = JSON.parse(result.response.headers);
                                }

                                $timeout(function () {
                                    operation.tab = 1;
                                }, 50);
                            });
                    }
                };

                sum.grouped = true;
                sum.searchOpened = false;
                sum.searchFilter = '';
                sum.searchObject = {httpMethod: '', path: ''};
                sum.editUrl = scope.url;
                sum.editOpen = false;

                scope.$watch('sum.searchFilter', function () {
                    if (!sum.searchFilter) {
                        sum.searchObject = {httpMethod: '', path: ''};
                    } else {
                        var t = sum.searchFilter.toLowerCase().trim();
                        var s = t.split(' ');
                        var isMethod = (s.length) === 1 && scope.swaggerMethods[s[0]];
                        var method = (s.length > 1) ? s[0] : (isMethod ? s[0] : '');
                        var path = (s.length > 1) ? s[1] : (isMethod ? '' : s[0]);

                        sum.searchObject = {httpMethod: method, path: path};
                    }
                });

                scope.$watch('sum.editOpen', function () {
                    if (!sum.editOpen) {
                        scope.url = sum.editUrl;
                    }
                });

                sum.infoMethod = function (sop, $event) {
                    var i = httpInfo.method[sop.httpMethod];

                    $mdDialog.show({
                        templateUrl: 'views/dialog.html',
                        clickOutsideToClose: true,
                        targetEvent: $event,
                        controller: DialogCtrl,
                        locals: {
                            title: sop.httpMethod.toUpperCase(),
                            subtitle: 'HTTP Method',
                            header: null,
                            description: i[0],
                            link: i[2],
                            section: i[1].replace(/(RFC)(.*)(#)(.*)/i, '$1 $2 – $4'),
                            style: scope.swaggerMethods[sop.httpMethod],
                            meta: [i[3], i[4], i[5]]
                        }
                    });
                };

                sum.codeClass = {
                    1: scope.swaggerMethods.post,
                    2: scope.swaggerMethods.get,
                    3: scope.swaggerMethods.put,
                    4: scope.swaggerMethods.delete,
                    5: scope.swaggerMethods.delete,
                    7: scope.swaggerMethods.delete
                };

                sum.infoCode = function (code, $event) {
                    var i = httpInfo.status[code] || httpInfo.status[code[0] + 'xx'] ||
                        [
                            '**Undefined**',
                            'no spec found.',
                            '',
                            null
                        ];

                    $mdDialog.show({
                        templateUrl: 'views/dialog.html',
                        clickOutsideToClose: true,
                        targetEvent: $event,
                        controller: DialogCtrl,
                        locals: {
                            title: code,
                            subtitle: 'HTTP Status',
                            header: i[0],
                            description: i[1],
                            link: i[3],
                            section: i[2].replace(/(RFC)(.*)(#)(.*)/i, '$1 $2 – $4'),
                            style: sum.codeClass[code[0]] || sum.codeClass[7],
                            meta: null
                        }
                    });
                };

                sum.headerClass = {
                    standard: scope.swaggerMethods.get,
                    obsoleted: scope.swaggerMethods.delete,
                    undefined: scope.swaggerMethods.post
                };

                sum.infoHeader = function (title, $event) {
                    var i = httpInfo.header[title.toLowerCase()];

                    $mdDialog.show({
                        templateUrl: 'views/dialog.html',
                        clickOutsideToClose: true,
                        targetEvent: $event,
                        controller: DialogCtrl,
                        locals: {
                            title: i[0],
                            subtitle: 'HTTP Header',
                            header: null,
                            description: i[1],
                            link: i[3],
                            section: i[2].replace(/(RFC)(.*)(#)(.*)/i, '$1 $2 – $4'),
                            style: sum.headerClass[i[1]] || sum.headerClass.undefined,
                            meta: null
                        }
                    });
                };

                function DialogCtrl ($scope, $mdDialog, title, subtitle, header, description, link, section, style, meta) {
                    $scope.title = title;
                    $scope.subtitle = subtitle;
                    $scope.header = header;
                    $scope.description = description;
                    $scope.link = link;
                    $scope.section = section;
                    $scope.style = style;
                    $scope.meta = meta;
                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    };
                }
            }
        };
    })
    // List ungrouped operations
    .service('operations', function ($q) {
        this.execute = function (parseResult) {
            var deferred = $q.defer();

            parseResult.infos.operations = [];

            angular.forEach(parseResult.resources, function (resource) {
                angular.forEach(resource.operations, function (operation) {
                    parseResult.infos.operations.push(operation);
                });

                // TODO: allow configuration of minimum auto expanded endpoints
                if (parseResult.resources.length <= 8) {
                    resource.open = true;
                }
            });

            parseResult.infos.operations.sort(function (a, b) {
                return (a.path.toLowerCase().replace(/[^a-z]+/gi, '') + '-' + a.httpMethod)
                    .localeCompare(b.path.toLowerCase().replace(/[^a-z]+/gi, '') + '-' + b.httpMethod);
            });

            deferred.resolve(true);

            return deferred.promise;
        };
    })
    .run(function (swaggerModules, operations) {
        swaggerModules.add(swaggerModules.BEFORE_DISPLAY, operations);
    });
