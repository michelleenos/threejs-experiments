import '../style.css'
import * as THREE from 'three'
import Sizes from '../utils/Sizes'
import Timer from '../utils/Timer'
import World from '../utils/World'
import { GUI } from 'lil-gui'
import { lightGui } from './guistuff'
import Ring from './Ring'
import FloorMirror from './FloorMirror'
import Mouse from '../utils/Mouse'

const params = {
   cameraPos: new THREE.Vector3(0, 40, 100),
   clearColor: '#0c0911',
}

const gui = new GUI()

const timer = new Timer()
const sizes = new Sizes()
const mouse = new Mouse(sizes)
const world = new World(sizes)

world.camera.position.copy(params.cameraPos)
world.renderer.setClearColor(params.clearColor)
world.camera.far = 500
world.controls.maxPolarAngle = Math.PI * 0.5
world.controls.minPolarAngle = Math.PI * 0

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#fafafa', 0.5)
ambientLight.visible = false
const dirLight = new THREE.DirectionalLight('#e5ffff', 4.0)
dirLight.position.set(-150, -6, -30)
// const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 5, '#00ff00')

const pointLight = new THREE.PointLight(0x8437ff, 9, 0, 0.1)
pointLight.position.set(-10, 80, 45)
world.scene.add(ambientLight, dirLight, pointLight)

/**
 * Shapes
 */

const ring = new Ring(world.camera, mouse, {
   coneRadius: 7,
   coneHeight: 20,
   coneSegments: 100,
   count: 18,
   ringRadius: 50,
   shapeChunkOptions: {
      outerOptions: {
         opacity: 0.5,
      },
      innerOptions: {
         radius: 4,
         metalness: 0.5,
         roughness: 0.5,
         detail: 1,
         vary: 0.2,
      },
   },
})
world.scene.add(ring)

/**
 * Floor
 */

const mirrorParams = {
   mirrorColor: '#66ffff',
   floorColor: '#bf94ff',
}

const mirror = new FloorMirror({
   sizes,
   mirrorColor: mirrorParams.mirrorColor,
   floorColor: mirrorParams.floorColor,
   planeDist: 0.1,
   position: new THREE.Vector3(-25, -10, -25),
})
world.scene.add(mirror)

/**
 * GUI
 */
gui.addColor(params, 'clearColor').onChange((val: string) => {
   world.renderer.setClearColor(val)
})

world.controls.enabled = false
gui.add(world.controls, 'enabled')
   .name('controls')
   .onChange((val: boolean) => {
      if (!val) world.camera.position.copy(params.cameraPos)
   })

let lightsFolder = gui.addFolder('Lights').close()
lightGui(ambientLight, lightsFolder)
lightGui(dirLight, lightsFolder)
lightGui(pointLight, lightsFolder)

const floorFolder = gui.addFolder('Floor/Mirror')
floorFolder.add(mirror.floor.material, 'opacity', 0, 1, 0.01)
floorFolder.add(mirror.floor.material, 'roughness', 0, 3, 0.01).name('floorRoughness')
floorFolder.add(mirror.floor.material, 'metalness', 0, 3, 0.01).name('floorMetalness')
floorFolder
   .addColor(mirror.floor.material, 'color')
   .name('floorColor')
   .onChange((val: string) => {
      mirror.floor.material.color.set(val)
   })
floorFolder.add(mirror, 'planeDist', -10, 5, 0.01)
floorFolder.add(mirror.position, 'x', -100, 100, 0.1)
floorFolder.add(mirror.position, 'y', -100, 100, 0.1)
floorFolder.add(mirror.position, 'z', -100, 100, 0.1)
floorFolder
   .add(mirror.size, 'x', 0, 1000, 0.1)
   .name('width')
   .onChange((val: number) => {
      mirror.size = new THREE.Vector2(val, mirror.size.y)
   })
floorFolder
   .add(mirror.size, 'y', 0, 1000, 0.1)
   .name('height')
   .onChange((val: number) => {
      mirror.size = new THREE.Vector2(mirror.size.x, val)
   })
floorFolder.addColor(mirror, 'mirrorColor')

floorFolder.close()

const shapesFolder = gui.addFolder('Shapes').close()

shapesFolder.add(ring, 'shapeMetalness', 0, 1, 0.01)
shapesFolder.add(ring, 'shapeRoughness', 0, 1, 0.01)
shapesFolder.add(ring, 'shapeOpacity', 0, 1, 0.01)
shapesFolder.add(ring, 'innerMetalness', 0, 1, 0.01)
shapesFolder.add(ring, 'innerRoughness', 0, 1, 0.01)
shapesFolder.add(ring, 'wonkyVary', 0, 5, 0.1)
shapesFolder.add(ring, 'wonkyRadius', 0, 5, 0.1)
shapesFolder.add(ring, 'coneRadius', 0, 50, 0.1)
shapesFolder.add(ring, 'coneHeight', 0, 50, 0.1)
shapesFolder.add(ring, 'coneSegments', 0, 200, 1)
shapesFolder.add(ring, 'ringRadius', 0, 100, 1)
shapesFolder.add(ring, 'count', 0, 100, 1)

const colorsFolder = gui.addFolder('Shape Colors').close()
for (let color of Object.keys(ring.colorOpts) as ['red', 'green', 'blue']) {
   for (let opt of Object.keys(ring.colorOpts[color]) as ['start', 'end', 'offset']) {
      colorsFolder
         .add(ring.colorOpts[color], opt, -1, 2, 0.01)
         .name(`${color} ${opt}`)
         .onChange((val: number) => ring.updateColorOpt(color, opt, val))
   }
}

gui.close()

// new ShaderUtils(world.renderer, world.scene, world.camera, shapes[0].inner)

let wheelDelta = 0
window.addEventListener('wheel', (e) => {
   // console.log(e)
   if (Math.abs(e.deltaY) > Math.abs(wheelDelta)) {
      wheelDelta = e.deltaY
   }
})

// Animate
function animate() {
   const time = timer.elapsed

   ring.tick(time)

   if (wheelDelta !== 0) {
      let rotationCurrent = ring.rotation.y
      let rotationTarget = rotationCurrent + wheelDelta * 0.0005
      ring.rotation.y = rotationTarget

      if (Math.abs(rotationTarget - rotationCurrent) < 0.00001) {
         wheelDelta = 0
      } else if (wheelDelta > 0) {
         wheelDelta -= 1
      } else if (wheelDelta < 0) {
         wheelDelta += 1
      }
   }

   world.render()
}

timer.on('tick', animate)
