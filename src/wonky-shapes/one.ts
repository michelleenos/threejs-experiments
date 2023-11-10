import '../style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FolderApi, Pane } from 'tweakpane'

function map(num: number, inMin: number, inMax: number, outMin: number, outMax: number) {
   return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

function random(start = 0, end = 1) {
   return map(Math.random(), 0, 1, start, end)
}

const mouse = new THREE.Vector2()
const sizes = new THREE.Vector2(window.innerWidth, window.innerHeight)
const BG_COLOR = 0xe5e5e5

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.x, sizes.y)
renderer.setClearColor(BG_COLOR)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

/**
 * Camera
 */
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(40, sizes.x / sizes.y, 1, 300)
camera.position.set(-100, 0, -50)

/**
 * Controls
 */
const controls = new OrbitControls(camera, renderer.domElement)
controls.zoomSpeed = 0.5
controls.autoRotate = true
controls.autoRotateSpeed = 0.5
controls.enableDamping = true
controls.update()

// const pane = new Pane()

/**
 * Lights
 */

// const ambiLight = new THREE.AmbientLight(0x222222)

// dirLight.position.set(50, 50, 1)
// scene.add(dirLight)

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0f0f0f, 3)
hemiLight.position.set(0, 20, 0)
scene.add(hemiLight)

/**
 * Shapes
 */

function wonkyShape(radius = 5, vary = 1, color = 0xff3a20): THREE.Mesh {
   // const geometry = new THREE.BoxGeometry(radius, radius, radius, 2, 2, 2)
   const geometry = new THREE.OctahedronGeometry(radius, 1)
   // last 3 params are number of segments ... like how many triangles is the side divided into
   // more segments = more triangles = more vertices = funkier shapes (but also more processing)
   // with just 1 segment on each, it looks like a cube that's been wiggled a bit
   // with more segments, it's less & less like a cube
   // try other geometries too:
   // const geometry = new THREE.OctahedronGeometry(radius, 1)

   const positions = geometry.getAttribute('position') as THREE.BufferAttribute
   // positions are all the vertices on the shape.
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

   geometry.computeVertexNormals() // updates colors/shading of the object with new vertices

   const material = new THREE.MeshLambertMaterial({
      color,
   })

   const mesh = new THREE.Mesh(geometry, material)
   return mesh
}

let shapes = new THREE.Object3D()
let z = -30
while (z <= 32) {
   let x = -30
   while (x <= 32) {
      let mapped = map(Math.abs(z) + Math.abs(x), 0, 62, 6, 2)
      let mesh = wonkyShape(mapped)
      mesh.position.z = z
      mesh.position.x = x
      mesh.position.y = random(-30, 30)

      shapes.add(mesh)
      let dist = Math.abs(x)
      x += dist > 15 ? 15 : dist > 10 ? 12 : 10
   }

   let dist = Math.abs(z)
   z += dist > 15 ? 15 : dist > 10 ? 12 : 10
}
scene.add(shapes)

/**
 * Animate
 */

function onMouseMove(event: MouseEvent) {
   mouse.x = (event.clientX / window.innerWidth) * 2 - 1
   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

function onWindowResize() {
   sizes.x = window.innerWidth
   sizes.y = window.innerHeight
   camera.aspect = sizes.x / sizes.y
   camera.updateProjectionMatrix()
   renderer.setSize(sizes.x, sizes.y)
}

function animate() {
   shapes.children.forEach((shape) => {
      shape.rotation.x = mouse.x * 0.5 + shape.position.x
      shape.rotation.y = mouse.y * 0.5 - shape.position.y
      shape.rotation.z = (mouse.x + mouse.y) * 0.5 + shape.position.z
   })

   controls.update()
   renderer.render(scene, camera)
   requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
document.addEventListener('mousemove', onMouseMove)
window.addEventListener('resize', onWindowResize)
