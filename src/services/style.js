'use strict';

angular.module('swaggerUiMaterial')
    .factory('style', function (theme, httpInfo) {
        return {
            header: header
        };

        function header (title) {
            var i = httpInfo.header[title.toLowerCase()];

            if (i) {
                return theme[i[1]] || theme.undefined;
            } else {
                return null;
            }
        }
    });
