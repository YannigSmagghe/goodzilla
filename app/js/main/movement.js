var THREE = require('three');
var OIMO = require('oimo');
var PointerLockControls = require('../lib/PointerLockControls.js');
var imports = require('./import.js');
var assetStore = imports.importAsset();
var materialStore = imports.importMaterial();

var initSettingAssets = false;



function demo() {

    var camera, scene, renderer;
    var geometry, material, mesh;
    var controls;

    var alive = true;

    var objects = [];
    var grounds = [];

    var raycaster;

    var blocker = document.getElementById('blocker');
    var instructions = document.getElementById('instructions');

    // http://www.html5rocks.com/en/tutorials/pointerlock/intro/

    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

    if (havePointerLock) {

        var element = document.body;

        var pointerlockchange = function (event) {

            if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {

                controlsEnabled = true;
                controls.enabled = true;

                blocker.style.display = 'none';

            } else {

                controls.enabled = false;

                blocker.style.display = '-webkit-box';
                blocker.style.display = '-moz-box';
                blocker.style.display = 'box';

                instructions.style.display = '';

            }

        };

        var pointerlockerror = function (event) {

            instructions.style.display = '';

        };

        // Hook pointer lock state change events
        document.addEventListener('pointerlockchange', pointerlockchange, false);
        document.addEventListener('mozpointerlockchange', pointerlockchange, false);
        document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

        document.addEventListener('pointerlockerror', pointerlockerror, false);
        document.addEventListener('mozpointerlockerror', pointerlockerror, false);
        document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

        instructions.addEventListener('click', function (event) {

            instructions.style.display = 'none';

            // Ask the browser to lock the pointer
            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
            element.requestPointerLock();

        }, false);

    } else {

        instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

    }

    init();
    initMesh();
    initbackground();
    // initGround1();
    // initGround2();
    // initGround3();
    // console.log(scene);
    animate();


    var controlsEnabled = false;

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = false;

    var prevTime = performance.now();
    var velocity = new THREE.Vector3();
    var velocityGround = new THREE.Vector3();


    function init() {

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 1000);
        camera.position.x = 35;
        camera.position.y = 35;
        camera.position.z = 175;

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x808080, 0, 750);

        var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
        light.position.set(0.5, 1, 0.75);
        scene.add(light);

        createGround();

        // Move on item
        cubePlayer = new createCharacter();
        // console.log(cube);
        controls = new PointerLockControls(cubePlayer);
        // console.log(PointerLockControls);
        scene.add(controls.getObject());

        ball = new createBall();



        var onKeyDown = function (event) {

            switch (event.keyCode) {

                case 38: // up
                case 90: // z
                    moveForward = true;
                    break;

                case 37: // left
                case 81: // z
                    moveLeft = true;
                    break;

                case 40: // down
                case 83: // q
                    moveBackward = true;
                    break;

                case 39: // right
                case 68: // d
                    moveRight = true;
                    break;

                case 32: // space
                    if (canJump === true) velocity.y += 350;
                    canJump = false;
                    break;

            }

        };

        var onKeyUp = function (event) {

            switch (event.keyCode) {

                case 38: // up
                case 90: // z
                    moveForward = false;
                    break;

                case 37: // left
                case 81: // q
                    moveLeft = false;
                    break;

                case 40: // down
                case 83: // s
                    moveBackward = false;
                    break;

                case 39: // right
                case 68: // d
                    moveRight = false;
                    break;

            }

        };

        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);

        // création des endroits qui vont être collison
        raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

        // floor

        geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
        geometry.rotateX(-Math.PI / 2);

        for (var i = 0, l = geometry.vertices.length; i < l; i++) {

            var vertex = geometry.vertices[i];
            vertex.x += Math.random() * 20 - 10;
            vertex.y += Math.random() * 2;
            vertex.z += Math.random() * 20 - 10;

        }

        for (var i = 0, l = geometry.faces.length; i < l; i++) {

            var face = geometry.faces[i];
            face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

        }
        material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors});

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // bosse
        wall = new THREE.Mesh(new THREE.CubeGeometry(10, 30, 60), new THREE.MeshNormalMaterial());
        wall.name = 'wall';
        wall.position.x = 50;
        wall.position.y = 10;
        scene.add(wall);
        objects.push(wall);


        //

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xffffff);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        //

        window.addEventListener('resize', onWindowResize, false);

    }

    function initSettingAsset(object) {
        // console.log(object);
        object.scale.z = object.scale.y = object.scale.x = 550;
        object.position.z = -300;
        object.position.x = -0.5;
        object.position.y = -1;
    }

    function initMesh() {
        imports.createObject('tree2', 'tree2_3', materialStore, scene);
    }
    function initbackground() {

        imports.createObject('Map1', '', materialStore, scene);
    }
    function initGround1() {

        imports.createObject('groundJumpLeft', '', materialStore, scene);
    }
    function initGround2() {

        imports.createObject('groundJumpRight', '', materialStore, scene);
    }
    function initGround3() {

        imports.createObject('groundPlayerStart.001', '', materialStore, scene);
    }


    function createGround() {
        //ground
        ground1 = new THREE.Mesh(new THREE.CubeGeometry(400, 5, 90), new THREE.MeshBasicMaterial({color :0x808080}));
        ground1.position.x = -450;
        ground1.position.y = 10;
        ground1.name = 'ground1';
        scene.add( ground1);
        objects.push(ground1);

        ground2 = new THREE.Mesh(new THREE.CubeGeometry(400, 5, 90), new THREE.MeshBasicMaterial({color :0x35154872}));
        ground2.position.x = 0;
        ground2.position.y = 10;
        ground2.name = 'ground2';
        scene.add( ground2);
        objects.push(ground2);

        ground3 = new THREE.Mesh(new THREE.CubeGeometry(400, 5, 90), new THREE.MeshBasicMaterial({color :90457130}));
        ground3.position.x = 600;
        ground3.position.y = 10;
        ground3.name = 'ground3';
        scene.add( ground3);
        objects.push(ground3);


    }

    function createCharacter() {
        cube = new THREE.Mesh(new THREE.CubeGeometry(20, 20, 20), new THREE.MeshNormalMaterial());
        cube.name = ('character');
        scene.add(cube);

        return cube;
    }

    function createBall(){
        var geometry = new THREE.SphereGeometry( 5, 32, 32);
        var material = new THREE.MeshPhongMaterial( {specular: "#fdfb57", color: "#d8d613", emissive: "#6b6a0d", side: THREE.DoubleSide} );
        var ball = new THREE.Mesh(geometry, material);
        ball.position.y = 50;
        var dxPerFrame = 1; // how to move in a single frame
        objects.push(ball);

        scene.add(ball);
    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function chute() {
        var terrain = 0;
        if (controls.getObject().position.y > terrain + 90) {
            alive = false;
        }
    }

    function checkalive() {
        if (!alive) {
            console.log('deadoralive')
        }
        alive = true;
    }

    function animate() {

        requestAnimationFrame(animate);

        if (controlsEnabled) {
            raycaster.ray.origin.copy(controls.getObject().position);
            // +10 sous le mesh
            // raycaster.ray.origin.y -= 10;

            // Test de survie
            if (chute()) {
                return alive = false;
            }
            var player = controls.getObject();
            var originPoint = player.position;
            // console.log(Player);
            for (var vertexIndex = 0; vertexIndex < cubePlayer.geometry.vertices.length; vertexIndex++) {
                var localVertex = cubePlayer.geometry.vertices[vertexIndex].clone();
                var globalVertex = localVertex.applyMatrix4(cubePlayer.matrix);
                var directionVector = globalVertex.sub(cubePlayer.position);

                var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
                var collisionResults = ray.intersectObjects(objects);
                if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                    // console.log(collisionResults[0].object.name);
                }

                if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()
                    && collisionResults[0].object.name != 'ground1'
                    && collisionResults[0].object.name != 'ground2'
                    && collisionResults[0].object.name != 'ground3'
                )
                    player.position.x = 0;
            }

            checkalive();

            // Prend la liste des objets que l'on peut rencontrer
            var intersections = raycaster.intersectObjects(objects);
            if (0 < intersections.length) {
                // console.log(intersections);
            }


            var isOnObject = intersections.length > 0;

            var time = performance.now();

            var delta = ( time - prevTime ) / 1000;

            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

            if (moveForward) velocity.z -= 5000.0 * delta;
            if (moveBackward) velocity.z += 5000.0 * delta;

            if (moveLeft) velocity.x -= 5000.0 * delta;
            if (moveRight) velocity.x += 5000.0 * delta;

            if (isOnObject === true) {
                velocity.y = Math.max(0, velocity.y);

                canJump = true;
            }

            controls.getObject().translateX(velocity.x * delta);
            controls.getObject().translateY(velocity.y * delta);
            controls.getObject().translateZ(velocity.z * delta);

            if (controls.getObject().position.y < 10) {

                velocity.y = 0;
                controls.getObject().position.y = 10;

                canJump = true;

            }
            //Background

            var SPEED= 1;
            if (!initSettingAssets){
                var map1 = scene.getObjectByName('Map1');

                if (!initSettingAssets) {
                    initSettingAsset(map1);
                    initSettingAssets = true;
                }
                if (!map1) {
                    return;
                }else{
                    // suz.rotation.x -= SPEED * 2;
                    // suz.rotation.y -= SPEED;
                    map1.rotation.z -= SPEED * 3;
                }
            }

            // move grounds:

            // velocityGround.x -= velocityGround.x * 1.0 * delta;
            //
            // if (!initSettingAssets){
            //     var ground1 = scene.getObjectByName('ground1');
            //
            //     if (!initSettingAssets) {
            //         initSettingAsset(ground1);
            //         initSettingAssets = true;
            //     }
            //     if (!ground1) {
            //         return;
            //     }else{
            //         // suz.rotation.x -= SPEED * 2;
            //         // suz.rotation.y -= SPEED;
            //         ground1.rotation.z -= SPEED * 3;
            //     }
            // }
            // if (!initSettingAssets){
            //     var ground2 = scene.getObjectByName('ground2');
            //
            //     if (!initSettingAssets) {
            //         initSettingAsset(ground2);
            //         initSettingAssets = true;
            //     }
            //     if (!ground2) {
            //         return;
            //     }else{
            //         // suz.rotation.x -= SPEED * 2;
            //         // suz.rotation.y -= SPEED;
            //         ground2.rotation.z -= SPEED * 3;
            //     }
            // }
            // if (!initSettingAssets){
            //     var ground3 = scene.getObjectByName('ground3');
            //
            //     if (!initSettingAssets) {
            //         initSettingAsset(ground3);
            //         initSettingAssets = true;
            //     }
            //     if (!ground3) {
            //         return;
            //     }else{
            //         // suz.rotation.x -= SPEED * 2;
            //         // suz.rotation.y -= SPEED;
            //         ground3.rotation.z -= SPEED * 3;
            //     }
            // }
            var speed = 0.1;
            ground1.translateX(velocityGround.x -= speed * delta);
            if(ground1.position.x < -600){
                ground1.position.x = 600;
            };
            ground2.translateX(velocityGround.x -= speed * delta);
            if(ground2.position.x < -600){
                ground2.position.x = 600;
            };
            ground3.translateX(velocityGround.x -= speed * delta);
            if(ground3.position.x < -600){
                ground3.position.x = 600;
            };

            //obstacles
            // ball.translateX(velocityGround.x -= speed * delta);
            // if(ground1.position.x < -600){
            //     ground1.position.x = 600;
            // };


            prevTime = time;

        }

        renderer.render(scene, camera);

    }

}
module.exports = {demo};
