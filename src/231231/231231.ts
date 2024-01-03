import '../style.css'
import * as THREE from 'three'
import Sizes from '../utils/Sizes'
import Timer from '../utils/Timer'
import World from '../utils/World'
import { GUI } from 'lil-gui'
import { lightGui } from './guistuff'
import Floor from './Floor'
import { Reflector } from 'three/examples/jsm/Addons.js'
import { map } from '../utils'

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
   clearColor: '#0c0911',
}

const gui = new GUI()

const timer = new Timer()
const sizes = new Sizes()

const world = new World(sizes)
world.camera.position.set(0, 30, 100)
world.renderer.setClearColor(params.clearColor)
world.camera.far = 5000

const loader = new THREE.TextureLoader()

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
const pointLightHelper = new THREE.PointLightHelper(pointLight, 5, '#ff00ff')
world.scene.add(ambientLight, dirLight, pointLight)

function wonkyShape(radius = 5, vary = 2) {
   const geometry = new THREE.OctahedronGeometry(radius, 1)

   const positions = geometry.getAttribute('position') as THREE.BufferAttribute
   const count = positions.count
   let point = new THREE.Vector3()
   let verticesMap: { [key: string]: { x: number; y: number; z: number } } = {}

   for (let i = 0; i < count; i++) {
      point.fromBufferAttribute(positions, i)
      let key = [point.x, point.y, point.z].join(',')

      if (!verticesMap[key]) {
         verticesMap[key] = {
            x: point.x + Math.random() * vary,
            y: point.y + Math.random() * vary,
            z: point.z + Math.random() * vary,
         }
      }

      let { x, y, z } = verticesMap[key]
      positions.setXYZ(i, x, y, z)
   }

   geometry.computeVertexNormals()
   return geometry
}

type WonkyShape = ReturnType<typeof wonkyShape>

let outerGeometry: THREE.ConeGeometry
type Shape = {
   outer: THREE.Mesh<THREE.ConeGeometry, THREE.MeshStandardMaterial>
   inner: THREE.Mesh<WonkyShape, THREE.MeshStandardMaterial>
   group: THREE.Group
}
let shapes: Shape[] = []
const shapesGroup = new THREE.Group()

const setShapes = () => {
   if (outerGeometry) {
      outerGeometry.dispose()
   }
   outerGeometry = new THREE.ConeGeometry(params.coneRadius, params.coneHeight, params.coneSegments)
   if (shapes.length) {
      shapes.forEach((shape) => {
         shapesGroup.remove(shape.group)
         shape.outer.material.dispose()
         shape.inner.material.dispose()
      })
      shapes = []
   }

   for (let i = 0; i < params.shapes; i++) {
      const outer = new THREE.Mesh(
         outerGeometry,
         new THREE.MeshStandardMaterial({
            opacity: params.shapeOpacity,
            metalness: params.shapeMetalness,
            roughness: params.shapeRoughness,
            side: THREE.DoubleSide,
            transparent: true,
         })
      )
      const innerGeometry = wonkyShape(params.wonkyRadius, params.wonkyVary)
      const innerMaterial = new THREE.MeshStandardMaterial({
         metalness: params.innerMetalness,
         roughness: params.innerRoughness,
      })
      // innerMaterial.onBeforeCompile = (shader) => {
      //    console.log(shader)
      // }

      const inner = new THREE.Mesh(innerGeometry, innerMaterial)
      const group = new THREE.Group()
      group.add(outer, inner)
      inner.position.y = -5

      shapes.push({
         outer,
         inner,
         group,
      })
   }

   shapesGroup.add(...shapes.map((shape) => shape.group))
   setShapeProps()
}

const setShapeProps = () => {
   shapes.forEach((shape, i) => {
      shape.outer.material.opacity = params.shapeOpacity
      shape.outer.material.metalness = params.shapeMetalness
      shape.outer.material.roughness = params.shapeRoughness

      const getColorVal = (start: number, end: number, offset: number) => {
         const param = i / params.shapes + offset
         return map(Math.sin(param * Math.PI * 2), -1, 1, start, end)
      }
      let red = getColorVal(params.redStart, params.redEnd, params.redOffset)
      let green = getColorVal(params.greenStart, params.greenEnd, params.greenOffset)
      let blue = getColorVal(params.blueStart, params.blueEnd, params.blueOffset)

      // let redInner = getColorVal(params.redStart, params.redEnd, params.redOffset + 0.5)
      // let greenInner = getColorVal(params.greenStart, params.greenEnd, params.greenOffset + 0.5)
      // let blueInner = getColorVal(params.blueStart, params.blueEnd, params.blueOffset + 0.5)

      shape.outer.material.color = new THREE.Color(red, green, blue)
      // shape.inner.material.color = new THREE.Color(redInner, greenInner, blueInner)
      shape.inner.material.color = new THREE.Color(red, green, blue)
      shape.outer.material.needsUpdate = true
      shape.inner.material.needsUpdate = true

      const angle = (i / params.shapes) * Math.PI * 2 + params.startingAngle
      shape.group.position.x = Math.cos(angle) * params.shapesRadius
      shape.group.position.z = Math.sin(angle) * params.shapesRadius
      shape.group.lookAt(0, 0, 0)
      shape.group.rotateX(params.shapesRotation)
   })
}

setShapes()
world.scene.add(shapesGroup)

/**
 * Floor
 */
// const floor = new THREE.Mesh(
//    new THREE.PlaneGeometry(1000, 1000),
//    new THREE.MeshStandardMaterial({
//       roughness: 0,
//       metalness: 0.5,
//       transparent: true,
//       opacity: 0.5,
//       color: '#ffffff',
//    })
// )
// floor.receiveShadow = true
// floor.rotateX(-Math.PI / 2)

const mirrorParams = {
   clipBias: 0.003,
   mirrorColor: '#66ffff',
   floorColor: '#bf94ff',
   floorOpacity: 0.2,
   floorMetalness: 1.1,
   floorRoughness: 0.63,
   positionY: -10,
   positionX: -25,
   positionZ: 25,
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
// world.scene.add(floor)
setMirror()

/**
 * GUI
 */
gui.addColor(params, 'clearColor').onChange((val: string) => {
   world.renderer.setClearColor(val)
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

// shapes[0].inner.
// Animate
function animate(time: number) {
   shapes.forEach(({ inner, outer }) => {
      inner.rotateY(0.01)
      inner.rotateZ(0.01)
      inner.rotateX(-0.01)
   })
   world.render()
}

timer.on('tick', animate)
