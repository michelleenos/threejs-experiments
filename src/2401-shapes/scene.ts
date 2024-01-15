import '../style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import World from '../utils/World'
import Sizes from '../utils/Sizes'
import GUI from 'lil-gui'

THREE.ColorManagement.enabled = true

const sizes = new Sizes()
const world = new World(sizes)
const clock = new THREE.Clock()
const gui = new GUI()

world.camera.position.set(5, 3, 4)
world.renderer.outputColorSpace = THREE.SRGBColorSpace
world.controls.zoomSpeed = 0.5

/**
 * Loaders
 */

const textureLoader = new THREE.TextureLoader()
const gltfLoader = new GLTFLoader()

/**
 * Textures & Materials
 */

const bakedTexture = textureLoader.load('./bake.jpg')
bakedTexture.flipY = false
bakedTexture.colorSpace = THREE.SRGBColorSpace
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

/**
 * Model
 */
gltfLoader.load('./shapes.glb', (gltf) => {
   console.log(gltf)
   gltf.scene.traverse((child) => {
      child instanceof THREE.Mesh && (child.material = bakedMaterial)
   })

   world.scene.add(gltf.scene)
})

/**
 * GUI
 */

const debg = {
   clearColor: '#ffffff',
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
