import '../style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import GUI from 'lil-gui'
import { Pane } from 'tweakpane'

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

const ambiLight = new THREE.AmbientLight(0x222222)
scene.add(ambiLight)
const dirLight = new THREE.DirectionalLight(0xffffff)
dirLight.position.set(1, 0, 1)
scene.add(dirLight)

const shapes = createShapes()
scene.add(shapes)

const controls = new OrbitControls(camera, renderer.domElement)
controls.zoomSpeed = 0.5
controls.update()

const pane = new Pane()

let dirLightFolder = pane.addFolder({ title: 'Directional light' })
dirLightFolder.addInput(dirLight, 'position', { x: { step: 1 }, y: { step: 1 }, z: { step: 1 } })
dirLightFolder.addInput(dirLight, 'color', { color: { type: 'float' } })

let ambLightFolder = pane.addFolder({ title: 'Ambient Light' })
ambLightFolder.addInput(ambiLight, 'color', { color: { type: 'float', expanded: true } })

function wonkyShape(radius = 5, vary = 1, color = 0xff3a20): THREE.Mesh {
   const geometry = new THREE.BoxGeometry(radius, radius, radius, 2, 2, 2)
   // last 3 params are number of segmenets ... like how many triangles is the side divided into
   // more segments = more triangles = more vertices = funkier shapes (but also more processing)
   // with just 1 segment on each, it looks like a cube that's been wiggled a bit
   // with more segments, it's less & less like a cube
   // try other geometries too:
   // const geometry = new THREE.OctahedronGeometry(radius, 1)

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

   geometry.computeVertexNormals() // updates colors/shading of the object with new vertices

   const material = new THREE.MeshPhongMaterial({
      color,
      flatShading: false,
   })

   const mesh = new THREE.Mesh(geometry, material)
   return mesh
}

function createShapes() {
   let object = new THREE.Object3D()

   for (let i = 0; i < 100; i++) {
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
