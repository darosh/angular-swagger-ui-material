/*
 * Orange angular-swagger-ui - v0.3.0
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular
    .module('swaggerUi')
    .config(function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })
    .factory('swaggerAuthKey', function ($q) {
        return {
            /**
             * Module entry point
             */
            execute: function (options) {
                var deferred = $q.defer();

                options.params.auth_key = '...';

                deferred.resolve();

                return deferred.promise;
            }
        };
    })
    .run(function (swaggerModules, swaggerAuthKey) {
        swaggerModules.add(swaggerModules.BEFORE_EXPLORER_LOAD, swaggerAuthKey);
    });
