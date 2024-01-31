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
import { DNAScroll } from './scroll-positions'

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
const mousePosEl = document.getElementById('mouse-position')!
const mouseCloudEl = document.getElementById('mouse-cloud-position')!
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

   particles = new GeoParticles(object, world, mouse, 8000)
   afterLoad()
})

const afterLoad = () => {
   particles.cloud.rotateX(Math.PI / 2)
   particles.cloud.rotateZ(Math.PI / 2)
   world.scene.add(particles.cloud)

   // const sections = [...document.querySelectorAll<HTMLElement>('.section')]
   const container = document.querySelector<HTMLElement>('.page-content')!
   // timelines = scrollAnimations(container, world, particles)
   // new DNAScroll(container, world, particles)
   buildGui(gui, world, particles, controls)
}

const camDirection = new THREE.Vector3()

const writeNum = (num: number) => num.toFixed(2).padStart(7, '\xa0')
const writeVector = (vec: THREE.Vector3 | THREE.Vector2 | THREE.Euler) => {
   if (vec instanceof THREE.Vector2) {
      return `${writeNum(vec.x)} ${writeNum(vec.y)}`
   } else {
      return `${writeNum(vec.x)} ${writeNum(vec.y)} ${writeNum(vec.z)}`
   }
}

const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial())
cube.scale.set(0.1, 0.1, 0.1)
world.scene.add(cube)
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

   mousePosEl.innerHTML = writeVector(mouse.pos)
   if (particles) {
      mouseCloudEl.innerHTML = writeVector(particles.material.uniforms.uMouse1.value)
      cube.position.copy(particles.material.uniforms.uMouse1.value)
   }

   world.render()
   window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)
