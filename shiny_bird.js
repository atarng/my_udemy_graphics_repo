////////////////////////////////////////////////////////////////////////////////
// Make hat, body, leg and foot of Drinking Bird shiny
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, document, window */
var camera, scene, renderer;
var cameraControls;

var clock = new THREE.Clock();

function fillScene() {
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );

	// LIGHTS

	scene.add( new THREE.AmbientLight( 0x222222 ) );

	var light = new THREE.DirectionalLight( 0xFFFFFF, 0.7 );
	light.position.set( 200, 500, 500 );

	scene.add( light );

	light = new THREE.DirectionalLight( 0xFFFFFF, 0.9 );
	light.position.set( -200, -100, -400 );

	scene.add( light );

	// Coordinates.drawGround({size:1000});

	createDrinkingBird();
}

function createDrinkingBird() {
	var headMaterial = new THREE.MeshLambertMaterial( );
	headMaterial.color.r = 104/255;
	headMaterial.color.g = 1/255;
	headMaterial.color.b = 5/255;

	var hatMaterial = new THREE.MeshPhongMaterial( { shininess: 100 } );
	hatMaterial.color.r = 24/255;
	hatMaterial.color.g = 38/255;
	hatMaterial.color.b = 77/255;
	hatMaterial.specular.setRGB( 0.5, 0.5, 0.5 );

	// new THREE.MeshLambertMaterial( );
	var bodyMaterial = new THREE.MeshPhongMaterial( { shininess: 100 } );
	bodyMaterial.color.setRGB( 31/255, 86/255, 169/255 );
	bodyMaterial.specular.setRGB( 0.5, 0.5, 0.5 );

	//new THREE.MeshLambertMaterial( );
	var legMaterial = new THREE.MeshPhongMaterial( { shininess: 4 } );
	legMaterial.color.setHex( 0xAdA79b );
	legMaterial.specular.setRGB( 0.5, 0.5, 0.5 ); 

	var footMaterial = new THREE.MeshPhongMaterial({
		color: 0x960f0b
	, shininess: 30
	} );
	footMaterial.specular.setRGB( 0.5, 0.5, 0.5 );

	var sphere, cylinder, cube;

	var bevelRadius = 1.9;	// TODO: 2.0 causes some geometry bug.

	// MODELS
	// base
	// DEPRECATED: THREE.BeveledBlockGeometry
	// cube = new THREE.Mesh(new THREE.BeveledBlockGeometry( 20+64+110, 4, 2*77+12, bevelRadius ), footMaterial );
	cube = new THREE.Mesh(new THREE.BoxGeometry( 20+64+110, 4, 2*77+12), footMaterial );
	cube.position.x = -45;	// (20+32) - half of width (20+64+110)/2
	cube.position.y = 4/2;	// half of height
	cube.position.z = 0;	// centered at origin
	scene.add( cube );

	// feet
	cube = new THREE.Mesh(
		new THREE.BoxGeometry( 20+64+110, 52, 6 ), footMaterial );
	cube.position.x = -45;	// (20+32) - half of width (20+64+110)/2
	cube.position.y = 52/2;	// half of height
	cube.position.z = 77 + 6/2;	// offset 77 + half of depth 6/2
	scene.add( cube );

	cube = new THREE.Mesh(
		new THREE.BoxGeometry( 20+64+110, 52, 6 ), footMaterial );
	cube.position.x = -45;	// (20+32) - half of width (20+64+110)/2
	cube.position.y = 52/2;	// half of height
	cube.position.z = -(77 + 6/2);	// negative offset 77 + half of depth 6/2
	scene.add( cube );

	cube = new THREE.Mesh(
		new THREE.BoxGeometry( 64, 104, 6 ), footMaterial );
	cube.position.x = 0;	// centered on origin along X
	cube.position.y = 104/2;
	cube.position.z = 77 + 6/2;	// negative offset 77 + half of depth 6/2
	scene.add( cube );

	cube = new THREE.Mesh(
		new THREE.BoxGeometry( 64, 104, 6 ), footMaterial );
	cube.position.x = 0;	// centered on origin along X
	cube.position.y = 104/2;
	cube.position.z = -(77 + 6/2);	// negative offset 77 + half of depth 6/2
	scene.add( cube );

	// legs
	cube = new THREE.Mesh(
		new THREE.BoxGeometry( 60, 282+4, 4 ), legMaterial );
	cube.position.x = 0;	// centered on origin along X
	cube.position.y = 104 + 282/2 - 2;
	cube.position.z = 77 + 6/2;	// negative offset 77 + half of depth 6/2
	scene.add( cube );

	cube = new THREE.Mesh(
		new THREE.BoxGeometry( 60, 282+4, 4 ), legMaterial );
	cube.position.x = 0;	// centered on origin along X
	cube.position.y = 104 + 282/2 - 2;
	cube.position.z = -(77 + 6/2);	// negative offset 77 + half of depth 6/2
	scene.add( cube );

	// body
	sphere = new THREE.Mesh(
		new THREE.SphereGeometry( 116/2, 32, 16 ), bodyMaterial );
	sphere.position.x = 0;
	sphere.position.y = 160;
	sphere.position.z = 0;
	scene.add( sphere );

	cylinder = new THREE.Mesh(
		new THREE.CylinderGeometry( 24/2, 24/2, 390, 32 ), bodyMaterial );
	cylinder.position.x = 0;
	cylinder.position.y = 160 + 390/2;
	cylinder.position.z = 0;
	scene.add( cylinder );

	// head
	sphere = new THREE.Mesh(
		new THREE.SphereGeometry( 104/2, 32, 16 ), headMaterial );
	sphere.position.x = 0;
	sphere.position.y = 160 + 390;
	sphere.position.z = 0;
	scene.add( sphere );

	// hat
	cylinder = new THREE.Mesh(
		new THREE.CylinderGeometry( 142/2, 142/2, 10, 32 ), hatMaterial );
	cylinder.position.x = 0;
	cylinder.position.y = 160 + 390 + 40 + 10/2;
	cylinder.position.z = 0;
	scene.add( cylinder );

	cylinder = new THREE.Mesh(
		new THREE.CylinderGeometry( 80/2, 80/2, 70, 32 ), hatMaterial );
	cylinder.position.x = 0;
	cylinder.position.y = 160 + 390 + 40 + 10 + 70/2;
	cylinder.position.z = 0;
	scene.add( cylinder );


	

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
	camera = new THREE.PerspectiveCamera( 45, canvasRatio, 1, 4000 );
	// CONTROLS
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	camera.position.set( -480, 659, -619 );
	cameraControls.target.set(4,301,92);

	fillScene();
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

	renderer.render(scene, camera);
}

function drawGrid(size, divisions){
	var gridHelper = new THREE.GridHelper( size, divisions );
	scene.add( gridHelper );
	return gridHelper;
}

try {
	init();
	fillScene();
	addToDOM();
	drawGrid(10,10);
	animate();
} catch(e) {
	var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	console.log(errorReport+e);
}
