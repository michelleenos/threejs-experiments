import '../style.css'
import * as THREE from 'three'
import Sizes from '../utils/Sizes'
import Timer from '../utils/Timer'
import World from '../utils/World'
import { GUI } from 'lil-gui'
import { SceneParams, lightGui, mirrorGui, ringGui, sceneGui } from './guistuff'
import Ring from './Ring'
import FloorMirror from './FloorMirror'
import Mouse from '../utils/Mouse'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { clamp, lerp, map } from '../utils'

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

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#fafafa', 0.5)
ambientLight.visible = false
const dirLight = new THREE.DirectionalLight('#e5ffff', 4.0)
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
   shapeChunkOptions: {
      positionY: -6,
      outerOptions: {
         opacity: 0.5,
      },
      innerOptions: {
         radius: 3.7,
         metalness: 0.5,
         roughness: 0.5,
         detail: 1,
         vary: 0.2,
      },
   },
})
ring.position.set(0, 1, 0)

const mirror = new FloorMirror({
   sizes,
   mirrorColor: '#66ffff',
   floorColor: '#bf94ff',
   planeDist: 0.1,
   position: new THREE.Vector3(-25, -10, -25),
})
world.scene.add(ring, mirror)

/**
 * GUI
 */

sceneGui(world, gui, params)
let lightsFolder = gui.addFolder('Lights').close()
lightGui(ambientLight, lightsFolder)
lightGui(dirLight, lightsFolder)
lightGui(pointLight, lightsFolder)
mirrorGui(mirror, gui)
ringGui(ring, gui)
gui.close()

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
window.world = world
