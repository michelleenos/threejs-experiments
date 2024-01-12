import '../style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import World from '../utils/World'
import Sizes from '../utils/Sizes'
import Timer from '../utils/Timer'

const sizes = new Sizes()
const world = new World(sizes)
const timer = new Timer()

world.camera.position.set(4, 2, 4)

/**
 * Loaders
 */

const textureLoader = new THREE.TextureLoader()
const gltfLoader = new GLTFLoader()

/**
 * Textures & Materials
 */

const bakedTexture = textureLoader.load('./baked.jpg')
bakedTexture.flipY = false
bakedTexture.colorSpace = THREE.SRGBColorSpace
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })
const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })

/**
 * Model
 */
gltfLoader.load('./portal-merged.glb', (gltf) => {
   const portalScene = gltf.scene

   portalScene.traverse((child) => {
      child instanceof THREE.Mesh && (child.material = bakedMaterial)
   })

   const poleLightAMesh = portalScene.children.find((child) => child.name === 'poleLightA')
   const poleLightBMesh = portalScene.children.find((child) => child.name === 'poleLightB')
   const portalLightMesh = portalScene.children.find((child) => child.name === 'portalLight')

   poleLightAMesh instanceof THREE.Mesh && (poleLightAMesh.material = poleLightMaterial)
   poleLightBMesh instanceof THREE.Mesh && (poleLightBMesh.material = poleLightMaterial)
   portalLightMesh instanceof THREE.Mesh && (portalLightMesh.material = portalLightMaterial)

   world.scene.add(portalScene)
})

timer.on('tick', () => {
   world.render()
})
