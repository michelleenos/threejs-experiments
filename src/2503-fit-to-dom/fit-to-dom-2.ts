import * as THREE from 'three'
import '../style.css'
import Sizes from '~/utils/Sizes'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import GUI from 'lil-gui'
import vertexShader from './glsl/vert.glsl'
import fragmentShader from './glsl/frag.glsl'

THREE.ColorManagement.enabled = true

const sizes = new Sizes()

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.outputColorSpace = THREE.SRGBColorSpace

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 300)
camera.position.set(0, 0, 2)
const scene = new THREE.Scene()
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

document.body.appendChild(renderer.domElement)

/**
 * Resize
 */

const onResize = () => {
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(sizes.pixelRatio)
}
sizes.on('resize', onResize)
onResize()

/**
 * Plane
 */

let material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
})
let plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
scene.add(plane)

/**
 * Set
 */
let bbox = new THREE.Box3()
let boxSize = new THREE.Vector3()

bbox.setFromObject(plane)
bbox.getSize(boxSize)

const debg = {
    getBoxStuff: () => {
        bbox.setFromObject(plane)
        bbox.getSize(boxSize)
    },
    setObject: () => {
        bbox.setFromObject(plane)
        bbox.getSize(boxSize)
        let fov = camera.fov * (Math.PI / 180)
        let camHeight = 2 * Math.tan(fov / 2) * camera.position.z
        console.log(camHeight)
        plane.scale.set(1, camHeight, 1)
        console.log(plane.scale)
    },
}

/**
 * GUI
 */

let gui = new GUI()
gui.add(debg, 'setObject')
gui.add(boxSize, 'x').decimals(2).listen().disable()
gui.add(boxSize, 'y').decimals(2).listen().disable()
gui.add(boxSize, 'z').decimals(2).listen().disable()

/**
 * Animates
 */

function animate() {
    renderer.render(scene, camera)
    controls.update()

    requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
