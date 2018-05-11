var renderX3D = require('./x3d-parser');
var DOMParser = require('xmldom').DOMParser;
var JSONParser = require('./json-parser');

var x3dLoader = function (THREE) {

	THREE.X3DLoader = function (manager) {

		this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

	};

	THREE.X3DLoader.prototype = {

		constructor: THREE.X3DLoader,

		// for IndexedFaceSet support
		isRecordingPoints: false,
		isRecordingFaces: false,
		points: [],
		indexes: [],

		// for Background support
		isRecordingAngles: false,
		isRecordingColors: false,
		angles: [],

		recordingFieldname: null,

		load: function (url, onLoad, onProgress, onError) {

			var scope = this;

			var loader = new THREE.FileLoader(this.manager);
			loader.load(url, function (text) {
				onLoad(scope.parse(text));
			}, onProgress, onError);

		},

		setCrossOrigin: function (value) {

			this.crossOrigin = value;

			THREE.ImageUtils.crossOrigin = value;

		},

		parse: function (data, scene) {

			var scene = new THREE.Scene();
			if (data.startsWith("{")) {
				var jsonparser = new JSONParser();
				var x3d = jsonparser.parseFromString(data);
				var s = x3d["string"];
				if (s !== 'Scene') {
					throw("No JSON scene");
				}
				renderX3D(THREE, x3d, scene, undefined, true);
			} else {
				var xmlparser = new DOMParser();
				var x3d = xmlparser.parseFromString(data);
				renderX3D(THREE, x3d, scene, undefined, false);
			}

			return scene;
		}

	};

};

module.exports = x3dLoader;
