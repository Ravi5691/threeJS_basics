import * as THREE from 'three';
// Scene
const scene = new THREE.Scene()

// Red cube
const geometry = new THREE.BoxGeometry( 1 , 1 , 1)
const material = new THREE.MeshBasicMaterial({color : 0xff0000 })
const mesh = new THREE.Mesh(geometry , material)
scene.add(mesh)

// Camera 
// const camera = new THREE.PerspectiveCamera( field of view  ,  aspect ratio)
const sizes = {
    width : 400,
    height : 300,
}
const camera = new THREE.PerspectiveCamera( 45 , sizes.width / sizes.height )
scene.add(camera)
camera.position.z = 3

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})


renderer.setSize(sizes.width , sizes.height)
// renderer.render(scene , camera)


function animate() {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

canvas.addEventListener( "mouseenter" , function(){
    // console.log("hello")
    renderer.setAnimationLoop(null); // Stop the animation
})
canvas.addEventListener("mouseleave", function(){
    // console.log("mouse left")
    renderer.setAnimationLoop(animate); // Restart the animation
})