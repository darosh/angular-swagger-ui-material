'use strict';

angular.module('sw.ui.md')
    .controller('DescriptionController', function ($scope, $log, data) {
        var vm = this;

        $scope.$on('sw:changed', update);

        update();

        function update () {
            $log.debug('sw:changed:description');

            vm.description = data.model.info && data.model.info.description;
        }
    });
