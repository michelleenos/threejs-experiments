import '../style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FolderApi, Pane } from 'tweakpane'

const BG_COLOR = 0xe5e5e5

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(BG_COLOR)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
   70,
   window.innerWidth / window.innerHeight,
   1,
   1000
)
camera.position.z = 400

const shapes = createShapes()
scene.add(shapes)

const controls = new OrbitControls(camera, renderer.domElement)
controls.zoomSpeed = 0.5
controls.update()

const pane = new Pane()

makeDirectionalLight(scene, pane.addFolder({ title: 'Directional light' }))
makeAmbientLight(scene, pane.addFolder({ title: 'Ambient Light' }))

function makeAmbientLight(scene: THREE.Scene, folder?: FolderApi) {
   const light = new THREE.AmbientLight(0x222222)
   if (folder) {
      folder.addInput(light, 'color', { color: { type: 'float', expanded: true } })
   }
   scene.add(light)
   return light
}

function makeDirectionalLight(scene: THREE.Scene, folder?: FolderApi) {
   const light = new THREE.DirectionalLight(0xffffff)
   light.position.set(1, 0, 1)
   if (folder) {
      folder.addInput(light, 'position', { x: { step: 1 }, y: { step: 1 }, z: { step: 1 } })
      folder.addInput(light, 'color', { color: { type: 'float' } })
   }
   scene.add(light)
   return light
}

function wonkyShape(radius = 5, vary = 1, color = 0xff3a20): THREE.Mesh {
   const geometry = new THREE.BoxGeometry(radius, radius, radius, 2, 2, 2)
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

   const material = new THREE.MeshPhongMaterial({
      color,
      flatShading: false,
   })

   const mesh = new THREE.Mesh(geometry, material)
   return mesh
}

function createShapes(n = 100) {
   let object = new THREE.Object3D()

   for (let i = 0; i < n; i++) {
      const mesh = wonkyShape()
      mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()
      mesh.position.multiplyScalar(Math.random() * 400)
      mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2)
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 5

      object.add(mesh)
   }

   return object
}

function onWindowResize() {
   camera.aspect = window.innerWidth / window.innerHeight
   camera.updateProjectionMatrix()
   renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
   controls.update()
   renderer.render(scene, camera)
   requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
window.addEventListener('resize', onWindowResize)
