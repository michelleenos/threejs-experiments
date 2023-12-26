import '../style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { ParametricGeometry } from 'three/examples/jsm/Addons.js'
import Sizes from '../utils/Sizes'
import Timer from '../utils/Timer'
import World from '../utils/World'
import { fract, map } from '../utils'
import vertexShader from './vert.glsl'
import fragmentShader from './frag.glsl'

const timer = new Timer()
const sizes = new Sizes()

const world = new World(sizes)
world.camera.position.set(0, 10, 100)

// const params = {
//    xMin: -10,
//    xMax: 10,
//    yMin: -10,
//    yMax: 10,
//    stacks: 100,
//    slices: 100,
// }

// Lights
const ambientLight = new THREE.AmbientLight('#0095ff', 2)
const directionalLight = new THREE.DirectionalLight('#fff', 3)
world.scene.add(ambientLight, directionalLight)

// Geometries
const material = new THREE.ShaderMaterial({
   // color: '#fff',
   vertexColors: true,
   vertexShader,
   fragmentShader,
   side: THREE.DoubleSide,
})
// const graphGeometry = new ParametricGeometry(
//    (u, v, target) => {
//       const x = u * (params.xMax - params.xMin) + params.xMin
//       const y = v * (params.yMax - params.yMin) + params.yMin
//       const z = Math.sin(x * y)
//       target.set(x, y, z)
//    },
//    100,
//    100
// )
// const graph = new THREE.Mesh(graphGeometry, material)
// graph.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
// world.scene.add(graph)

// // GUI
// const gui = new GUI()
// gui.add(params, 'xMin', -10, 0)
// gui.add(params, 'xMax', 0, 10)
// gui.add(params, 'yMin', -10, 0)
// gui.add(params, 'yMax', 0, 10)
// gui.add(params, 'stacks', 0, 200).step(1)
// gui.add(params, 'slices', 0, 200).step(1)

// gui.onFinishChange(() => {
//    graph.geometry.dispose()
//    graph.geometry = new ParametricGeometry(
//       (u, v, target) => {
//          const x = u * (params.xMax - params.xMin) + params.xMin
//          const y = v * (params.yMax - params.yMin) + params.yMin
//          const z = Math.sqrt(x * x + y * y)
//          target.set(x, y, z)
//       },
//       params.slices,
//       params.stacks
//    )
// })

class Rings {
   number = 8
   meshes: THREE.Mesh[] = []
   space = 0.05
   radius = 10

   constructor() {
      this.setup()
      this.setColors()
   }

   setup() {
      for (let i = 0; i < this.number; i++) {
         const geometry = new THREE.TorusGeometry(this.radius, 0.1, 20, 100)
         const mesh = new THREE.Mesh(geometry, material)
         mesh.rotateX(Math.PI / 2)
         this.meshes.push(mesh)
      }
   }

   setColors() {
      this.meshes.forEach((mesh, i) => {
         const step = i / this.number
         const positions = mesh.geometry.attributes.position as THREE.BufferAttribute
         const count = positions.count
         let colors = []
         let color = new THREE.Color()

         for (let j = 0; j < count; j++) {
            let y = positions.getY(j)

            // let r = map(x, this.radius * -1, this.radius, step, 1)
            let r = step
            let g = map(y, this.radius * -1, this.radius, 0, 1)

            color.setRGB(r, g, 1 - step)
            colors.push(color.r, color.g, color.b)
         }

         mesh.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
      })
   }

   update(time: number) {
      time *= 0.0001

      const a = map(fract(time), 0, 1, -1, 1)

      this.meshes.forEach((mesh, i) => {
         const pos = ((a + i * this.space) * Math.PI) % (Math.PI * 2)
         mesh.position.y = Math.sin(pos) * this.radius

         const scale = map(Math.cos(pos), -1, 1, 0.1, 1)
         mesh.scale.set(scale, scale, scale)

         // mesh.rotation.z = pos * 2
      })
   }
}

const rings = new Rings()
world.scene.add(...rings.meshes)

// Helpers
const axesHelper = new THREE.AxesHelper(20)
world.scene.add(axesHelper)

function animate() {
   rings.update(timer.elapsed)
   //    const elapsedTime = clock.getElapsedTime() * 0.25
   //    const a = map(fract(time), 0, 1, -1, 1)

   world.render()
}

timer.on('tick', animate)
