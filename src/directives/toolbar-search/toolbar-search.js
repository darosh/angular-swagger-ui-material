'use strict';

angular.module('sw.ui.directives')
    .directive('toolbarSearch', function ($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/toolbar-search/toolbar-search.html',
            scope: {
                ngModel: '=',
                ngChanged: '=',
                open: '='
            },
            link: function (scope, element) {
                $timeout(function () {
                    scope.init = true;
                }, 200);

                scope.focus = function () {
                    $timeout(function () {
                        element.children()[1].focus();
                    }, 200);
                };

                scope.$watch('ngModel', scope.ngChanged);
            }
        };
    });
