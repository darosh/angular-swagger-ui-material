'use strict';

angular.module('sw.ui.md')
    .controller('MetaController', function ($scope, $log, data, tools, display) {
        var vm = this;

        $scope.$on('sw:changed', update);

        update();

        function update () {
            $log.debug('sw:changed:meta');

            vm.meta = data.model.info && display.meta(
                    data.model.info,
                    data.options.url,
                    data.options.validatorUrl,
                    tools.openFile
                );
        }
    });
