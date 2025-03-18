import '../style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import World from '../utils/World'
import Sizes from '../utils/Sizes'
import GUI from 'lil-gui'
import Loader from '~/utils/loading-overlay'

THREE.ColorManagement.enabled = true

const sizes = new Sizes()
const world = new World(sizes)
const clock = new THREE.Clock()
const gui = new GUI()

world.camera.position.set(1, 1, 1)
world.renderer.outputColorSpace = THREE.SRGBColorSpace
if (world.controls) world.controls.zoomSpeed = 0.5

/**
 * Loaders
 */
const loader = new Loader()
const gltfLoader = new GLTFLoader(loader.manager)
const textureLoader = new THREE.TextureLoader(loader.manager)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
const dirLight = new THREE.DirectionalLight('#ffffff', 2.5)
// dirLight.position.set(2, 2, 2)
// world.scene.add(ambientLight, dirLight)

/**
 * Model
 */
const baseUrl = import.meta.env.DEV ? '' : import.meta.env.BASE_URL

const bakedTexture = textureLoader.load(baseUrl + '/scenes/trees/baked.jpg')
bakedTexture.flipY = false
bakedTexture.colorSpace = THREE.SRGBColorSpace
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

gltfLoader.load(baseUrl + '/scenes/trees/pinetree001-simplified-unwrapped.glb', (gltf) => {
    gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.material = bakedMaterial
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

gui.add(world.camera.position, 'x', -20, 20, 0.1).name('Camera X').listen().decimals(2)
gui.add(world.camera.position, 'y', -20, 20, 0.1).name('Camera Y').listen().decimals(2)
gui.add(world.camera.position, 'z', -20, 20, 0.1).name('Camera Z').listen().decimals(2)
gui.add(world.camera, 'fov', 0, 180, 1)
    .listen()
    .decimals(0)
    .onChange(() => {
        world.camera.updateProjectionMatrix()
    })

const animate = () => {
    const time = clock.getElapsedTime()

    world.render()

    window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)
