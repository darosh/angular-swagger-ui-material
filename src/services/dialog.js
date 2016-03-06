'use strict';

angular.module('swaggerUiMaterial')
    .factory('dialog', function ($mdDialog) {
        return {
            show: show
        };

        function show ($event, locals, type) {
            $mdDialog.show({
                templateUrl: 'views/' + (type || 'dialog') + '.html',
                clickOutsideToClose: true,
                targetEvent: $event,
                controller: DialogCtrl,
                locals: {vm: locals}
            });
        }

        function DialogCtrl ($scope, $mdDialog, vm) {
            $scope.vm = vm;
            $scope.vm.opened = true;
            $scope.closeDialog = function () {
                $scope.vm.opened = false;
                $mdDialog.hide();
            };
        }
    });
