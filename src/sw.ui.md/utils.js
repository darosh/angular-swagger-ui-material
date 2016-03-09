'use strict';

angular.module('sw.ui.md')
    .factory('utils', function (dialog, theme, httpData) {
        return {
            method: method,
            status: status,
            header: header,
            statusInfo: statusInfo
        };

        function method (method, $event) {
            var i = httpData.method[method];

            dialog.show($event, {
                title: method.toUpperCase(),
                subtitle: 'HTTP Method',
                header: null,
                description: i[0],
                link: i[2],
                section: rfc(i[1]),
                style: theme[method],
                meta: [i[3], i[4], i[5]]
            });
        }

        function status (code, $event) {
            var i = statusInfo(code);

            dialog.show($event, {
                title: code,
                subtitle: 'HTTP Status',
                header: i[0],
                description: i[1],
                link: i[3],
                section: rfc(i[2]),
                style: theme[code[0]] || theme[7],
                meta: null
            });
        }

        function header (title, $event) {
            var i = httpData.header[title.toLowerCase()] || [title, 'Unknown header.', '', null];

            dialog.show($event, {
                title: i[0],
                subtitle: 'HTTP Header',
                header: null,
                description: i[1],
                link: i[3],
                section: rfc(i[2]),
                style: theme[i[1]] || theme.undefined,
                meta: null
            });
        }

        function rfc (section) {
            return section.replace(/(RFC)(.*)(#)(.*)/i, '$1 $2 – $4');
        }

        function statusInfo (code) {
            return httpData.status[code] || httpData.status[code[0] + 'xx'] ||
                ['**Undefined**', 'no spec found.', '', null];
        }
    });
