////////////////////////////////////////////////////////////////////////////////
// Ornament axis/angle exercise: add three more cylinders to the ornament
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, document, window, dat*/

var camera, scene, renderer;
var cameraControls, effectController;
var clock = new THREE.Clock();
var bCube = true;
var gridX = false;
var gridY = false;
var gridZ = false;
var axes = true;
var ground = false;

function fillScene() {
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );

	// LIGHTS
	var ambientLight = new THREE.AmbientLight( 0x222222 );

	var light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light.position.set( 200, 400, 500 );

	var light2 = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light2.position.set( -500, 250, -200 );

	scene.add(ambientLight);
	scene.add(light);
	scene.add(light2);

	var cylinderMaterial = new THREE.MeshPhongMaterial( { color: 0xD1F5FD, specular: 0xD1F5FD, shininess: 100 } );

	// get two diagonally-opposite corners of the cube and compute the
	// cylinder axis direction and length
	var maxCorner = new THREE.Vector3(  1, 1, 1 );
	var minCorner = new THREE.Vector3( -1,-1,-1 );
	// note how you can chain one operation on to another:
	var cylAxis = new THREE.Vector3().subVectors( maxCorner, minCorner );
	var cylLength = cylAxis.length();

	// take dot product of cylAxis and up vector to get cosine of angle
	cylAxis.normalize();
	var theta = Math.acos( cylAxis.dot( new THREE.Vector3(0,1,0) ) );
	// or just simply theta = Math.acos( cylAxis.y );


	for(var i = 0; i < 4; ++i) {
		var cylinder = new THREE.Mesh(
			new THREE.CylinderGeometry( 0.2, 0.2, cylLength, 32 ), cylinderMaterial );

		// We know axises are: 
		// ( 1, 0, -1)
		// (-1, 0 ,-1)
		// ( 1, 0 , 1)
		// (-1, 0 , 1)
		// Wonder if there is a smarter way to do this.
		var x = (i < 2) ? -1 : 1;
		var z = (i % 2) ? -1 : 1;
		var rotationAxis = new THREE.Vector3(x,0,z); 

		// makeRotationAxis wants its axis normalized
		rotationAxis.normalize();
		// don't use position, rotation, scale
		cylinder.matrixAutoUpdate = false;
		cylinder.matrix.makeRotationAxis( rotationAxis, theta );
		scene.add( cylinder );
	}
}

function drawGrid(size, divisions, axis) {
	var gridHelper = new THREE.GridHelper( size, divisions );
	switch(axis) {
		case "y":
			gridHelper.rotateX( Math.PI / 2 );
			break;
		case "z":
				gridHelper.rotateZ( Math.PI / 2 );
				break;
		// Think the default is correct here... we'll see.
		case "x":
		default:
			break;
	}
	scene.add( gridHelper );
	return gridHelper;
}
function drawHelpers() {
	if (gridX) {
		drawGrid(10000, 1000, "x");
	}
	if (gridY) {
		drawGrid(10000, 1000, "y");
	}
	if (gridZ) {
		drawGrid(10000, 1000, "z");
	}
	if (bCube) {
		var cubeMaterial = new THREE.MeshLambertMaterial(
			{ color: 0xFFFFFF, opacity: 0.7, transparent: true } );
		var cube = new THREE.Mesh(
			new THREE.CubeGeometry( 2, 2, 2 ), cubeMaterial );
		scene.add( cube );
	}
}

function init() {
	var canvasWidth = 846;
	var canvasHeight = 494;
	// For grading the window is fixed in size; here's general code:
	//var canvasWidth = window.innerWidth;
	//var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor( 0x333333, 1.0 );

	// CAMERA
	camera = new THREE.PerspectiveCamera( 30, canvasRatio, 1, 10000 );
	// CONTROLS
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	camera.position.set( -7, 7, 2 );
	cameraControls.target.set(0,0,0);

}

function addToDOM() {
	document.body.appendChild( renderer.domElement );
}

function animate() {
	window.requestAnimationFrame(animate);
	render();
}

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);

	if ( effectController.newCube !== bCube || effectController.newGridX !== gridX || effectController.newGridY !== gridY || effectController.newGridZ !== gridZ || effectController.newGround !== ground || effectController.newAxes !== axes)
	{
		bCube = effectController.newCube;
		gridX = effectController.newGridX;
		gridY = effectController.newGridY;
		gridZ = effectController.newGridZ;
		ground = effectController.newGround;
		axes = effectController.newAxes;

		fillScene();
		drawHelpers();
	}
	renderer.render(scene, camera);
}



function setupGui() {

	effectController = {

		newCube: bCube,
		newGridX: gridX,
		newGridY: gridY,
		newGridZ: gridZ,
		newGround: ground,
		newAxes: axes
	};

	var gui = new dat.GUI();
	gui.add( effectController, "newCube").name("Show cube");
	gui.add( effectController, "newGridX").name("Show XZ grid");
	gui.add( effectController, "newGridY" ).name("Show YZ grid");
	gui.add( effectController, "newGridZ" ).name("Show XY grid");
	gui.add( effectController, "newGround" ).name("Show ground");
	gui.add( effectController, "newAxes" ).name("Show axes");
}

try {
	init();
	fillScene();
	setupGui();
	drawHelpers();
	addToDOM();
	animate();
} catch(e) {
	var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	console.log(errorReport+e);
}
