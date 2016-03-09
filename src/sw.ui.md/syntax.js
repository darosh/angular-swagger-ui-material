/*
 * Orange angular-swagger-ui - v0.3.0
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular.module('sw.ui.md')
    .factory('syntax', function (theme) {
        var prefix = 'md-button ';

        return {
            json: json
        };

        // from http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
        function json (json) {
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = prefix + theme.number;

                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = prefix + theme.key;
                    } else {
                        cls = prefix + theme.string;
                    }
                } else if (/true|false/.test(match)) {
                    cls = prefix + theme.boolean;
                } else if (/null/.test(match)) {
                    cls = prefix + theme.null;
                }

                return '<span class="' + cls + '">' + match + '</span>';
            });
        }
    });
