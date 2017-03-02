<<<<<<< HEAD
// // *** Timeline file ***

var THREE = require('three');
var imports = require('./import.js');
=======
// *** Timeline file ***
// init game
// lunch game
// listen action*
const THREE = require('three');
var scene, camera, renderer;
>>>>>>> 4c9a21a82414b8de4415c69b89f589b52041f5a4

var scene, camera, renderer;
var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;
<<<<<<< HEAD
var SPEED = 0.01;
=======

var SPEED = 0.005;
>>>>>>> 4c9a21a82414b8de4415c69b89f589b52041f5a4

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
<<<<<<< HEAD
    console.log(materialStore);
    imports.createObject('tree2', 'tree2_3', materialStore, scene);
=======

    var material = new THREE.MeshPhongMaterial({
           color: new THREE.Color(0x258C87),
           shininess: 100,
           shading: THREE.SmoothShading,
           reflectivity: 100,
           ambient: new THREE.Color(0xffffff),
       });

    var loader = new THREE.ObjectLoader();

loader.load( "../../app/assets/element/scene_torus.json", function ( loadedObj ) {
              var suz = loadedObj.getObjectByName("Suzanne");
              var testMeshText = new THREE.Mesh(suz.geometry, material);
              testMeshText.name = "suz";
              testMeshText.rotation.x = -2;
              testMeshText.rotation.z = -2;
              testMeshText.scale.x = testMeshText.scale.y = testMeshText.scale.z = 1;
              scene.add(testMeshText);
           });

    /*loader.load( "../../app/assets/element/scene_torus.json", function ( loadedObj ) {
		var suzanne = loadedObj.getObjectByName("Suzanne");
		suzanne.name = "suz";
		suzanne.rotation.x = -2;
		scene.add(suzanne);
	});*/
>>>>>>> 4c9a21a82414b8de4415c69b89f589b52041f5a4
}

function rotateMesh() {
 var suz  = scene.getObjectByName("tree2");
    if (!suz) {
        return;
    }else{
    // suz.rotation.x -= SPEED * 2;
    // suz.rotation.y -= SPEED;
    // suz.rotation.z -= SPEED * 3;
    }
}

function render() {
<<<<<<< HEAD
 renderer.setClearColor (0xffffff, 1);
=======
	renderer.setClearColor (0x000000, 0);
>>>>>>> 4c9a21a82414b8de4415c69b89f589b52041f5a4
    requestAnimationFrame(render);
    rotateMesh();
    renderer.render(scene, camera);
}

module.exports = {initGame, render};


// const THREE = require('three');
// var scene, camera, renderer;
// var WIDTH  = window.innerWidth;
// var HEIGHT = window.innerHeight;
// var SPEED = 0.01;

// function init() {
//     scene = new THREE.Scene();
//     initMesh();
//     console.log('init mesh : ok');

//     initCamera();
//     console.log('init camera : ok');

//     initLights();
//     console.log('init light : ok');

//     initRenderer();
//     console.log('init renderer : ok');

//     document.body.appendChild(renderer.domElement);
//     console.log(renderer.domElement);
// }

// function initCamera() {

//     camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
//     camera.position.set(0, 3.5, 5);
//     camera.lookAt(scene.position);
// }


// function initRenderer() {
//     renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(WIDTH, HEIGHT);
// }

// function initLights() {
//     var light = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(light);

// 	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
// 	scene.add( directionalLight );
// }

// var mesh = null;

// function initMesh() {

//     //Load texture
//     var material = new THREE.MeshPhongMaterial({
//         color: new THREE.Color(0x258C87),
//         shininess: 100,
//         shading: THREE.SmoothShading,
//         reflectivity: 100,
//         ambient: new THREE.Color(0xffffff),
//         map: THREE.ImageUtils.loadTexture('../../app/assets/texture/texture_tree2.png')
//     });


//     //Load json object
//     var loader = new THREE.ObjectLoader();
//     loader.load( "../../app/assets/ee  lement/asset.json", function ( loadedObj ) {

//         var tree1 = loadedObj.getObjectByName("tree1");
//         tree1.name = "tree1";
//         tree1.rotation.x = -2;
//         scene.add(tree1);
        
//         var tree2 = loadedObj.getObjectByName("tree2");
//         var newMesh = new THREE.Mesh(tree2.geometry, material);
//         newMesh.name = "tree2";
//         newMesh.rotation.x = -2;
//         newMesh.scale.x = newMesh.scale.y = newMesh.scale.z = 0.2; 
//         scene.add(newMesh);
// 	});
// }

// function rotateMesh() {
// 	var suz  = scene.getObjectByName("tree2");
//     if (!suz) {
//         return;
//     }else{
//     // suz.rotation.x -= SPEED * 2;
//     // suz.rotation.y -= SPEED;
//     // suz.rotation.z -= SPEED * 3;
//     }
// }

// function render() {
// 	renderer.setClearColor (0xffffff, 1);
//     requestAnimationFrame(render);
//     rotateMesh();
//     renderer.render(scene, camera);
// }

// module.exports = {init,render};