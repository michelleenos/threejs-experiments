import { GUI } from 'lil-gui'
import * as THREE from 'three'
import { FlyControls, GLTFLoader } from 'three/examples/jsm/Addons.js'
import '../style.css'
import Mouse from '../utils/Mouse'
import World from '../utils/World'
import { DataView } from '../utils/data-view'
import { createElement } from '../utils/dom'
import Sizes from '../utils/sizes'
import GeoParticles from './geo-particles'
import { buildGui } from './gui'
import { DNAScroll } from './scroll-positions'

let particles: GeoParticles

const sizes = new Sizes()
const world = new World(sizes, false)
const mouse = new Mouse(sizes)
const clock = new THREE.Clock()
const gui = new GUI().close()
let scroller: DNAScroll

const controls = new FlyControls(world.camera, world.renderer.domElement)
const data = new DataView()
data.hide()
let cameraDataObj = {
   direction: new THREE.Vector3(),
}

controls.movementSpeed = 10
controls.dragToLook = true
controls.autoForward = false
controls.rollSpeed = Math.PI / 4

world.renderer.outputColorSpace = THREE.SRGBColorSpace

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

   controls.addEventListener('change', () => {
      particles.onResize()
   })

   const container = document.querySelector<HTMLElement>('.page-content')!
   scroller = new DNAScroll(container, world, particles)

   const cameraData = data.createSection('camera')
   cameraData.add(world.camera, 'position')
   cameraData.add(world.camera, 'rotation')
   cameraData.add(cameraDataObj, 'direction')

   let particlesData = data.createSection('particles')
   particlesData.add(particles.cloud, 'position')
   particlesData.add(particles.cloud, 'rotation')

   // let mouseData = data.createSection('mouse')
   // mouseData.add(mouse, 'screenPos')
   // mouseData.add(particles.material.uniforms.uMouse1, 'value', 'cloudPos')
   // mouseData.add(particles, 'intersectionCount', 'intersects')

   buildGui(gui, world, particles, controls, scroller)
   scrollTableDataView()
}

const scrollTableDataView = () => {
   const createRow = (i: number) => {
      return createElement('tr', { id: `scroll-${i}` }, [
         createElement('th', {}, i.toString()),
         createElement('td', { class: 'pos' }),
         createElement('td', { class: 'duration' }),
         createElement('td', { class: 'offset' }),
      ])
   }

   const rows = [createRow(0), createRow(1), createRow(2)]
   const table = createElement('table', {}, [
      createElement('tr', {}, [
         createElement('td'),
         createElement('th', {}, 'position'),
         createElement('th', {}, 'duration'),
         createElement('th', {}, 'offset'),
      ]),
      ...rows,
   ])

   const writeScrollRow = (row: HTMLElement, i: number) => {
      let pos = row.querySelector('.pos')!
      let duration = row.querySelector('.duration')!
      let offset = row.querySelector('.offset')!
      pos.innerHTML = scroller.sections[i].position.toFixed(2)
      duration.innerHTML = scroller.sections[i].duration.toFixed(2)
      offset.innerHTML = scroller.sections[i].offset.toFixed(2)
   }

   const onUpdate = () => {
      rows.forEach((row, i) => writeScrollRow(row, i))
   }

   data.createCustomSection(table, onUpdate, 'scroll positions')
}

const animate = () => {
   const delta = clock.getDelta()
   const time = clock.getElapsedTime()

   if (particles) particles.tick(time)
   controls.update(delta)
   world.camera.getWorldDirection(cameraDataObj.direction)

   data.update()

   world.render()

   window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)

window.world = world
