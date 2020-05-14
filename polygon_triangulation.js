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

function drawGrid(){
	var gridHelper = new THREE.GridHelper( size, divisions );
	scene.add( gridHelper );
}

function PolygonGeometry(sides) {
	var geo = new THREE.Geometry();
	
	// generate vertices
	for(var pt = 0 ; pt < sides; ++pt) {
		// Add 90 degrees so we start at +Y axis, rotate counterclockwise around
		var angle = (Math.PI/2) + (pt / sides) * 2 * Math.PI;

		var x = Math.cos( angle );
		var y = Math.sin( angle );
		
		// YOUR CODE HERE
        //Save the vertex location - fill in the code
		geo.vertices.push( new THREE.Vector3( x, y, 0 ) );
	}

    // YOUR CODE HERE
	// Write the code to generate minimum number of faces for the polygon.
	for(var i = 2; i < sides; ++i) {
		geo.faces.push( new THREE.Face3(0, i - 1, i) );
	}

	// Return the geometry object
	return geo;
}

try {
  init();
  drawGrid();
  addToDOM();

  var geo = PolygonGeometry(5);
  var material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.FrontSide } );
  var mesh = new THREE.Mesh( geo, material );
  scene.add( mesh );

  render();
} catch(e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    console.log(errorReport+e);
    //$('#container').append(errorReport+e);
}
