'use strict';

angular.module('sw.ui.md')
    .controller('DetailController', function ($scope, $rootScope, $timeout, $log, data, theme, style, tools, utils, syntax, client, format) {
        var vm = this;
        vm.data = data;
        vm.theme = theme;
        vm.style = style;
        vm.utils = utils;
        vm.sop = null;
        vm.omg = false;
        vm.ngForm = {explorerForm: {}};
        vm.form = null;

        vm.submit = submit;
        vm.changed = changed;
        vm.openFile = tools.openFile;

        vm.dummy = $rootScope.$on('sw:operation', selectedOperation);

        var deregister;

        function selectedOperation () {
            if (deregister) {
                deregister();
            }

            var op = vm.sop = data.model.sop;

            vm.form = data.model.form[vm.sop.id];
            var opening = !data.ui.sidenavOpen;
            op.tab = op.tab || 0;

            // fixes tab content width flickering (might be angular-material issue)
            // and triggers .sum-fade animation
            vm.omg = !opening;

            $timeout(function () {
                data.ui.sidenavOpen = true;

                $timeout(function () {
                    vm.omg = false;
                }, 15);
            }, 150);

            if (op.responseClass && op.responseClass.schema && op.responseClass.schema.obj && !op.responseClass.schema.json) {
                op.responseClass.schema.json = syntax.json(angular.toJson(op.responseClass.schema.obj, true));
            }

            // TODO: this is fixing not selected single "text/html" in produces,
            // TODO: angular-swagger-ui probably setting this to "application/json" not present in op.produces
            if ((op.produces.indexOf(data.model.form[op.id].responseType)) === -1 && (op.produces.length === 1)) {
                data.model.form[op.id].responseType = op.produces[0];
            }

            op.responseArray = [];

            if (op.responseClass && op.responseClass.status) {
                op.responseArray.push({
                    code: op.responseClass.status,
                    description: op.responseClass.description || utils.statusInfo(op.responseClass.status)[0]
                });
            }

            angular.forEach(op.responses, function (r, c) {
                op.responseArray.push({
                    code: c,
                    description: r.description || utils.statusInfo(c)[0]
                });
            });

            op.responseArray.sort(function (a, b) {
                a.code.toString().localeCompare(b.code.toString());
            });
            deregister = $scope.$watch('vm.form', function () {
                changed(op);
            }, true);
        }

        function mockRequest (operation, done) {
            client.send(data.model.info, operation, data.model.form[operation.id], true)
                .then(done);
        }

        function changed (op) {
            mockRequest(op, function (options) {
                $log.debug('sw:mocked', options);

                op.mock = options;
            });
        }

        function submit (operation) {
            if (!vm.ngForm.explorerForm.$valid) {
                return;
            }

            $log.debug('sw:submit');

            operation.loading = true;
            client.send(data.model.info, operation, data.model.form[operation.id])
                .then(function (response) {
                    clientDone(operation, response);
                });
        }

        function clientDone (operation, response) {
            $log.debug('sw:response');

            operation.loading = false;
            operation.explorerResult = response;

            if (response && response.status) {
                response.statusString = response.status.toString();
            }

            response.fullUrl = format.fullUrl(response);
            response.body = angular.isObject(response.data) ? angular.toJson(response.data, true) : response.data;

            response.headerArray = [];

            if (response && response.headers) {
                angular.forEach(response.headers(), function (v, k) {
                    response.headerArray.push({
                        name: k,
                        value: v
                    });
                });

                response.headerArray.sort(function (a, b) {
                    a.name.localeCompare(b.name);
                });
            }

            var knownStatus = operation.responseArray.find(
                function (i) {
                    return i.code === response.status.toString();
                }
            );

            knownStatus = knownStatus || (response.statusText ? {description: response.statusText} : {});

            response.statusArray = [{
                code: response.status.toString(),
                description: knownStatus.description || utils.statusInfo(response.status)[0]
            }];

            $timeout(function () {
                operation.tab = 2;
            }, 50);
        }
    });
