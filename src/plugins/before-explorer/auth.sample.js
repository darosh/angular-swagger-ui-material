'use strict';

angular
    .module('swaggerUi')
    .factory('swaggerAuthKey', function ($q/* , $window */) {
        return {
            execute: function (/* options */) {
                var deferred = $q.defer();

                /* Add auth key to params

                 options.params.auth_key = '...';
                 */

                /* Basic HTTP Authentication

                 var username = '...';
                 var password = '...';
                 var auth = $window.btoa(username + ':' + password);
                 options.headers['Authorization'] = 'Basic ' + auth;
                 */

                deferred.resolve();

                return deferred.promise;
            }
        };
    })
    .run(function (swaggerPlugins, swaggerAuthKey) {
        swaggerPlugins.add(swaggerPlugins.BEFORE_EXPLORER_LOAD, swaggerAuthKey);
    });
