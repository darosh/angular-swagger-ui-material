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
                var trimmed = vm.search.toLowerCase().trim();
                var parts = trimmed.split(' ');
                var isMethod = ['get', 'post', 'put', 'patch', 'head', 'options', 'delete'].indexOf(parts[0]) > -1;
                var method = (parts.length > 1) ? parts[0] : (isMethod ? parts[0] : '');
                var path = (parts.length > 1) ? parts[1] : (isMethod ? '' : parts[0]);

                data.model.search = {httpMethod: method, path: path};
            }

            $log.debug('sw:changed:searching', data.model.search);
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
