'use strict';

angular.module('sw.ui.directives')
    .directive('toolbarEdit', function ($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/toolbar-edit/toolbar-edit.html',
            scope: {
                ngModel: '=',
                ngChanged: '=',
                displayTitle: '='
            },
            link: function (scope, element) {
                var t;
                scope.open = false;
                scope.init = false;
                $timeout(function () {
                    scope.init = true;
                }, 200);
                scope.focus = function () {
                    $timeout.cancel(t);

                    $timeout(function () {
                        element.children().eq(1).children()[0].focus();
                    }, 200);
                };
                scope.blur = function () {
                    t = $timeout(function () {
                        scope.open = false;
                        scope.ngChanged();
                    }, 200);
                };
                scope.toggle = function () {
                    scope.open = !scope.open;

                    if (scope.open) {
                        scope.focus();
                    } else {
                        scope.ngChanged();
                    }
                };
            }
        };
    });
