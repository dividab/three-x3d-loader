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

## Running in a web server

```
1$ git clone https://github.com/coderextreme/three-x3d-loader
2$ cd three-x3d-loader
3$ npm install
4$ node app.js
```
Then go to http://localhost:3000/ in a web browser.


Or, after running npm install, do
```
npm run start
```
Then go to http://localhost:8080/

To change file you are viewing, edit example/example.js.  Replace "example/example.xml" with an X3D XML or X3D JSON file (probably in Interchange profile), with a .x3d, .xml or .json extension.  Then type CTRL-c to stop the web server, and go to step 3 and continue to see a new picture.

[version-image]: https://img.shields.io/npm/v/three-x3d-loader.svg?style=flat
[version-url]: https://www.npmjs.com/package/three-x3d-loader
[license-image]: https://img.shields.io/github/license/jonaskello/three-x3d-loader.svg?style=flat
[license-url]: https://opensource.org/licenses/MIT
