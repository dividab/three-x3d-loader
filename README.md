# three-x3d-loader

[![npm version][version-image]][version-url]
[![MIT license][license-image]][license-url]

> Three.js Loader for the X3D format.

## Install

```
$ npm install --save three-x3d-loader
```

## Usage

```js
var THREE = require('three');
var X3DLoader = require('three-x3d-loader');
X3DLoader(THREE);

console.log(typeof THREE.X3DLoader);
//=> 'function'
```

or just use the parser alone
```js
var THREE = require('three');
var X3DLoader = require('three-x3d-loader');

var parsedXml = {...};
var scene = new THREE.Scene();

X3DLoader.x3dParser(THREE, parsedXml, scene /* Optional. Created if missing */, useImageTexture/* Optional. Default true */);
```

[version-image]: https://img.shields.io/npm/v/three-x3d-loader.svg?style=flat
[version-url]: https://www.npmjs.com/package/three-x3d-loader
[license-image]: https://img.shields.io/github/license/jonaskello/three-x3d-loader.svg?style=flat
[license-url]: https://opensource.org/licenses/MIT
