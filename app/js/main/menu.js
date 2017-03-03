// *** Menu file ***
const THREE = require('three');
var imports = require('./import.js');
var scene, camera, renderer;
var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;
var SPEED = 0.01;
var initSettingAssets = false;

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

    // initSettingAsset();


    document.body.appendChild(renderer.domElement);

}

function initSettingAsset(tree) {
    // tree.scale.z = tree.scale.y = tree.scale.x = 0.5;
    tree.position.x = -0.5;
    tree.position.y = -1;
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
    imports.createObject('tree2', 'tree2_3', materialStore, scene);
}

function rotateMesh() {    
    var tree2 = scene.getObjectByName('tree2');
    // console.log(tree2);
    if (!initSettingAssets) {
        initSettingAsset(tree2);
        initSettingAssets = true;
    }        
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