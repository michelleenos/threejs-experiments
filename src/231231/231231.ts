import '../style.css'
import * as THREE from 'three'
import Sizes from '../utils/Sizes'
import Timer from '../utils/Timer'
import World from '../utils/World'
import { GUI } from 'lil-gui'
import { lightGui } from './guistuff'
import { Reflector } from 'three/examples/jsm/Addons.js'
import { map } from '../utils'
import { ShaderUtils } from '../utils/view-shaders'
import ShapeChunk from './ShapeChunk'

const params = {
   shapes: 18,
   shapesRadius: 50,
   startingAngle: 0,
   shapesRotation: Math.PI,
   shapeMetalness: 0.5,
   shapeRoughness: 0.5,
   coneRadius: 7,
   coneHeight: 20,
   coneSegments: 25,
   innerMetalness: 0.2,
   innerRoughness: 0.7,
   shapeOpacity: 0.5,
   redStart: 0.67,
   redEnd: 0.05,
   redOffset: 0.4,
   greenStart: -0.62,
   greenEnd: 0.23,
   greenOffset: 0.23,
   blueStart: 0,
   blueEnd: 1.04,
   blueOffset: 0.27,
   wonkyVary: 1,
   wonkyRadius: 4,
   cameraPos: new THREE.Vector3(0, 40, 100),
   clearColor: '#0c0911',
}

const gui = new GUI()

const timer = new Timer()
const sizes = new Sizes()

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
const dirLight = new THREE.DirectionalLight('#ffffff', 1.8)
dirLight.position.set(25, -50, -25)
// const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 5, '#00ff00')

const pointLight = new THREE.PointLight(0x8437ff, 9, 0, 0.1)
pointLight.position.set(-25, 50, 25)
world.scene.add(ambientLight, dirLight, pointLight)

/**
 * Shapes
 */

let outerGeometry: THREE.ConeGeometry

let shapeChunks: ShapeChunk[] = []
const shapesGroup = new THREE.Group()

const setShapes = () => {
   if (outerGeometry) {
      outerGeometry.dispose()
   }
   outerGeometry = new THREE.ConeGeometry(params.coneRadius, params.coneHeight, params.coneSegments)

   if (shapeChunks.length) {
      shapeChunks.forEach((shapeChunk) => {
         shapesGroup.remove(shapeChunk)
         shapeChunk.dispose()
      })
   }

   shapeChunks = []

   for (let i = 0; i < params.shapes; i++) {
      const shapeChunk = new ShapeChunk(outerGeometry, {
         outerOptions: {
            opacity: params.shapeOpacity,
            metalness: params.shapeMetalness,
            roughness: params.shapeRoughness,
            color: '#fff',
         },
         innerOptions: {
            geometryOptions: {
               radius: params.wonkyRadius,
               detail: 1,
               vary: params.wonkyVary,
            },
            materialOptions: {
               metalness: params.innerMetalness,
               roughness: params.innerRoughness,
            },
         },
      })

      shapeChunks.push(shapeChunk)
   }

   shapesGroup.add(...shapeChunks)
   setShapeProps()
}

const setShapeProps = () => {
   shapeChunks.forEach((shapeChunk, i) => {
      shapeChunk.outer.material.opacity = params.shapeOpacity
      shapeChunk.outer.material.metalness = params.shapeMetalness
      shapeChunk.outer.material.roughness = params.shapeRoughness

      const getColorVal = (start: number, end: number, offset: number) => {
         const param = i / params.shapes + offset
         return map(Math.sin(param * Math.PI * 2), -1, 1, start, end)
      }
      let red = getColorVal(params.redStart, params.redEnd, params.redOffset)
      let green = getColorVal(params.greenStart, params.greenEnd, params.greenOffset)
      let blue = getColorVal(params.blueStart, params.blueEnd, params.blueOffset)

      shapeChunk.outer.material.color = new THREE.Color(red, green, blue)
      shapeChunk.inner.material.color = new THREE.Color(red, green, blue)
      shapeChunk.outer.material.needsUpdate = true
      shapeChunk.inner.material.needsUpdate = true

      const angle = (i / params.shapes) * Math.PI * 2 + params.startingAngle
      shapeChunk.position.x = Math.cos(angle) * params.shapesRadius
      shapeChunk.position.z = Math.sin(angle) * params.shapesRadius
      shapeChunk.lookAt(0, 0, 0)
      shapeChunk.rotateX(params.shapesRotation)
   })
}

setShapes()
world.scene.add(shapesGroup)

/**
 * Floor
 */

const mirrorParams = {
   clipBias: 0.003,
   mirrorColor: '#66ffff',
   floorColor: '#bf94ff',
   floorOpacity: 0.2,
   floorMetalness: 1.1,
   floorRoughness: 0.63,
   positionY: -10,
   positionX: -25,
   positionZ: -25,
   planeDist: 0.1,
   rotationX: Math.PI * -0.5,
   rotationY: 0,
   rotationZ: 0,
   width: 100,
   height: 100,
}

let mirrorGeometry: THREE.PlaneGeometry
let mirror: Reflector
let floor: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>

