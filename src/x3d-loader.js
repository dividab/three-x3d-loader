var renderX3D = require('./x3d-parser');

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
		colors: [],

		recordingFieldname: null,

		load: function (url, onLoad, onProgress, onError) {

			var scope = this;

			var loader = new THREE.XHRLoader(this.manager);
			loader.setCrossOrigin(this.crossOrigin);
			loader.load(url, function (text) {
				onLoad(scope.parse(text));
			}, onProgress, onError);

		},

		setCrossOrigin: function (value) {

			this.crossOrigin = value;

			THREE.ImageUtils.crossOrigin = value;

		},

		parse: function (data, scene) {

			var parseXml = function (xmlStr) {
				if (typeof window.DOMParser != "undefined") {
					return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
				} else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
					var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.async = "false";
					xmlDoc.loadXML(xmlStr);
					return xmlDoc;
				} else {
					throw new Error("No XML parser found");
				}
			};

			//var texturePath = this.texturePath || '';

			var scene = new THREE.Scene();
			var x3dXml = parseXml(data);
			renderX3D(x3dXml, scene, THREE);

			return scene;
		}

	};

};
