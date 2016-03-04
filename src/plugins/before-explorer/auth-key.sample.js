/*
 * Orange angular-swagger-ui - v0.3.0
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular
    .module('swaggerUi')
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
    .run(function (swaggerPlugins, swaggerAuthKey) {
        swaggerPlugins.add(swaggerPlugins.BEFORE_EXPLORER_LOAD, swaggerAuthKey);
    });
