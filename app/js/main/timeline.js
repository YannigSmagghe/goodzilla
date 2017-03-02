// *** Timeline file ***
const THREE = require('three');
var imports = require('./import.js');
var scene, camera, renderer;
var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;
var SPEED = 0.01;

// Create store
var assetStore = imports.importAsset();
var materialStore = imports.importMaterial();

function initGame() {

    //create scene
    scene = new THREE.Scene();
    initMesh();
    console.log('init mesh : ok');

    initCamera();
    console.log('init camera : ok');

    initLights();
    console.log('init light : ok');

    initRenderer();
    console.log('init renderer : ok');

    document.body.appendChild(renderer.domElement);

}

function initCamera() {

    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 3.5, 5);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true , alpha: true});
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
    imports.createObject('tree2', 'tree2_1', materialStore, scene);
}

function rotateMesh() {
    var tree2 = scene.getObjectByName('tree2');
    tree2.scale.z = tree2.scale.y = tree2.scale.x = 0.5;
    tree2.position.x = -0.5;
    tree2.position.y = -1;
    if (!tree2) {
        return;
    }else{
    // suz.rotation.x -= SPEED * 2;
    // suz.rotation.y -= SPEED;
    tree2.rotation.z -= SPEED * 3;
    }
}

function render() {
    renderer.setClearColor (0x000000, 0);
    requestAnimationFrame(render);
    rotateMesh();
    renderer.render(scene, camera);
}

module.exports = {initGame, render};