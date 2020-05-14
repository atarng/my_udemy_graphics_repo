////////////////////////////////////////////////////////////////////////////////
// Draw a Square Exercise                                                     //
// Your task is to complete the function square (at line 28).                 //
// The function takes 4 arguments - coordinates x1, y1, x2, y2                //
// for the square and returns a geometry object (THREE.Geometry())            //
// that defines a square at the provided coordinates.                         //
////////////////////////////////////////////////////////////////////////////////
/*global THREE Coordinates $ document window*/

var camera, scene, renderer;
var windowScale;

function init() {
	//  Set up some parameters
	var canvasWidth = 846;
	var canvasHeight = 494;
	var canvasRatio = canvasWidth / canvasHeight;
	// scene
	scene = new THREE.Scene();

	// Camera: Y up, X right, Z up
	windowScale = 12;
	var windowWidth = windowScale * canvasRatio;
	var windowHeight = windowScale;

	camera = new THREE.OrthographicCamera(windowWidth/-2, windowWidth/2, windowHeight/2, windowHeight/-2, 0, 40);
	
	var focus = new THREE.Vector3( 5,5,0 );
	camera.position.x = focus.x;
	camera.position.y = focus.y;
	camera.position.z = 20;
	camera.lookAt(focus);

	renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
    renderer.setSize( canvasWidth, canvasHeight );

	// atarng: This line has been deprecated:
	//   renderer.setClearColorHex( 0xffffff, 1.0 );
    // use below instead:
    renderer.setClearColor( 0xffffff, 1.0 );
}
function addToDOM() {
    // atarng: added dom element.
    document.body.appendChild( renderer.domElement );

}
function render() {
	renderer.render( scene, camera );
}

function scratchArea(material) {

	var geometry = new THREE.Geometry();
		
	// Student: some data below must be fixed 
	// for both triangles to appear !
	geometry.vertices.push( new THREE.Vector3( 3, 3, 0 ) );
	geometry.vertices.push( new THREE.Vector3( 7, 3, 0 ) );
	geometry.vertices.push( new THREE.Vector3( 7, 7, 0 ) );
	geometry.vertices.push( new THREE.Vector3( 3, 7, 0 ) );
	
	geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

	// 2,0,3 -> 2, 3, 0
	geometry.faces.push( new THREE.Face3( 2, 3, 0 ) );
	
	var mesh = new THREE.Mesh( geometry, material );
	
	scene.add( mesh );

}

try {
  init();
  addToDOM();

  // creating and adding the triangle to the scene
  var material = new THREE.MeshBasicMaterial( { color: 0xF6831E, side: THREE.FrontSide } );
  scratchArea(material);

  render();
} catch(e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    console.log(errorReport+e);
    //$('#container').append(errorReport+e);
}
