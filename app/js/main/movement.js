var THREE = require('three');
var PointerLockControls = require('../lib/PointerLockControls.js');


function demo (){

    var camera, scene, renderer;
    var geometry, material, mesh;
    var controls;

    var alive = true;

    var objects = [];

    var raycaster;

    var blocker = document.getElementById( 'blocker' );
    var instructions = document.getElementById( 'instructions' );

    // http://www.html5rocks.com/en/tutorials/pointerlock/intro/

    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

    if ( havePointerLock ) {

        var element = document.body;

        var pointerlockchange = function ( event ) {

            if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

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

        var pointerlockerror = function ( event ) {

            instructions.style.display = '';

        };

        // Hook pointer lock state change events
        document.addEventListener( 'pointerlockchange', pointerlockchange, false );
        document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
        document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

        document.addEventListener( 'pointerlockerror', pointerlockerror, false );
        document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
        document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

        instructions.addEventListener( 'click', function ( event ) {

            instructions.style.display = 'none';

            // Ask the browser to lock the pointer
            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
            element.requestPointerLock();

        }, false );

    } else {

        instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

    }

    init();
    console.log(controls.getObject());
    animate();

    var controlsEnabled = false;

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = false;

    var prevTime = performance.now();
    var velocity = new THREE.Vector3();

    function init() {

        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 100, 1000 );
        camera.position.x = 35;
        camera.position.y = 35;
        camera.position.z = 175;

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

        var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
        light.position.set( 0.5, 1, 0.75 );
        scene.add( light );

        // Move on item
        cubePlayer = new createCharacter();
        // console.log(cube);
        controls = new PointerLockControls( cubePlayer );
        // console.log(PointerLockControls);
        scene.add( controls.getObject() );

        var onKeyDown = function ( event ) {

            switch ( event.keyCode ) {

                case 38: // up
                case 90: // z
                    moveForward = true;
                    break;

                case 37: // left
                case 81: // z
                    moveLeft = true; break;

                case 40: // down
                case 83: // q
                    moveBackward = true;
                    break;

                case 39: // right
                case 68: // d
                    moveRight = true;
                    break;

                case 32: // space
                    if ( canJump === true ) velocity.y += 350;
                    canJump = false;
                    break;

            }

        };

        var onKeyUp = function ( event ) {

            switch( event.keyCode ) {

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

        document.addEventListener( 'keydown', onKeyDown, false );
        document.addEventListener( 'keyup', onKeyUp, false );

        // création des endroits qui vont être collison
        raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

        // floor

        geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
        geometry.rotateX( - Math.PI / 2 );

        for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {

            var vertex = geometry.vertices[ i ];
            vertex.x += Math.random() * 20 - 10;
            vertex.y += Math.random() * 2;
            vertex.z += Math.random() * 20 - 10;

        }

        for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

            var face = geometry.faces[ i ];
            face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
            face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
            face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

        }

        material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        // objects

        geometry = new THREE.BoxGeometry( 20, 20, 20 );

        for ( var i = 0, l = geometry.faces.length; i < l; i ++ ) {

            var face = geometry.faces[ i ];
            face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
            face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
            face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

        }

        for ( var i = 0; i < 50; i ++ ) {

            material = new THREE.MeshPhongMaterial( { specular: 0x808080, shading: THREE.FlatShading, vertexColors: THREE.VertexColors,color: 0x99FF33 * Math.random() } );

            var mesh = new THREE.Mesh( geometry, material );
            mesh.name = (i);
            mesh.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
            mesh.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
            mesh.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;
            scene.add( mesh );

            objects.push( mesh );

        }

        // bosse
        wall = new THREE.Mesh( new THREE.CubeGeometry( 20, 30, 60 ), new THREE.MeshNormalMaterial() );
        wall.name = 'wall';
        wall.position.x  = 50;
        wall.position.y  = 10;
        scene.add(wall);
        objects.push( wall );


        var cubeGeometry = new THREE.CubeGeometry(50,50,50,1,1,1);
        var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
        MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
        MovingCube.position.set(0, 25.1, 0);
        // scene.add( MovingCube );

        var wallGeometry = new THREE.CubeGeometry( 100, 100, 20, 1, 1, 1 );
        var wallMaterial = new THREE.MeshBasicMaterial( {color: 0x8888ff} );
        // var wireMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe:true } );

        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(100, 50, -100);
        scene.add(wall);
        objects.push(wall);

        var wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
        wall2.position.set(-150, 50, 0);
        wall2.rotation.y = 3.14159 / 2;
        scene.add(wall2);
        objects.push(wall2);




        //

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor( 0xffffff );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        //

        window.addEventListener( 'resize', onWindowResize, false );

    }


    function createCharacter(){
        cube = new THREE.Mesh( new THREE.CubeGeometry( 20, 20, 20 ), new THREE.MeshNormalMaterial() );
        cube.name = ('character');
        scene.add(cube);

        return cube;
    }
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function chute(){
        var terrain = 0;
        if (controls.getObject().position.y > terrain+70){
            alive=false;
        }


    }

    function checkalive(){
        if (!alive){
           console.log('dead')

        }
    }

    function animate() {

        requestAnimationFrame( animate );

        if ( controlsEnabled ) {
            raycaster.ray.origin.copy( controls.getObject().position );
            // +10 sous le mesh
            // raycaster.ray.origin.y -= 10;

            // Test de survie
            if (chute()){
                return alive = false;
            }
            var player = controls.getObject();
            var originPoint = player.position;
            // console.log(Player);
            for (var vertexIndex = 0; vertexIndex < cubePlayer.geometry.vertices.length; vertexIndex++)
            {
                var localVertex = cubePlayer.geometry.vertices[vertexIndex].clone();
                var globalVertex = localVertex.applyMatrix4( cubePlayer.matrix );
                var directionVector = globalVertex.sub( cubePlayer.position );

                var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
                var collisionResults = ray.intersectObjects( objects );
                if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() )
                   player.position.x=0;
            }


            checkalive();

            // Prend la liste des objets que l'on peut rencontrer
            var intersections = raycaster.intersectObjects( objects );
            if (0 < intersections.length ){
                // console.log(intersections);
            }






            var isOnObject = intersections.length > 0;

            var time = performance.now();

            var delta = ( time - prevTime ) / 1000;

            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

            if ( moveForward ) velocity.z -= 400.0 * delta;
            if ( moveBackward ) velocity.z += 400.0 * delta;

            if ( moveLeft ) velocity.x -= 400.0 * delta;
            if ( moveRight ) velocity.x += 400.0 * delta;

            if ( isOnObject === true ) {
                velocity.y = Math.max( 0, velocity.y );

                canJump = true;
            }

            controls.getObject().translateX( velocity.x * delta );
            controls.getObject().translateY( velocity.y * delta );
            controls.getObject().translateZ( velocity.z * delta );

            if ( controls.getObject().position.y < 10 ) {

                velocity.y = 0;
                controls.getObject().position.y = 10;

                canJump = true;

            }

            prevTime = time;

        }

        renderer.render( scene, camera );

    }

}
module.exports = {demo};
