import '../style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FolderApi, Pane } from 'tweakpane'

function lerp(start: number, end: number, amt: number) {
   return (1 - amt) * start + amt * end
}

function map(num: number, inMin: number, inMax: number, outMin: number, outMax: number) {
   return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

function random(start = 0, end = 1) {
   return map(Math.random(), 0, 1, start, end)
}

const clock = new THREE.Clock()
const mouse = new THREE.Vector2()
const sizes = new THREE.Vector2(window.innerWidth, window.innerHeight)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.x, sizes.y)
renderer.setClearColor(0xe5e5e5)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

/**
 * Fog
 */

const fog = new THREE.Fog('#e5e5e5', 0, 500)
scene.fog = fog

/**
 * Camera
 */
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(70, sizes.x / sizes.y, 1, 1000)
camera.position.set(0, 0, 200)

/**
 * Lights
 */

const ambiLight = new THREE.AmbientLight('#4c4c59', 1)
scene.add(ambiLight)

const dirLight = new THREE.DirectionalLight('#ffffff', 2)
dirLight.position.set(100, 100, 100)
dirLight.lookAt(scene.position)
scene.add(dirLight)

/**
 * Shapes
 */

function wonkyShape(radius = 5, vary = 2, color = 0xffffff): THREE.Mesh {
   // const geometry = new THREE.BoxGeometry(radius, radius, radius, 2, 2, 2)
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

   const material = new THREE.MeshPhongMaterial({
      color,
      flatShading: false,
   })

   return new THREE.Mesh(geometry, material)
}

let shapes = new THREE.Object3D()
for (let i = 0; i < 100; i++) {
   const mesh = wonkyShape(5)
   mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()
   mesh.position.multiplyScalar(90 + Math.random() * 400)
   mesh.rotation.set(random(Math.PI), random(Math.PI), random(Math.PI))
   mesh.scale.x = mesh.scale.y = mesh.scale.z = random(0.1, 5)
   shapes.add(mesh)
}
scene.add(shapes)

/**
 * Animate
 */

function onMouseMove(event: MouseEvent) {
   mouse.x = (event.clientX / sizes.x) * 2 - 1
   mouse.y = -(event.clientY / sizes.y) * 2 + 1
}

function onWindowResize() {
   sizes.x = window.innerWidth
   sizes.y = window.innerHeight
   camera.aspect = sizes.x / sizes.y
   camera.updateProjectionMatrix()
   renderer.setSize(sizes.x, sizes.y)
}

function animate() {
   let elapsedTime = clock.getElapsedTime()

   shapes.children.forEach((shape) => {
      shape.rotation.x = shape.position.x + elapsedTime * 0.1
      shape.rotation.y = shape.position.y - elapsedTime * 0.1
      shape.rotation.z = shape.position.z + elapsedTime * 0.2
   })

   let newPosX = mouse.x * 100
   let newPosY = map(mouse.y, -1, 1, -30, 300)
   let mousePosZ = map(mouse.y, -1, 1, 100, 500)

   camera.position.set(
      lerp(camera.position.x, newPosX, 0.05),
      lerp(camera.position.y, newPosY, 0.05),
      lerp(camera.position.z, mousePosZ, 0.05)
   )

   camera.lookAt(scene.position)

   shapes.rotation.x = elapsedTime * 0.07
   shapes.rotation.y = elapsedTime * 0.07

   renderer.render(scene, camera)
   requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
document.addEventListener('mousemove', onMouseMove)
window.addEventListener('resize', onWindowResize)
