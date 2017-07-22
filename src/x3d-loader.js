var renderX3D = require('./x3d-parser');
var DOMParser = require('xmldom').DOMParser;

module.exports = function (THREE) {

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

			var parser = new DOMParser();
			var scene = new THREE.Scene();
			var x3dXml = parser.parseFromString(data);
			renderX3D(THREE, x3dXml, scene);

			return scene;
		}

	};

};
