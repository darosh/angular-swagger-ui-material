'use strict';

angular.module('swaggerUiMaterial', ['swaggerUi', 'ngMaterial', 'ngSanitize', 'toolbarSearch', 'toolbarEdit'])
    // Derived from original swaggerUi directive
    .directive('swaggerUiMaterial', function ($timeout, $mdDialog, httpInfo) {
        return {
            restrict: 'A',
            controller: 'swaggerUiController',
            templateUrl: 'templates/material/main.html',
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

                sum.submit = function (sop) {
                    if (sum.explorerForm.$valid) {
                        scope.submitExplorer(sop);
                        sop.explorerResult = false;
                        sop.hideExplorerResult = false;
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
                    $mdDialog.show({
                        templateUrl: 'templates/material/dialog-method.html',
                        clickOutsideToClose: true,
                        targetEvent: $event,
                        controller: function ($scope, $mdDialog, info, title, section, style) {
                            $scope.info = info;
                            $scope.title = title;
                            $scope.section = section;
                            $scope.style = style;
                            $scope.closeDialog = function () {
                                $mdDialog.hide();
                            };
                        },
                        locals: {
                            info: httpInfo.method[sop.httpMethod],
                            title: sop.httpMethod,
                            section: httpInfo.method[sop.httpMethod][1].replace(/(RFC)(.*)(#)(.*)/i, '$1 $2 – $4'),
                            style: scope.swaggerMethods[sop.httpMethod]
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
                    var status = httpInfo.status[code] || httpInfo.status[code[0] + 'xx'] ||
                        [
                            '**Undefined**',
                            'no spec found.',
                            '',
                            null
                        ];

                    $mdDialog.show({
                        templateUrl: 'templates/material/dialog-code.html',
                        clickOutsideToClose: true,
                        targetEvent: $event,
                        controller: function ($scope, $mdDialog, info, title, section, style) {
                            $scope.info = info;
                            $scope.title = title;
                            $scope.section = section;
                            $scope.style = style;
                            $scope.closeDialog = function () {
                                $mdDialog.hide();
                            };
                        },
                        locals: {
                            info: status,
                            title: code,
                            section: status[2].replace(/(RFC)(.*)(#)(.*)/i, '$1 $2 – $4'),
                            style: sum.codeClass[code[0]] || sum.codeClass[7]
                        }
                    });
                };
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

