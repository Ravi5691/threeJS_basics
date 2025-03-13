import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * House
 */
const house = new THREE.Group()
scene.add(house)

//walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4,2,4),
    new THREE.MeshStandardMaterial({ color : '#ac8e82'})
)
walls.position.y = 1
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({color : '#b35f45'})
)
roof.rotation.y = Math.PI*0.25
roof.position.y = 2.5

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1.5),
    new THREE.MeshStandardMaterial({})
)
door.position.z = 2 + 0.001
door.position.y = 0.7

const bushGeometry = new THREE.SphereGeometry(1, 16 , 16)
const bustMaterial = new THREE.MeshStandardMaterial({color : '#89c854'})

const bush1 = new THREE.Mesh(bushGeometry, bustMaterial)
bush1.scale.set(0.5, 0.5 ,0.5)
bush1.position.set(0.8 ,0.2 ,2.4 )
const bush2 = new THREE.Mesh(bushGeometry, bustMaterial)
bush1.scale.set(0.5, 0.5 ,0.5)
bush1.position.set(0.8 ,0.2 ,2.4 )
const bush3 = new THREE.Mesh(bushGeometry, bustMaterial)
bush1.scale.set(0.5, 0.5 ,0.5)
bush1.position.set(0.8 ,0.2 ,2.4 )
house.add(walls , roof , door, bush1)
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20 , 20),
    new THREE.MeshBasicMaterial({
        color: '#a9c389'
    })
)
floor.rotation.x = -Math.PI* 0.5
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4)
directionalLight.position.set(3, 2, -8)
gui.add(directionalLight, 'intensity').min(0).max(3).step(0.001)
scene.add(directionalLight)

/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()