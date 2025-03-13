import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/2.png')

//  particles
// geometry
// const particlesGeometry = new THREE.SphereGeometry(1 , 32 ,32)
const particlesGeometry = new THREE.BufferGeometry()
const count = 20000
const position = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)
for(let i=0 ; i < count ; i++){
    position[i] = (Math.random()-0.5) * 10
    colors[i] = Math.random()
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors , 3))

const particlesMaterial = new THREE.PointsMaterial({
    color: 'white',
    size: 0.1, // to control all particles size
    sizeAttenuation: true  //to specify if distant particles should be smaller than close particles
})
// particlesMaterial.color = new THREE.Color('white')
particlesMaterial.transparent = true
// we alpha map for better result on using the txture we can see it 
particlesMaterial.alphaMap = particleTexture
// use of alpha text is for make the texture bg more blending for more perfect finshing we can you depth test
// particleTexture.alphaTest = 0.001
// particlesMaterial.depthTest = false
// the depth of whats being drawn is stored in what we call a depth buffer instead of not testing if the particles is closer than whats in this depth buffer, we can tell the webgl not to write particles in that depth buffer with depthTest.
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending

// for different color
particlesMaterial.vertexColors = true

const particles = new THREE.Points(particlesGeometry , particlesMaterial)
scene.add(particles)
/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

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
camera.position.z = 3
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

    //update particles
    // particles.rotation.y = elapsedTime * 0.2
    for (let i = 0 ; i < count ; i++){
        const i3  = i*3

        const x = particlesGeometry.attributes.position.array[i3]
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    }

    particlesGeometry.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()