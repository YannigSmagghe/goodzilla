// *** Timeline file ***
const THREE = require('three');
var imports = require('./import.js');
var scene, camera, renderer;

var colorVar = JSON.parse(localStorage.getItem("_colorVar"));

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

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
    imports.createObject('Boby', 'tree2_1', materialStore, scene);

    var material = new THREE.MeshPhongMaterial({
           color: new THREE.Color(colorVar),
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

function colorListener() {
    if(JSON.parse(localStorage.getItem("_colorVar"))) {
        scene.getObjectByName("suz").material.color.setHex(JSON.parse(localStorage.getItem("_colorVar")));
        //console.log(mesh);
        //mesh.material.color.setHex(JSON.parse(localStorage.getItem("_colorVar")));
        //mesh.material.color.setHex(0xff0000);
        //mesh.material.color = new THREE.Color(0xff0000);
    }else{

    }

}

/*function shapeListener() {
    if(JSON.parse(localStorage.getItem("_shapeVar"))) {
        var loader = new THREE.ObjectLoader();

        loader.load( "../../app/assets/element/model2.json", function ( loadedObj ) {
                      var suz = loadedObj.getObjectByName("Suzanne");
                      var testMeshText = new THREE.Mesh(suz.geometry, material);
                      testMeshText.name = "suz";
                      testMeshText.rotation.x = -2;
                      testMeshText.rotation.z = -2;
                      testMeshText.scale.x = testMeshText.scale.y = testMeshText.scale.z = 1;
                      scene.add(testMeshText);
                   });
    }else{

    }

}*/

function render() {
    renderer.setClearColor (0x000000, 0);
    requestAnimationFrame(render);
    rotateMesh();
    renderer.render(scene, camera);
    colorListener();
}

module.exports = {initGame, render};
