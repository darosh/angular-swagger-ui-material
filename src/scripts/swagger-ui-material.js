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
    .directive('swaggerUiMaterial', function ($timeout, $window, swaggerClient, httpInfo, dialog) {
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
            link: function ($scope) {
                if (angular.isUndefined($scope.validatorUrl)) {
                    $scope.validatorUrl = 'http://online.swagger.io/validator';
                }
            }
        };
    });
