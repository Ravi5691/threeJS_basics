import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

// importing rectAreaHelper
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

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
 * Lights
 */
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.5
scene.add(ambientLight)

const directionLight = new THREE.DirectionalLight( 0xf0f000 , 1)
directionLight.position.set(1 , 0.2 , 1)
scene.add(directionLight)

const hemisphereLight = new THREE.HemisphereLight( 0xff0000 , 0x0000ff , 1)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight()
pointLight.intensity = 0.5
pointLight.position.set(1 , 0 , 1)
scene.add(pointLight)

// the reactAreaLight is only work with the MeshStandardMaterial and MeshPhysicalMaterial.
// it has four parameter color , intensity , width and height.
const rectAreaLight = new THREE.RectAreaLight( 0x00ff00 , 2 , 1 , 1 )
rectAreaLight.position.set(-1.5 , 0 , 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)

// like a flash light
// it has four parameter color, intensity, distance , angle, penumbra , decay.
const spotLight = new THREE.SpotLight(0x78ff00 , 2 , 10 , Math.PI*0.1 ,0.25, 1)
spotLight.position.set(0 , 2 , 3)
spotLight.target.position.x = -0.75
scene.add(spotLight)
scene.add(spotLight.target)

// Helpers { for helping in positioning the light like a wireframe for a light.}
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight , 0.2)
scene.add(hemisphereLightHelper)

const directionLightHelper = new THREE.DirectionalLightHelper(directionLight , 0.2)
scene.add(directionLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight , 0.2)
scene.add(pointLightHelper)

// note : The spot light helper has no size 
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
// we also need to call its update(...) method on the next frame after moving the target
window.requestAnimationFrame(() => {
    spotLightHelper.update()
})

// realAreaLightHelper is not part of three js library so we must import it
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)



/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()