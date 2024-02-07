import { GUI } from 'lil-gui'
import * as THREE from 'three'
import { FlyControls, GLTFLoader } from 'three/examples/jsm/Addons.js'
import '../style.css'
import Mouse from '../utils/Mouse'
import World from '../utils/World'
import { DataView } from '../utils/data-view'
import Sizes from '../utils/sizes'
import GeoParticles from './geo-particles'
import { buildGui, makeDataView } from './gui'
import { DNAScroll } from './scroll-positions'

let particles: GeoParticles
let scroller: DNAScroll

const sizes = new Sizes()
const world = new World(sizes, false)
world.renderer.outputColorSpace = THREE.SRGBColorSpace
const mouse = new Mouse(sizes)
const clock = new THREE.Clock()

const controls = new FlyControls(world.camera, world.renderer.domElement)
controls.movementSpeed = 10
controls.dragToLook = true
controls.autoForward = false
controls.rollSpeed = Math.PI / 4

const gui = new GUI().close()
const data = new DataView().hide()

const baseUrl = import.meta.env.DEV ? '' : import.meta.env.BASE_URL
const gltfLoader = new GLTFLoader()
gltfLoader.load(baseUrl + '/scenes/dna/dna-2-painted.glb', (gltf) => {
   let object = gltf.scene?.children?.[0]
   if (!(object instanceof THREE.Mesh)) return

   particles = new GeoParticles(object, world, mouse)
   afterLoad()
})

const afterLoad = () => {
   particles.cloud.rotateX(Math.PI / 2)
   particles.cloud.rotateZ(Math.PI / 2)
   world.scene.add(particles.cloud)

   const container = document.querySelector<HTMLElement>('.page-content')!
   scroller = new DNAScroll(container, world, particles)

   buildGui(gui, world, particles, controls, scroller)
   makeDataView(data, world, particles, scroller)
}

const animate = () => {
   const delta = clock.getDelta()
   const time = clock.getElapsedTime()

   if (particles) particles.tick(time)
   controls.update(delta)

   data.update()
   world.render()

   window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)
