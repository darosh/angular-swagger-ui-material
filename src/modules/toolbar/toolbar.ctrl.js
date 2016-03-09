'use strict';

angular.module('sw.ui.md')
    .controller('ToolbarController', function ($scope, $log, $mdMedia, data, security, theme) {
        var vm = this;

        vm.data = data;
        vm.ui = data.ui;
        vm.search = null;
        vm.searchOpened = false;
        vm.editUrl = data.options.url;
        vm.loading = false;
        vm.$mdMedia = $mdMedia;

        vm.showSecurity = showSecurity;
        vm.showProxy = showProxy;
        vm.toggleGroups = toggleGroups;
        vm.editedUrl = editedUrl;
        vm.searchUpdated = searchUpdated;

        $scope.$on('sw:changed', update);

        update();

        function update () {
            $log.debug('sw:changed:toolbar');

            vm.loading = data.loading;
        }

        function editedUrl () {
            data.setUrl(vm.editUrl);
        }

        function searchUpdated () {
            $log.debug('sw:changed:search', vm.search);

            if (!vm.search) {
                data.model.search = {};
            } else {
                var t = vm.search.toLowerCase().trim();
                var s = t.split(' ');
                var isMethod = (s.length) === 1 && theme[s[0]];
                var method = (s.length > 1) ? s[0] : (isMethod ? s[0] : '');
                var path = (s.length > 1) ? s[1] : (isMethod ? '' : s[0]);

                data.model.search = {httpMethod: method, path: path};
            }
        }

        function toggleGroups (open) {
            angular.forEach(data.model.groups, function (group) {
                group.open = open;
            });
        }

        function showSecurity ($event) {
            security.showSecurity($event, data.swagger);
        }

        function showProxy ($event) {
            security.showProxy($event, data.swagger);
        }
    });
