import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1 , 2 , 2 , 2)

// const positionArray = new Float32Array(9)

// positionArray[0] = 0
// positionArray[1] = 0
// positionArray[2] = 0

// positionArray[3] = 0
// positionArray[4] = 1
// positionArray[5] = 0

// positionArray[6] = 1
// positionArray[7] = 0
// positionArray[8] = 0
// T R I A N G L E
// const positionArray = new Float32Array([
//     0, 0, 0, //first vertex1
//     0, 1, 0, // second
//     1, 0, 0, // third
// ])
// const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
// const geometry = new THREE.BufferGeometry()
// geometry.setAttribute('position' , positionAttribute)

const geometry = new THREE.BufferGeometry()
let count = 5000
const positionArray = new Float32Array(count * 3 * 3)
for(let i=0 ; i< count*3*3 ; i++){
    positionArray[i] = (Math.random()-0.5) * 3
}
const positionAttribute = new THREE.BufferAttribute(positionArray , 3)
geometry.setAttribute('position' , positionAttribute)


const material = new THREE.MeshBasicMaterial({ color: 0x00f000 , wireframe:false })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()