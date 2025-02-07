import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


const gui = new dat.GUI( {closed: true , width: 300})
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//texture loader
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorAmibientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const gradientTexture = textureLoader.load('/texture/gradients/5.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter

// objects
// const material = new THREE.MeshBasicMaterial()
// const material = new THREE.MeshNormalMaterial()
// material.map = doorNormalTexture
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture
// const material = new THREE.MeshDepthMaterial
// const material = new THREE.MeshLamberMaterial
// const material = new THREE.MeshPhongMaterial()
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture


const material = new THREE.MeshStandardMaterial()

// envirinment 
const environment = cubeTextureLoader.load(
    '/textures/environmentMap/Standard-Cube-Map/nx.png',
    '/textures/environmentMap/Standard-Cube-Map/ny.png',
    '/textures/environmentMap/Standard-Cube-Map/nz.png',
    '/textures/environmentMap/Standard-Cube-Map/px.png',
    '/textures/environmentMap/Standard-Cube-Map/py.png',
    '/textures/environmentMap/Standard-Cube-Map/pz.png',  
  )
material.envMap = environment

material.metalness = 0
material.roughness = 1
//Instead of specifying uniform metalness and roughness for the whole geometry, we can metalnessMap and roughnessMap.
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
gui.add(material , 'metalness').min(0).max(1).step(0.00001)
gui.add(material , 'roughness').min(0).max(1).step(0.00001)
// material.map = doorColorTexture
// material.aoMap = doorAmibientOcclusionTexture
material.aoMapIntensity = 1
gui.add(material , 'aoMapIntensity').min(0).max(10).step(0.0001)
// material.normalMap = doorNormalTexture
// material.normalScale.set(10 ,10)
// material.alphaMap = doorAlphaTexture
// material.displacementMap = doorHeightTexture 
// it look terrible because it lacks vertices and the displacement is way too strong.
material.displacementScale = 0.10
gui.add(material , 'displacementScale').min(0).max(1).step(0.0001)



// material.shininess = 100
// material.specular = new THREE.Color(0xff00ff)

// adding light 
const addLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(addLight)

const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


// material.map = doorColorTexture
// material.wireframe = true
// material.flatShading = true
// material.alphaMap = doorAlphaTexture
material.transparent = true
// material.opacity = 0.5
// material.side = THREE.DoubleSide
// material.color = new THREE.Color('#ff0000')

const sphere = new THREE.Mesh(
    // new THREE.SphereGeometry(0.5 , 16 , 16 ),
    new THREE.SphereGeometry(0.5 , 64 , 64 ),
    material
)
gui.add(sphere , 'visible').name('sphereVisible')
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
 const plane = new THREE.Mesh(
    // new THREE.PlaneGeometry(1 ,1),
    new THREE.PlaneGeometry(1 ,1 , 100 , 100),
    material
 ) 
scene.add(plane , sphere)
gui.add(plane , 'visible').name('planeVisible')
plane.position.x = 2

const torus = new THREE.Mesh( 
    new THREE.TorusGeometry(0.3 , 0.2 , 16 , 32 ),
    material
)
scene.add(torus)
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
torus.position.x = -2
// sphere.position.x = -1.5
// const plane = new THREE.Mesh()

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

    //upadte objects
    sphere.rotation.y = 0.5*elapsedTime
    plane.rotation.y = 0.1*elapsedTime
    torus.rotation.y = 0.1*elapsedTime

    sphere.rotation.x = 0.15*elapsedTime
    plane.rotation.x = 0.15*elapsedTime
    torus.rotation.x = 0.15*elapsedTime
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()