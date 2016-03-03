# Plugins

## [before-load](./before-load)

_Before Swagger JSON or YAML loaded._

Arguments: **options** object for $http(options)

* [yaml](./before-load/yaml.js)
    * [yaml simple test](../#?url=../test/fixtures/openapi-specification/yaml/petstore.yaml)
    * [yaml external references test](../#?url=../test/fixtures/openapi-specification/yaml/petstore-separate/spec/swagger.yaml)

## [before-parse](./before-parse)

_Before swagger object parsed_

Arguments: **swagger** object

* [external-references](./before-parse/external-references.js)
    * [json external references test](../#?url=../test/fixtures/openapi-specification/json/petstore-separate/spec/swagger.json)
* [split](./before-parse/split.js)
* [swagger-1-to-2](./before-parse/swagger-1-to-2.js)

## [parse](./parse)

* [json simple test](../#?url=../test/fixtures/openapi-specification/json/uber.json)

Arguments: **parserType**, **url**, **contentType**, **data**, **isTrustedSources**, **parseResult**

Output: **parseResult**

Promise resolve: **false** or **true**

* [parser](./parse/parser.js)

## [before-display](./before-display)

* [markdown](./before-display/markdown.js)
* [operations](./before-display/operations.js)
* [sort](./before-display/sort.js)

## [before-explorer](./before-explorer)

* [auth-key](./before-explorer/auth-key.js)
* [transform](./before-explorer/transform.js)

## [after-explorer](./after-explorer)

* [xml-formatter](./after-explorer/xml-formatter.js)
