# Angular Swagger UI Plugins

## [before-load](./before-load)

_Before swagger JSON or YAML loaded._

Arguments: **options** object for $http(options)

## [before-parse](./before-parse)

_Before swagger object parsed_

Arguments: **swagger** object

* [external-references.js](./before-parse/external-references.js)
* [split.js](./before-parse/split.js)
* [swagger-1-to-2.js](./before-parse/swagger-1-to-2.js)

## [parse](./parse)

Arguments: **parserType**, **url**, **contentType**, **data**, **isTrustedSources**, **parseResult**
Output: **parseResult**
Promise resolve: **false** or **true**

* [parser.js](./parse/parser.js)


## [after-explorer](./after-explorer)

## [before-display](./before-display)

## [before-explorer](./before-explorer)
