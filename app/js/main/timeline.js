// *** Timeline file ***
// init game
// lunch game
// listen action
const THREE = require('three');
var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

function init() {
    console.log(THREE);
    scene = new THREE.Scene();
    console.log(scene);
    initMesh();
    console.log('init mesh : ok');

    initCamera();
    console.log('init camera : ok');

    initLights();
    console.log('init light : ok');

    initRenderer();
    console.log('init renderer : ok');

    document.body.appendChild(renderer.domElement);
    console.log(renderer.domElement);
}

function initCamera() {

    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 3.5, 5);
    camera.lookAt(scene.position);
}


function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initLights() {
    var light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
	scene.add( directionalLight );
}

var mesh = null;

function initMesh() {

    var loader = new THREE.ObjectLoader();

    loader.load( "../../app/assets/element/scene_torus.json", function ( loadedObj ) {
		var suzanne = loadedObj.getObjectByName("Suzanne");
		suzanne.name = "suz";
		suzanne.rotation.x = -2;
		scene.add(suzanne);
	});
}

function rotateMesh() {
	var suz  = scene.getObjectByName("suz");
    if (!suz) {
        return;
    }else{
    // suz.rotation.x -= SPEED * 2;
    // suz.rotation.y -= SPEED;
    suz.rotation.z -= SPEED * 3;
    }
}

function render() {
	renderer.setClearColor (0xffffff, 1);
    requestAnimationFrame(render);
    rotateMesh();
    renderer.render(scene, camera);
}

module.exports = {init,render};