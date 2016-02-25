'use strict';

angular.module('toolbarSearch', [])
    .directive('toolbarSearch', function ($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/toolbar-search.html',
            scope: {
                ngModel: '=',
                open: '='
            },
            link: function (scope, element) {
                scope.open = false;

                scope.focus = function () {
                    $timeout(function () {
                        element.children()[1].focus();
                    }, 200);
                };
            }
        };
    });
