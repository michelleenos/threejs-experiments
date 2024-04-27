import '../style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import World from '../utils/World'
import Sizes from '../utils/sizes'
import GUI from 'lil-gui'

THREE.ColorManagement.enabled = true

const sizes = new Sizes()
const world = new World(sizes)
const clock = new THREE.Clock()
const gui = new GUI()

world.camera.position.set(5, 7, -5)
world.renderer.outputColorSpace = THREE.SRGBColorSpace
if (world.controls) world.controls.zoomSpeed = 0.5

/**
 * Loaders
 */

const gltfLoader = new GLTFLoader()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
const dirLight = new THREE.DirectionalLight('#ffffff', 2.5)
dirLight.position.set(2, 2, 2)
world.scene.add(ambientLight, dirLight)

/**
 * Material
 */
const material = new THREE.MeshStandardMaterial({
   color: '#ff0000',
})
material.flatShading = false

/**
 * Model
 */
const baseUrl = import.meta.env.DEV ? '' : import.meta.env.BASE_URL
gltfLoader.load(baseUrl + '/random/cup.glb', (gltf) => {
   gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
         child.material = material
      }
   })
   world.scene.add(gltf.scene)
})

/**
 * GUI
 */

const debg = {
   clearColor: '#0e0033',
}
world.renderer.setClearColor(debg.clearColor)

gui.addColor(debg, 'clearColor').onChange((val: string) => {
   world.renderer.setClearColor(val)
})

const animate = () => {
   const time = clock.getElapsedTime()

   world.render()

   window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)
