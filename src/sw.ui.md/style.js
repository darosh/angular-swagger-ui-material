'use strict';

angular.module('sw.ui.md')
    .factory('style', function (theme, httpData) {
        return {
            header: header
        };

        function header (title) {
            var i = httpData.header[title.toLowerCase()];

            if (i) {
                return theme[i[1]] || theme.undefined;
            } else {
                return null;
            }
        }
    });
