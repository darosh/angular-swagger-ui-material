'use strict';

angular.module('swaggerUiMaterial')
    .factory('dialog', function ($mdDialog) {
        return {
            show: show
        };

        function show ($event, locals) {
            $mdDialog.show({
                templateUrl: 'views/dialog.html',
                clickOutsideToClose: true,
                targetEvent: $event,
                controller: DialogCtrl,
                locals: {vm: locals}
            });
        }

        function DialogCtrl ($scope, $mdDialog, vm) {
            $scope.vm = vm;
            $scope.closeDialog = function () {
                $mdDialog.hide();
            };
        }
    });
