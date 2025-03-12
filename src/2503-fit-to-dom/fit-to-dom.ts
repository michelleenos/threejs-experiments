import * as THREE from 'three'
import '../style.css'
import Sizes from '../utils/sizes'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import GUI from 'lil-gui'

THREE.ColorManagement.enabled = true

const params = {
   shapeX: 2,
   shapeY: 1,
   shapeZ: 1,
}

const sizes = new Sizes()

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.outputColorSpace = THREE.SRGBColorSpace

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 300)
camera.position.set(0, 0, 2)
const scene = new THREE.Scene()
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

document.body.appendChild(renderer.domElement)

/**
 * Set to DOM
 */

const setCamera = () => {
   bbox.setFromObject(shape)
   bbox.getSize(boxSize)

   let fov = camera.fov * (Math.PI / 180) // in radians
   let fovh = 2 * Math.atan(Math.tan(fov / 2) * camera.aspect)
   let dx = boxSize.z / 2 + Math.abs(boxSize.x / 2 / Math.tan(fovh / 2))
   let dy = boxSize.z / 2 + Math.abs(boxSize.y / 2 / Math.tan(fov / 2))
   let cameraZ = Math.max(dx, dy)

   camera.position.set(0, 0, cameraZ)
   camera.updateProjectionMatrix()
}

const setTarget = () => {
   let el = document.querySelector('.dom-shape') as HTMLElement
   let rect = el.getBoundingClientRect()

   bbox.setFromObject(shape)
   bbox.getSize(boxSize)

   let fov = camera.fov
   let camZ = camera.position.z
   let z = (sizes.height / Math.tan(fov * (Math.PI / 360))) * 0.5
   let scale = camZ / z

   //    let scaleX = sizes.width * scale * aspect
   //    let scaleY = sizes.height * scale
   shape.scale.set(rect.width * scale, rect.height * scale, 1)
   shape.position.set(
      (rect.left + rect.width * 0.5 - sizes.width * 0.5) * scale,
      (-rect.top - rect.height * 0.5 + sizes.height * 0.5) * scale,
      boxSize.z * -0.5
   )
   //    shape.scale.set(sizes.width * scale, sizes.height * scale, 1)
}

/**
 * Shapes
 */

const shape = new THREE.Mesh()
const bbox = new THREE.Box3()
const boxSize = new THREE.Vector3()
scene.add(shape)
const mat = new THREE.MeshNormalMaterial()
shape.material = mat

const makeShape = () => {
   if (shape.geometry) {
      shape.geometry.dispose()
   }
   const geo = new THREE.BoxGeometry(params.shapeX, params.shapeY, params.shapeZ)
   shape.geometry = geo
   bbox.setFromObject(shape)
   bbox.getSize(boxSize)
}
makeShape()

/**
 * Resize
 */

const onResize = () => {
   console.log('on resize')
   camera.aspect = sizes.width / sizes.height
   camera.updateProjectionMatrix()
   renderer.setSize(sizes.width, sizes.height)
   renderer.setPixelRatio(sizes.pixelRatio)
}

sizes.on('resize', onResize)

onResize()

/**
 * GUI
 */

let gui = new GUI()
let debg = {
   setTarget,
   setCamera,
}

gui.add(debg, 'setTarget')
gui.add(debg, 'setCamera')
let boxFolder = gui.addFolder('bounding box')
boxFolder.add(boxSize, 'x').listen().decimals(2).disable()
boxFolder.add(boxSize, 'y').listen().decimals(2).disable()
boxFolder.add(boxSize, 'z').listen().decimals(2).disable()

let camFolder = gui.addFolder('camera')
camFolder.add(camera.position, 'x').listen().decimals(2).disable()
camFolder.add(camera.position, 'y').listen().decimals(2).disable()
camFolder.add(camera.position, 'z').listen().decimals(2).disable()

let shapeFolder = gui.addFolder('shape size').onChange(makeShape)
shapeFolder.add(params, 'shapeX', 0.1, 10, 0.1)
shapeFolder.add(params, 'shapeY', 0.1, 10, 0.1)
shapeFolder.add(params, 'shapeZ', 0.1, 10, 0.1)
/**
 * Animation
 */

const animate = () => {
   renderer.render(scene, camera)
   controls.update()

   requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
