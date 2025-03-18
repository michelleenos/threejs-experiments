import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import Mouse from '~/utils/Mouse'
import '../style.css'
import World from '../utils/World'
import Sizes from '../utils/Sizes'
import { BrainScene } from './brain-scene'
import { BrainGui } from './gui'
import { GUI } from 'lil-gui'
import Loader from '~/utils/loading-overlay'

THREE.ColorManagement.enabled = true

const sizes = new Sizes()
const world = new World(sizes, { controls: false, stats: true })
const mouse = new Mouse(sizes)

let brainScene: BrainScene

world.renderer.outputColorSpace = THREE.SRGBColorSpace
world.renderer.shadowMap.enabled = true

const loader = new Loader({ styles: { barColor: '#00c2c1', bgColor: '#fafafa' } })
const gltfLoader = new GLTFLoader(loader.manager)

const baseUrl = import.meta.env.DEV ? '' : import.meta.env.BASE_URL
gltfLoader.load(baseUrl + '/scenes/brain/Brain3-rotate-with-normals.glb', (gltf) => {
    const children = gltf.scene.children

    if (children[0] instanceof THREE.Mesh) {
        let brainmesh = children[0]
        let brain = brainmesh.geometry as THREE.BufferGeometry

        brainScene = new BrainScene({ brain, world, mouse })
        new BrainGui(brainScene, new GUI()).init()
        loader.onReady = brainScene.start
    }
})
