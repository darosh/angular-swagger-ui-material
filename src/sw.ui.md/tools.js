'use strict';

angular.module('sw.ui.md')
    .factory('tools', function ($window, data) {
        return {
            openFile: openFile
        };

        function openFile ($event, isSwagger) {
            var text;
            var type;

            if (isSwagger) {
                // TODO: fromJson is lazy fix for https://github.com/crucialfelix/supercolliderjs/issues/17
                var json = angular.toJson(data.swagger, true);

                text = (isSwagger === 'swagger.json')
                    ? json : $window.jsyaml.safeDump(angular.fromJson(json));
                type = (isSwagger === 'swagger.json') ? 'application/json' : 'text/yaml';
            } else {
                text = data.model.sop.explorerResult.body;
                type = data.model.sop.explorerResult.headers('content-type') || 'text/plain';
            }

            // noinspection JSUnresolvedFunction
            var out = new $window.Blob([text], {type: type});

            // noinspection JSUnresolvedFunction
            $event.target.href = $window.URL.createObjectURL(out);
        }
    });
