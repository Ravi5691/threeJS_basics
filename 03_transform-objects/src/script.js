import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 0.5, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 0.7
mesh.position.y = -0.6
mesh.position.z = 1 
// mesh.position.set(0.7 , -0.6 , 1) 
scene.add(mesh)

// mesh.scale.x = 2
mesh.scale.set(2 , 1 , 0.5)

//rotation
mesh.rotation.y = 3.145
/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

// axeshelper
const axeshelper = new THREE.AxesHelper(2)
scene.add(axeshelper)

// Groups
const group = new THREE.Group()
scene.add(group)

const cube_1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color : 0x00ffff})
)
cube_1.position.x = -0.5
cube_1.scale.set(0.5 , 0.5 , 0.5)
group.add(cube_1)
const cube_2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color : 0x0ffff0})
)
cube_2.position.x = -1.5
cube_2.scale.set(0.5 , 0.5 , 0.5)
group.add(cube_2)
const cube_3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color : 0xf0ff0f})
)
cube_3.position.x = 1.5
cube_3.scale.set(0.5 , 0.5 , 0.5)
group.add(cube_3)
group.position.z = 1
group.rotation.y = 0.5

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

console.log(mesh.position.length())

console.log(mesh.position.distanceTo(camera.position))

mesh.position.normalize()
console.log(mesh.position.length())
// console.log(mesh.position.normalize())

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)