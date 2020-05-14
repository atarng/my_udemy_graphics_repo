////////////////////////////////////////////////////////////////////////////////
// Staircase exercise                                                         //
// Your task is to complete the model for simple stairs                       //
// Using the provided sizes and colors, complete the staircase                //
// and reach the Gold Cup!                                                    //
////////////////////////////////////////////////////////////////////////////////
/*global, THREE, Coordinates, $, document, window, dat*/

var camera, scene, renderer;
var cameraControls, effectController;
var clock = new THREE.Clock();
var gridX = false;
var gridY = false;
var gridZ = false;
var axes = false;
var ground = true;

function fillScene() {
	scene = new THREE.Scene();

	// Triangle Mesh
	var material, geometry, mesh;
	material = new THREE.MeshBasicMaterial({
			vertexColors: THREE.VertexColors
		, side: THREE.DoubleSide
		} );
	geometry = new THREE.Geometry();
				
	// Student: add a colored triangle here
	geometry.vertices.push( new THREE.Vector3( 100, 0, 0 ) );
	geometry.vertices.push( new THREE.Vector3( 0, 100, 0 ) );
	geometry.vertices.push( new THREE.Vector3( 0, 0, 100 ) );
	
	geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
	// these actually multiply the color of the material, which is white by default
	var color1 = new THREE.Color( 0xff0000 );
	var color2 = new THREE.Color( 0x00ff00 );
	var color3 = new THREE.Color( 0x0000ff );
	geometry.faces[0].vertexColors = [ color1, color2, color3 ];
	
/////////////////////////////

	mesh = new THREE.Mesh( geometry, material );
				
	scene.add( mesh );

}

function init() {
	var canvasWidth = 846;
	var canvasHeight = 494;
	var canvasRatio = canvasWidth / canvasHeight;

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);

	// atarng: This line has been deprecated:
	//   renderer.setClearColorHex( 0xffffff, 1.0 );
	//   use below instead:
	renderer.setClearColor( 0x333333, 1.0 );


	// CAMERA
	camera = new THREE.PerspectiveCamera( 45, canvasRatio, 1, 40000 );
	camera.position.set( -700, 500, -1600 );
	// CONTROLS
	// atarng DEPRECATED:
	//   cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.target.set(0,600,0);

	// Camera(2) for testing has following values:
	// camera.position.set( 1225, 2113, 1814 );
	// cameraControls.target.set(-1800,180,630);
  
	fillScene();
}
function addToDOM() {
	// atarng: added dom element.
	document.body.appendChild( renderer.domElement );
}

//

function animate() {
	window.requestAnimationFrame(animate);
	render();
}

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);
	if ( effectController.newGridX !== gridX ||
			effectController.newGridY !== gridY ||
			effectController.newGridZ !== gridZ ||
			effectController.newGround !== ground ||
			effectController.newAxes !== axes)	{
		gridX = effectController.newGridX;
		gridY = effectController.newGridY;
		gridZ = effectController.newGridZ;
		ground = effectController.newGround;
		axes = effectController.newAxes;

		fillScene();
	}
	renderer.render(scene, camera);
}

function setupGui() {

	effectController = {
	
		newGridX: gridX,
		newGridY: gridY,
		newGridZ: gridZ,
		newGround: ground,
		newAxes: axes,

		dummy: function() {
		}
	};

/*// atarng DEPRECATED?
	var gui = new dat.GUI();
	gui.add(effectController, "newGridX").name("Show XZ grid");
	gui.add( effectController, "newGridY" ).name("Show YZ grid");
	gui.add( effectController, "newGridZ" ).name("Show XY grid");
	gui.add( effectController, "newGround" ).name("Show ground");
	gui.add( effectController, "newAxes" ).name("Show axes");
*/
}

function drawGrid(size, divisions){
	var gridHelper = new THREE.GridHelper( size, divisions );
	scene.add( gridHelper );
	return gridHelper;
}

try {
  init();
  setupGui();
  addToDOM();
  animate();
} catch(e) {
	var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	console.log(errorReport+e);
}