// // *** Import file ***
var THREE = require('three');

function importAsset() {

	//Load json object
	var loader = new THREE.ObjectLoader();
	loader.load( "../../app/assets/element/asset.json", function ( loadedObj ) {

		//Load ALL object
		var tree1 = loadedObj.getObjectByName("tree1");
		tree1.name = "tree1";
		tree1.rotation.x = -2;

		var tree2 = loadedObj.getObjectByName("tree2");
		tree2.name = "tree2";
		tree2.rotation.x = -2;

		localStorage.setItem(tree1.name, JSON.stringify(tree1));
		localStorage.setItem(tree2.name, JSON.stringify(tree2));

	});
}

function importMaterial() {

	//Load texture
    var tree2_1 = new THREE.MeshPhongMaterial({
    	name: 'tree2_1',
        shininess: 100,
        shading: THREE.SmoothShading,
        reflectivity: 100,
        map: THREE.ImageUtils.loadTexture('../../app/assets/texture/tree2_1.png')
    });

    var tree2_2 = new THREE.MeshPhongMaterial({
    	name: 'tree2_2',
	    shininess: 100,
	    shading: THREE.SmoothShading,
	    reflectivity: 100,
	    map: THREE.ImageUtils.loadTexture('../../app/assets/texture/tree2_2.png')
    });

    var tree2_3 = new THREE.MeshPhongMaterial({
		name: 'tree2_3',
	    shininess: 100,
	    shading: THREE.SmoothShading,
	    reflectivity: 100,
	    map: THREE.ImageUtils.loadTexture('../../app/assets/texture/tree2_3.png')
    });

    var boby_1 = new THREE.MeshPhongMaterial({
    name: 'boby_1',
      shininess: 0,
      shading: THREE.SmoothShading,
      reflectivity: 100,
      map: THREE.ImageUtils.loadTexture('../../app/assets/texture/boby_1.png')
    });

    var boby_2 = new THREE.MeshPhongMaterial({
    name: 'boby_2',
      shininess: 0,
      shading: THREE.SmoothShading,
      reflectivity: 100,
      map: THREE.ImageUtils.loadTexture('../../app/assets/texture/boby_2.png')
    });

    var boby_3 = new THREE.MeshPhongMaterial({
    name: 'boby_3',
      shininess: 0,
      shading: THREE.SmoothShading,
      reflectivity: 100,
      map: THREE.ImageUtils.loadTexture('../../app/assets/texture/boby_3.png')
    });




    var store = {name:'materialStore', tree2_1:tree2_1, tree2_2:tree2_2, tree2_3:tree2_3, boby_1:boby_1, boby_2:boby_2, boby_3:boby_3};

    return store;
}

function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function createObject(objectName, materialName, materialStore, scene) {
  console.log(materialStore);
	// Load json object
    var loader = new THREE.ObjectLoader();
    loader.load( "../../app/assets/element/asset.json", function ( loadedObj ) {
        var newObj = loadedObj.getObjectByName(objectName);
        var newMesh = new THREE.Mesh(newObj.geometry, materialStore[materialName]);
        newMesh.name = objectName;
        newMesh.rotation.x = -2;
        newMesh.scale.x = newMesh.scale.y = newMesh.scale.z = 1;
        newMesh.position.x = newMesh.position.y = newMesh.position.z = 1;
        console.log(newMesh);
        scene.add(newMesh);
 	});
}

module.exports = {importAsset, importMaterial, createObject};
