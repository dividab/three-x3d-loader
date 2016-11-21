var THREE = require('three');
var loader = require('../index');
loader.x3dLoader(THREE);

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 1000;
camera.position.x = 400;
camera.position.y = -400;
camera.lookAt(new THREE.Vector3(0, 0, 0));

const httpRequest = new XMLHttpRequest();
httpRequest.overrideMimeType('text/xml');

httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var xmlText = httpRequest.responseText;

            var loader = new THREE.X3DLoader();
            const scene = loader.parse(xmlText);
            var light = new THREE.AmbientLight( 0x404040 ); // soft white light
            scene.add( light );
            renderer.render(scene, camera);
        } else {
            alert('There was a problem with the request.');
        }
    }
};

httpRequest.open("GET", "example.xml");
httpRequest.send(null);
