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
                locals: locals
            });
        }

        function DialogCtrl ($scope, $mdDialog, title, subtitle, header, description, link, section, style, meta) {
            $scope.title = title;
            $scope.subtitle = subtitle;
            $scope.header = header;
            $scope.description = description;
            $scope.link = link;
            $scope.section = section;
            $scope.style = style;
            $scope.meta = meta;
            $scope.closeDialog = function () {
                $mdDialog.hide();
            };
        }
    });
