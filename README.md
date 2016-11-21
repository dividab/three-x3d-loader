# three-x3d-loader

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

X3DLoader.x3dParser(THREE, parsedXml, scene); // scene is created if missing
```
