import * as THREE from 'three';

const scene = new THREE.Scene()

const points = []
points.push( new THREE.Vector3 (-10 , 0 , 0))
points.push( new THREE.Vector3( 0, 10, 0 ) )
points.push( new THREE.Vector3( 10, 0, 0 ) )
points.push( new THREE.Vector3(0 , -10 , 0))
points.push( new THREE.Vector3(-10 , 0 , 0))
points.push( new THREE.Vector3(0, 2 , 0))


const geometry = new THREE.BufferGeometry().setFromPoints(points)
const material = new THREE.LineBasicMaterial({ color : 0x0000ff})
const line = new THREE.Line(geometry , material)

scene.add(line)

const camera = new THREE.PerspectiveCamera(45 , window.innerWidth / window.innerHeight , 1 , 500)
camera.position.set(0 , 0 , 100)
scene.add(camera)

const canvas = document.querySelector('.lines')

const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})
renderer.setSize( window.innerWidth , window.innerHeight)

renderer.render( scene , camera)

