/*
 * Orange angular-swagger-ui - v0.3.0
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular
    .module('swaggerUi', ['ng'])
    .directive('swaggerUi', function ($injector, $log) {

        return {
            restrict: 'A',
            controller: 'swaggerUiController',
            templateUrl: 'templates/swagger-ui.html',
            scope: {
                // Swagger descriptor URL (string, required)
                url: '=',
                // Swagger descriptor parser type (string, optional, default = "auto")
                // Built-in allowed values:
                // 		"auto": (default) parser is based on response Content-Type
                //		"json": force using JSON parser
                //
                // More types could be defined by external modules
                parser: '@?',
                // Swagger descriptor loading indicator (variables, optional)
                loading: '=?',
                // Use permalinks? (boolean, optional, default = false)
                permalinks: '=?',
                // Display API explorer (boolean, optional, default = false)
                apiExplorer: '=?',
                // Error handler (function, optional)
                errorHandler: '=?',
                // Are Swagger descriptors loaded from trusted source only ? (boolean, optional, default = false)
                // If true, it avoids using ngSanitize but consider HTML as trusted so won't be cleaned
                trustedSources: '=?',
                // Allows defining a custom Swagger validator or disabling Swagger validation
                // If false, Swagger validation will be disabled
                // If URL, will be used as Swagger validator
                // If not defined, validator will be 'http://online.swagger.io/validator'
                validatorUrl: '@?',
                // Allows defining a custom Swagger UI template (string, optional)
                templateUrl: '@?'
            },
            link: function (scope) {
                // check parameters
                if (!scope.trustedSources && !$injector.has('$sanitize')) {
                    $log.warn('AngularSwaggerUI: you must use ngSanitize OR set trusted-sources=true as directive param if swagger descriptors are loaded from trusted sources');
                }
                if (angular.isUndefined(scope.validatorUrl)) {
                    scope.validatorUrl = 'http://online.swagger.io/validator';
                }
                if (angular.isUndefined(scope.templateUrl)) {
                    scope.templateUrl = 'templates/main.html';
                }
            }
        };
    });