const setMirror = () => {
   if (mirror) {
      world.scene.remove(mirror)
      mirror.dispose()
   }
   if (floor) {
      world.scene.remove(floor)
      floor.material.dispose()
   }
   if (mirrorGeometry) mirrorGeometry.dispose()

   mirrorGeometry = new THREE.PlaneGeometry(mirrorParams.width, mirrorParams.width)

   floor = new THREE.Mesh(
      mirrorGeometry,
      new THREE.MeshStandardMaterial({
         roughness: mirrorParams.floorRoughness,
         metalness: mirrorParams.floorMetalness,
         transparent: true,
         opacity: mirrorParams.floorOpacity,
         color: mirrorParams.floorColor,
      })
   )
   mirror = new Reflector(mirrorGeometry, {
      clipBias: mirrorParams.clipBias,
      textureWidth: sizes.width * window.devicePixelRatio,
      textureHeight: sizes.height * window.devicePixelRatio,
      color: mirrorParams.mirrorColor,
   })

   mirror.position.set(mirrorParams.positionX, mirrorParams.positionY, mirrorParams.positionZ)
   mirror.rotation.set(mirrorParams.rotationX, mirrorParams.rotationY, mirrorParams.rotationZ)

   floor.position.set(mirrorParams.positionX, mirrorParams.positionY, mirrorParams.positionZ)
   floor.translateY(mirrorParams.planeDist)
   floor.rotation.set(mirrorParams.rotationX, mirrorParams.rotationY, mirrorParams.rotationZ)

   world.scene.add(mirror, floor)
}
setMirror()

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
floorFolder.add(mirrorParams, 'positionY', -100, 100, 0.1).onChange(setMirror)
floorFolder.add(mirrorParams, 'positionX', -100, 100, 0.1).onChange(setMirror)
floorFolder.add(mirrorParams, 'positionZ', -100, 100, 0.1).onChange(setMirror)
// floorFolder.add(mirrorParams, 'rotationX', -Math.PI, Math.PI, 0.01).onChange(setMirror)
// floorFolder.add(mirrorParams, 'rotationY', -Math.PI, Math.PI, 0.01).onChange(setMirror)
// floorFolder.add(mirrorParams, 'rotationZ', -Math.PI, Math.PI, 0.01).onChange(setMirror)
floorFolder.add(mirrorParams, 'width', 0, 1000, 1).onChange(setMirror)
floorFolder.add(mirrorParams, 'height', 0, 1000, 1).onChange(setMirror)
floorFolder.addColor(mirrorParams, 'mirrorColor').onChange(setMirror)
floorFolder.add(mirrorParams, 'clipBias', 0, 0.1, 0.0001).onChange(setMirror)
floorFolder.add(mirrorParams, 'floorOpacity', 0, 1, 0.01).onChange(setMirror)
floorFolder.addColor(mirrorParams, 'floorColor').onChange(setMirror)
floorFolder.add(mirrorParams, 'floorRoughness', 0, 3, 0.01).onChange(setMirror)
floorFolder.add(mirrorParams, 'floorMetalness', 0, 3, 0.01).onChange(setMirror)
floorFolder.add(mirrorParams, 'planeDist', -10, 5, 0.01).onChange(setMirror)
floorFolder.close()

const shapesFolder = gui.addFolder('Shapes')
shapesFolder.add(params, 'shapesRadius', 0, 100, 1).onChange(setShapes)
shapesFolder.add(params, 'shapes', 0, 100, 1).onChange(setShapes)
shapesFolder.add(params, 'startingAngle', 0, Math.PI * 2, 0.01).onChange(setShapeProps)
shapesFolder.add(params, 'shapesRotation', 0, Math.PI * 2, 0.01).onChange(setShapeProps)
shapesFolder.add(params, 'shapeMetalness', 0, 1, 0.01).onChange(setShapeProps)
shapesFolder.add(params, 'shapeRoughness', 0, 1, 0.01).onChange(setShapeProps)
shapesFolder.add(params, 'shapeOpacity', 0, 1, 0.01).onChange(setShapeProps)
shapesFolder.add(params, 'innerMetalness', 0, 1, 0.01).onChange(setShapeProps)
shapesFolder.add(params, 'innerRoughness', 0, 1, 0.01).onChange(setShapeProps)
shapesFolder.add(params, 'wonkyVary', 0, 5, 0.1).onChange(setShapes)
shapesFolder.add(params, 'wonkyRadius', 0, 5, 0.1).onChange(setShapes)
shapesFolder.add(params, 'coneRadius', 0, 50, 0.1).onChange(setShapes)
shapesFolder.add(params, 'coneHeight', 0, 50, 0.1).onChange(setShapes)
shapesFolder.add(params, 'coneSegments', 0, 50, 1).onChange(setShapes)

const colorsFolder = gui.addFolder('Shape Colors')
colorsFolder.add(params, 'redStart', -1, 2, 0.01)
colorsFolder.add(params, 'redEnd', -1, 2, 0.01)
colorsFolder.add(params, 'redOffset', 0, 1, 0.01)
colorsFolder.add(params, 'greenStart', -1, 2, 0.01)
colorsFolder.add(params, 'greenEnd', -1, 2, 0.01)
colorsFolder.add(params, 'greenOffset', 0, 1, 0.01)
colorsFolder.add(params, 'blueStart', -1, 2, 0.01)
colorsFolder.add(params, 'blueEnd', -1, 2, 0.01)
colorsFolder.add(params, 'blueOffset', 0, 1, 0.01)
colorsFolder.onChange(setShapeProps)

gui.close()

// new ShaderUtils(world.renderer, world.scene, world.camera, shapes[0].inner)

let wheelDelta = 0
window.addEventListener('wheel', (e) => {
   console.log(e)
   if (Math.abs(e.deltaY) > Math.abs(wheelDelta)) {
      wheelDelta = e.deltaY
   }
})

// Animate
function animate() {
   const time = timer.elapsed

   shapeChunks.forEach((shapeChunk) => {
      shapeChunk.inner.tick(time * 0.001)
   })

   if (wheelDelta !== 0) {
      let rotationCurrent = shapesGroup.rotation.y
      let rotationTarget = rotationCurrent + wheelDelta * 0.0005
      shapesGroup.rotation.y = rotationTarget

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
