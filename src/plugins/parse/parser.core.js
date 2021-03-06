/*
 * Orange angular-swagger-ui - v0.3.0
 *
 * (C) 2015 Orange, all right reserved
 * MIT Licensed
 */
'use strict';

angular.module('sw.plugin.parser', ['sw.plugins'])
    .factory('parser', function ($q, $sce, $location, model) {
        var trustedSources;
        var operationId;
        var paramId;

        return {
            execute: execute
        };

        function execute (parserType, url, contentType, data, isTrustedSources, parseResult) {
            var deferred = $q.defer();
            if (data.swagger === '2.0' && (parserType === 'json' || (parserType === 'auto' && contentType === 'application/json'))) {
                trustedSources = isTrustedSources;
                try {
                    parseSwagger2Json(data, url, deferred, parseResult);
                } catch (e) {
                    deferred.reject({
                        message: 'failed to parse swagger: ' + e.message
                    });
                }
            } else {
                deferred.resolve(false);
            }
            return deferred.promise;
        }

        /**
         * parse swagger description to ease HTML generation
         */
        function parseSwagger2Json (swagger, url, deferred, parseResult) {
            var map = {};
            var form = {};
            var resources = [];
            var info = swagger.info;
            var openPath = $location.hash();
            var defaultContentType = 'application/json';

            operationId = 0;
            paramId = 0;
            parseInfo(swagger, url, info, defaultContentType);
            parseTags(swagger, resources, map);
            parseOperations(swagger, resources, form, map, defaultContentType, openPath);
            cleanUp(resources, openPath);
            // prepare result
            parseResult.info = info;
            parseResult.resources = resources;
            parseResult.form = form;
            parseResult.securityDefinitions = angular.copy(swagger.securityDefinitions);
            deferred.resolve(true);
        }

        /**
         * parse main info
         */
        function parseInfo (swagger, url, info, defaultContentType) {
            // build URL params
            var a = angular.element('<a href="' + url + '"></a>')[0];
            swagger.schemes = swagger.schemes || [];
            swagger.schemes.sort();
            swagger.schemes.reverse();
            swagger.schemes = [swagger.schemes && swagger.schemes[0] || a.protocol.replace(':', '')];
            swagger.host = swagger.host || a.host;
            swagger.consumes = swagger.consumes || [defaultContentType];
            swagger.produces = swagger.produces || [defaultContentType];
            // build main info
            info.scheme = swagger.schemes[0];
            info.basePath = swagger.basePath;
            info.host = swagger.host;
            info.description = trustHtml(info.description);
            info.externalDocs = swagger.externalDocs;
        }

        /**
         * parse tags
         */
        function parseTags (swagger, resources, map) {
            var i, l, tag;
            if (!swagger.tags) {
                resources.push({
                    name: 'default',
                    open: true
                });
                map['default'] = 0;
            } else {
                for (i = 0, l = swagger.tags.length; i < l; i++) {
                    tag = swagger.tags[i];
                    resources.push(tag);
                    map[tag.name] = i;
                }
            }
        }

        /**
         * parse operations
         */
        function parseOperations (swagger, resources, form, map, defaultContentType, openPath) {
            var pathParameters;
            var tag;
            var resource;

            angular.forEach(swagger.paths, function (pathObject, path) {
                pathParameters = pathObject.parameters || [];
                delete pathObject.parameters;

                angular.forEach(pathObject, function (operation, httpMethod) {
                    // TODO manage 'deprecated' operations ?
                    operation.id = operationId;
                    operation.description = trustHtml(operation.description);
                    operation.produces = operation.produces || swagger.produces;
                    form[operationId] = {
                        responseType: defaultContentType
                    };
                    operation.httpMethod = httpMethod;
                    operation.path = path;
                    parseParameters(swagger, operation, pathParameters, form, defaultContentType);
                    parseResponses(swagger, operation);
                    operation.tags = operation.tags || ['default'];
                    // map operation to resource
                    tag = operation.tags[0];
                    if (angular.isUndefined(map[tag])) {
                        map[tag] = resources.length;
                        resources.push({
                            name: tag
                        });
                    }
                    resource = resources[map[operation.tags[0]]];
                    operation.open = openPath && openPath === operation.operationId || openPath === resource.name + '*';
                    resource.operations = resource.operations || [];
                    resource.operations.push(operation);
                    if (operation.open) {
                        resource.open = true;
                    }
                    operationId++;
                });
            });
        }

        /**
         * compute path and operation parameters
         */
        function computeParameters (swagger, pathParameters, operation) {
            var i;
            var j;
            var k;
            var l;
            var operationParameters = operation.parameters || [];
            var parameters = [].concat(operationParameters);
            var found;
            var pathParameter;
            var operationParameter;

            for (i = 0, l = pathParameters.length; i < l; i++) {
                found = false;
                pathParameter = model.resolveReference(swagger, pathParameters[i]);

                for (j = 0, k = operationParameters.length; j < k; j++) {
                    operationParameter = model.resolveReference(swagger, operationParameters[j]);
                    if (pathParameter.name === operationParameter.name && pathParameter.in === operationParameter.in) {
                        // overridden parameter
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    // add path parameter to operation ones
                    parameters.push(pathParameter);
                }
            }
            return parameters;
        }

        /**
         * parse operation parameters
         */
        function parseParameters (swagger, operation, pathParameters, form, defaultContentType) {
            var i;
            var l;
            var param;
            var parameters = operation.parameters = computeParameters(swagger, pathParameters, operation);

            for (i = 0, l = parameters.length; i < l; i++) {
                // TODO manage 'collectionFormat' (csv, multi etc.) ?
                // TODO manage constraints (pattern, min, max etc.) ?
                param = parameters[i] = model.resolveReference(swagger, parameters[i]);
                param.id = paramId;
                param.type = model.getType(param);
                param.description = trustHtml(param.description);
                if (param.items && param.items.enum) {
                    param.enum = param.items.enum;
                    param.default = param.items.default;
                }
                param.subtype = param.enum ? 'enum' : param.type;
                // put param into form scope
                form[operationId][param.name] = param.default || '';
                if (param.schema) {
                    param.schema.display = 1; // display schema
                    param.schema.json = model.generateSampleJson(swagger, param.schema);
                    param.schema.model = $sce.trustAsHtml(model.generateModel(swagger, param.schema));
                }
                if (param.in === 'body' || param.in === 'formData') {
                    operation.consumes = operation.consumes || swagger.consumes;
                    form[operationId].contentType = operation.consumes.length === 1 ? operation.consumes[0] : defaultContentType;
                }
                paramId++;
            }
        }

        /**
         * parse operation responses
         */
        function parseResponses (swagger, operation) {
            // var sampleJson;
            var sampleObj;

            if (operation.responses) {
                angular.forEach(operation.responses, function (response, code) {
                    // TODO manage response headers
                    response.description = trustHtml(response.description);

                    if (response.schema) {
                        if (response.examples && response.examples[operation.produces[0]]) {
                            // TODO: we prefer object(?)
                            // sampleJson = angular.toJson(response.examples[operation.produces[0]], true);
                            sampleObj = response.examples[operation.produces[0]];
                        } else {
                            // sampleJson = model.generateSampleJson(swagger, response.schema);
                            sampleObj = model.getSampleObj(swagger, response.schema);
                        }

                        // response.schema.json = sampleJson;
                        response.schema.obj = sampleObj;

                        if (response.schema.type === 'object' || response.schema.type === 'array' || response.schema.$ref) {
                            response.display = 1; // display schema
                            response.schema.model = $sce.trustAsHtml(model.generateModel(swagger, response.schema));
                        } else if (response.schema.type === 'string') {
                            delete response.schema;
                        }

                        if (code === '200' || code === '201') {
                            operation.responseClass = response;
                            operation.responseClass.display = 1;
                            operation.responseClass.status = code;
                            delete operation.responses[code];
                        } else {
                            operation.hasResponses = true;
                        }
                    } else {
                        operation.hasResponses = true;
                    }
                });
            }
        }

        function cleanUp (resources, openPath) {
            var i;
            var resource;
            var operations;

            for (i = 0; i < resources.length; i++) {
                resource = resources[i];
                operations = resources[i].operations;
                resource.open = resource.open || openPath === resource.name || openPath === resource.name + '*';
                if (!operations || (operations && operations.length === 0)) {
                    resources.splice(i--, 1);
                }
            }

            // sort resources alphabetically
            resources.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });

            model.clearCache();
        }

        function trustHtml (text) {
            var trusted = text;

            if (angular.isString(text) && trustedSources) {
                trusted = $sce.trustAsHtml(escapeChars(text));
            }

            // else ngSanitize MUST be added to app
            return trusted;
        }

        function escapeChars (text) {
            return text
                .replace(/&/g, '&amp;')
                .replace(/<([^\/a-zA-Z])/g, '&lt;$1')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }
    })
    .run(function (plugins, parser) {
        plugins.add(plugins.PARSE, parser);
    });
