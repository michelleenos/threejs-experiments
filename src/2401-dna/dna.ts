import '../style.css'
import * as THREE from 'three'
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js'
import World from '../utils/World'
import Sizes from '../utils/sizes'
import GeoParticles from './geo-particles'
import Mouse from '../utils/Mouse'
import { GUI } from 'lil-gui'
import { buildGui } from './gui'
import { FlyControls } from 'three/examples/jsm/Addons.js'
import { scrollAnimations } from './scroll-positions'

let particles: GeoParticles

const sizes = new Sizes()
const world = new World(sizes, false)
const mouse = new Mouse(sizes)
const clock = new THREE.Clock()
const gui = new GUI()
let timelines: gsap.core.Timeline[]

const controls = new FlyControls(world.camera, world.renderer.domElement)

const camPositionEl = document.getElementById('position')!
const camRotationEl = document.getElementById('rotation')!
const camDirectionEl = document.getElementById('direction')!
const pPositionEl = document.getElementById('particle-position')!
const pRotationEl = document.getElementById('particle-rotation')!
// window.controls = controls

controls.movementSpeed = 10
controls.dragToLook = true
controls.autoForward = false
controls.rollSpeed = Math.PI / 4

world.renderer.outputColorSpace = THREE.SRGBColorSpace

world.camera.position.set(1.86, 1.11, 1.07)
world.camera.rotation.set(-0.98, 0.49, 0.61)

const axes = new THREE.AxesHelper(10)
axes.setColors('blue', 'red', 'green')
world.scene.add(axes)

const baseUrl = import.meta.env.DEV ? '' : import.meta.env.BASE_URL
const gltfLoader = new GLTFLoader()
gltfLoader.load(baseUrl + '/scenes/dna/dna-2-painted.glb', (gltf) => {
   let object = gltf.scene?.children?.[0]
   if (!(object instanceof THREE.Mesh)) return

   particles = new GeoParticles(object, sizes)
   afterLoad()
})

const afterLoad = () => {
   particles.cloud.rotateX(Math.PI / 2)
   particles.cloud.rotateZ(Math.PI / 2)
   world.scene.add(particles.cloud)

   const sections = [...document.querySelectorAll<HTMLElement>('.section')]
   timelines = scrollAnimations(sections, world, particles)
   buildGui(gui, world, particles, controls, timelines)
}

const camDirection = new THREE.Vector3()

const writeNum = (num: number) => num.toFixed(2).padStart(7, '\xa0')
const writeVector = (vec: THREE.Vector3 | THREE.Euler) =>
   `${writeNum(vec.x)} ${writeNum(vec.y)} ${writeNum(vec.z)}`

const animate = () => {
   const delta = clock.getDelta()
   const time = clock.getElapsedTime()

   if (particles) {
      particles.tick(time)
      pPositionEl.innerHTML = writeVector(particles.cloud.position)
      pRotationEl.innerHTML = writeVector(particles.cloud.rotation)
   }

   // orbitControls.update()
   controls.update(delta)
   world.camera.getWorldDirection(camDirection)
   camDirection.multiplyScalar(100)

   camPositionEl.innerHTML = writeVector(world.camera.position)
   camRotationEl.innerHTML = writeVector(world.camera.rotation)
   camDirectionEl.innerHTML = writeVector(camDirection)

   world.render()
   window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)
