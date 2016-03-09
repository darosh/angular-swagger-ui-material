'use strict';

angular.module('sw.ui.md')
    .controller('ContentController', function ($rootScope, data, theme) {
        var vm = this;

        vm.data = data;
        vm.theme = theme;

        vm.toggleGroup = toggleGroup;
        vm.selectOperation = selectOperation;

        function toggleGroup (group, $event) {
            $event.preventDefault();
            $event.stopPropagation();

            // Space bar does not stop propagation :-(
            if (($event.keyCode || $event.which) === 32) {
                return;
            }

            group.open = !group.open;
        }

        function selectOperation (op, $event) {
            $event.stopPropagation();
            data.model.sop = op;
            $rootScope.$emit('sw:operation');
        }
    });
