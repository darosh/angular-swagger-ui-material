'use strict';

angular.module('truncate', [])
    .directive('truncate', function (truncation) {
        return {
            restrict: 'A',
            scope: {
                ngBindHtml: '='
            },
            link: function (scope, element) {
                scope.$watch('ngBindHtml', function () {
                    var more = angular.element('<a class="truncate">\u2026</a>');

                    element.empty();

                    element.append(truncation(scope.ngBindHtml, {
                        length: 144,
                        words: true,
                        ellipsis: more[0]
                    }));

                    more.bind('click', function () {
                        element[0].innerHTML = scope.ngBindHtml;
                    });
                });
            }
        };
    })
    .factory('truncation', function () {
        var chop = /(\s*\S+|\s)$/;

        // based on https://github.com/pathable/truncate
        function truncate(root, opts) {
            var text = root.textContent;
            var excess = text.length - opts.length;

            if (opts.words && excess > 0) {
                excess = text.length - text.slice(0, opts.length).replace(chop, '').length - 1;
            }

            if (excess < 0 || !excess && !opts.truncated) return;

            for (var i = root.childNodes.length - 1; i >= 0; i--) {
                var el = root.childNodes[i];
                var text = el.textContent;
                var length = text.length;

                if (length <= excess) {
                    opts.truncated = true;
                    excess -= length;
                    el.remove();
                    continue;
                }

                if (el.nodeType === 3) {
                    var s = el.splitText(length - excess - 1);
                    //s.textContent = o.ellipsis;
                    s.parentNode.replaceChild(opts.ellipsis, s);
                    return;
                }

                truncate(el, angular.extend(opts, {length: length - excess}));
            }
        }

        return function (html, options) {
            var root = angular.element('<div></div>').append(html)[0];
            truncate(root, options);
            return root;
        };
    });
