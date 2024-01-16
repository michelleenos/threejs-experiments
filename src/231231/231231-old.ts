import '../style.css'
import * as THREE from 'three'
import Sizes from '../utils/sizes'
import Timer from '../utils/timer'
import World from '../utils/World'
import { GUI } from 'lil-gui'
import { lightGui, mirrorGui, ringGui, sceneGui } from './guistuff'
import Ring, { RingOptions } from './Ring'
import FloorMirror, { MirrorOpts } from './FloorMirror'
import Mouse from '../utils/Mouse'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { clamp, lerp, map } from '../utils'

THREE.ColorManagement.enabled = true

const stats = new Stats()
document.body.appendChild(stats.dom)

const params: SceneParams = {
   cameraPosDefault: new THREE.Vector3(0, 40, 100),
   maxAcceleration: 0.08,
   velMult: 0.98,
}

const gui = new GUI()
const timer = new Timer()
const sizes = new Sizes()
const mouse = new Mouse(sizes)
const world = new World(sizes)

world.camera.position.copy(params.cameraPosDefault)
world.renderer.setClearColor(0x0c0911)
world.camera.far = 500
world.controls.maxPolarAngle = Math.PI * 0.5
world.controls.minPolarAngle = Math.PI * 0
world.controls.enableZoom = false

const preset2 = {
   clearColor: '#f2ebff',
   lights: {
      ambient: {
         visible: true,
         intensity: 4.5,
         color: '#fafafa',
      },
      directional: {
         color: '#e5ffff',
         intensity: 5.8,
         visible: true,
         position: new THREE.Vector3(-150, -6, -30),
      },
      point: {
         color: '#29ffa2',
         intensity: 4.5,
         visible: true,
         position: new THREE.Vector3(-100, -124, -58),
         distance: 0,
         decay: 0.1,
      },
   },
   ring: {
      metalness: 0.36,
      roughness: 0.47,
      outerOpacity: 0.5,
      coneRadius: 7.6,
      coneHeight: 22,
      coneSegments: 100,
      count: 18,
      ringRadius: 50,
      innerPosY: 6,
      posY: 1,
      wonkyShapeOptions: {
         metalness: 0.5,
         roughness: 0.5,
         vary: 0.2,
         radius: 3.7,
      },
   },
   mirror: {
      mirrorColor: '#428a8a',
      screenColor: '#6600ff',
      screenRoughness: 0.6,
      screenMetalness: 1,
      screenOpacity: 0,
   },
   colors: {
      red: { start: 0.22, end: 0.89, offset: -0.02 },
      green: { start: -0.37, end: 0.78, offset: -0.38 },
      blue: { start: 0.06, end: 0.97, offset: 1.42 },
   },
}

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#fafafa', 0.5)
ambientLight.visible = false
const dirLight = new THREE.DirectionalLight(0xe5ffff, 4.0)
dirLight.position.set(-150, -6, -30)
const pointLight = new THREE.PointLight(0x8437ff, 9, 0, 0.1)
pointLight.position.set(-10, 80, 45)
world.scene.add(ambientLight, dirLight, pointLight)

/**
 * Shapes
 */

const ring = new Ring(world.camera, mouse, {
   coneRadius: 7.6,
   coneHeight: 22,
   coneSegments: 100,
   count: 18,
   ringRadius: 50,
   innerPosY: 6,
   wonkyShapeOptions: {
      radius: 3.7,
      metalness: 0.5,
      roughness: 0.5,
      detail: 1,
      vary: 0.2,
   },
})
ring.position.set(0, 1, 0)

const mirror = new FloorMirror(sizes, {
   mirrorColor: '#66ffff',
   screenColor: '#bf94ff',
   planeDist: 0.1,
   position: new THREE.Vector3(-25, -10, -25),
})
world.scene.add(ring, mirror)

/**
 * GUI
 */

let lightsFolder = gui.addFolder('Lights')
lightGui(ambientLight, lightsFolder)
lightGui(dirLight, lightsFolder)
lightGui(pointLight, lightsFolder)
mirrorGui(mirror, gui)
ringGui(ring, gui)

let wheelVelocity = 0
let wheelAcceleration = 0
window.addEventListener('wheel', (e) => {
   wheelAcceleration = e.deltaY * 0.0001
})

// Animate
function animate() {
   const time = timer.elapsed

   ring.tick(time)

   let mirrorX = map(mouse.pos.x, -1, 1, -30, 30)
   let mirrorZ = map(mouse.pos.y, -1, 1, 10, -10)
   mirror.position.x = lerp(mirror.position.x, mirrorX, 0.02)
   mirror.position.z = lerp(mirror.position.z, mirrorZ, 0.02)

   wheelVelocity += wheelAcceleration
   wheelVelocity = clamp(wheelVelocity, params.maxAcceleration * -1, params.maxAcceleration)
   wheelAcceleration = 0
   wheelVelocity *= params.velMult
   ring.rotation.y += wheelVelocity

   world.render()
   stats.update()
}

timer.on('tick', animate)
// window.world = world
