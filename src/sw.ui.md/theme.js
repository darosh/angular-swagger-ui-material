'use strict';

angular.module('sw.ui.md')
    .factory('theme', function () {
        var defaults = {
            get: 'md-method md-get',
            head: 'md-method md-head',
            options: 'md-method md-options',
            post: 'md-method md-post',
            put: 'md-method md-put',
            patch: 'md-method md-patch',
            delete: 'md-method md-delete',
            1: 'md-accent',
            2: 'md-primary',
            3: 'md-accent md-hue-2',
            4: 'md-warn',
            5: 'md-warn',
            7: 'md-warn',
            standard: 'md-accent',
            obsoleted: 'md-warn',
            undefined: 'md-accent',
            key: '',
            string: 'md-primary',
            number: 'md-warn',
            boolean: 'md-accent md-hue-3',
            null: 'md-accent md-hue-2'
        };

        var self = {
            $configure: configure
        };

        angular.extend(self, defaults);

        return self;

        function configure (theme) {
            angular.extend(self, defaults);
            angular.extend(self, theme || {});

            return self;
        }
    });
