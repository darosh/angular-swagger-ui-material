'use strict';

angular.module('swaggerUiMaterial', ['swaggerUi', 'ngMaterial', 'ngSanitize', 'toolbarSearch', 'toolbarEdit'])
    // Derived from original swaggerUi directive
    .directive('swaggerUiMaterial', function () {
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
            link: function (scope) {
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

                sum.submit = function (sop) {
                    // TODO: what is scope.explorerForm.$valid?
                    scope.submitExplorer(sop);
                    scope.explorerResult = false;
                    scope.hideExplorerResult = false;
                };

                sum.grouped = true;
                sum.searchFilter = '';
                sum.searchObject = {httpMethod: '', path: ''};

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
