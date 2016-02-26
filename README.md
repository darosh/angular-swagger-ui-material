# angular-swagger-ui-material

![work: in progress](https://img.shields.io/badge/work-in%20progress-orange.svg?style=flat)

Material Design template for [angular-swagger-ui](https://github.com/Orange-OpenSource/angular-swagger-ui).

## Demo

| Demo  | Server | Notes |
| --- | --- | --- |
| [Pet Store](http://darosh.github.io/angular-swagger-ui-material/#?url=http://petstore.swagger.io/v2/swagger.json)  | [petstore.swagger.io](http://petstore.swagger.io)  | Markdown in API info |
| [Uber](http://darosh.github.io/angular-swagger-ui-material/#?url=https://cdn.rawgit.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/uber.json)  | no | Markdown in operation info |
| [LoopBack Drupal](http://darosh.github.io/angular-swagger-ui-material/#?url=http://darosh.github.io/angular-swagger-ui-material/swagger-drupal.json)  | no  | [Drupal](https://www.drupal.org/) database discovered + [LoopBack](http://loopback.io/) default models, <br> large: 900+ operations |
| [Minimal Swagger 2.0](http://darosh.github.io/angular-swagger-ui-material/#?url=http://darosh.github.io/angular-swagger-ui-material/swagger-minimal.json)  | no  | |
| [GiHub Flavored Markdown](http://darosh.github.io/angular-swagger-ui-material/#?url=http://darosh.github.io/angular-swagger-ui-material/swagger-gfm.json)  | no  | generated from [github-flavored-markdown-test](https://github.com/suan/github-flavored-markdown-test) |
| [Swashbuckle.OData](http://darosh.github.io/angular-swagger-ui-material/#?url=http://darosh.github.io/angular-swagger-ui-material/swagger-swashbuckle-odata.json)  | no  | example from [Swashbuckle.OData](https://github.com/rbeauchamp/Swashbuckle.OData) |

## Features

* [x] Compatible with [angular-swagger-ui](https://github.com/Orange-OpenSource/angular-swagger-ui) 0.3.0 (2016-02-22)
* [x] [Material Design](https://www.google.com/design/spec/material-design/introduction.html)
* [x] Responsible layout
* [x] Configurable [angular-material](https://material.angularjs.org) theme colors
* [x] Highlight deprecated methods
* [x] Search

## Search

| Filter | Matches | Notes |
| --- | --- | --- |
| log | POST /user/login <br> POST /user/login| path |
| get | GET /user <br> GET /pet | method |
| ge | N/A | single word, not full method |
| get pet | GET /pet | method + path |
| ge pet | GET /pet | method + path |

## Additional modules

### [swagger-sort](./src/modules/swagger-sort.js)

Standalone angular-swagger-ui plugin module for human readable sorting.

### [swagger-markdown](./src/modules/swagger-markdown.js)

Angular-swagger-ui plugin module for markdown.

#### Dependencies

```html
<script src="../bower_components/showdown/dist/showdown.js"></script>
<script src="../bower_components/angular-markdown-filter/markdown.js"></script>
```

## Reference

* [angular-swagger-ui](https://github.com/Orange-OpenSource/angular-swagger-ui)
* [Swagger RESTful API documentation specification](http://swagger.io/specification/)
* [OpenAPI specification](https://github.com/OAI/OpenAPI-Specification)

## Development

### Install

```shell
npm install -g bower gulp
bower install
npm install
```

### Build dist

```shell
gulp
```

### Build demo

```shell
gulp demo
```

### Deploy demo

```shell
gulp deploy
```
