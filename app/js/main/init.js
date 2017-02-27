var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

function init() {
    scene = new THREE.Scene();

    initMesh();
    initCamera();
    initLights();
    initRenderer();

    document.body.appendChild(renderer.domElement);
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
    var light = new THREE.AmbientLight(0xffffff, 10);
    scene.add(light);
}

var mesh = null;
function initMesh() {
   // var loader = new THREE.JSONLoader();
    //loader.load('./torus.json', function(geometry, materials) {
       // mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        //mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
        //mesh.translation = THREE.GeometryUtils.center(geometry);
        //scene.add(mesh);
    //});
    //loader.load('./plan.json', function(geometry, materials) {
    	//plan = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
	//plan.scale.x = plan.scale.y = plan.scale.z = 0.75;
	//plan.translation = THREE.GeometryUtils.center(geometry);
	//scene.add(plan); 
	
   // });

    var loader = new THREE.ObjectLoader();
   
    loader.load( "scene_torus.json", function ( loadedObj ) {
    	var plane = loadedObj.getObjectByName("Plane");
	var suzanne = loadedObj.getObjectByName("Suzanne");

	plane.name = "plane";
	suzanne.name = "suz";
	

    	var loadText = new THREE.TextureLoader();
    	    loadText.load('givre.jpg', function(texture) {
		var planeMesh = new THREE.Mesh(plane, texture);		    
	    	planeMesh.scale.x = planeMesh.scale.y = planeMesh.scale.z = 0.75;
		planeMesh.translation = THREE.GeometryUtils.center(plane);
		scene.add(planeMesh);
	    })

	//scene.add(planeMesh);
	scene.add(suzanne);
	});

   var loadText = new THREE.TextureLoader();
   loadText.load('givre.jpg', function(texture) {
	
   })
	

}

function rotateMesh() {
	var plane  = scene.getObjectByName("plane");
    if (!plane) {
        return;
    }

    //plane.rotation.x -= SPEED * 2;
    //plane.rotation.y -= SPEED;
    //plane.rotation.z -= SPEED * 3;
}

function render() {
    requestAnimationFrame(render);
    rotateMesh();
    renderer.render(scene, camera);
}

init();
render();