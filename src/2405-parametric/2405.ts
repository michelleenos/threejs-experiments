import '../style.css'
import * as THREE from 'three'
import { ParametricGeometry } from 'three/examples/jsm/Addons.js'
import Sizes from '../utils/sizes'
import World from '../utils/World'

// https://codepen.io/wakana-k/pen/poBBRmN

const sizes = new Sizes()
const world = new World(sizes, true)

world.renderer.setClearColor('#ffffff')
world.camera.position.z = 10

// https://mathworld.wolfram.com/Seashell.html
function seashell(u: number, v: number, target: THREE.Vector3) {
   u *= Math.PI * 6 // 6 can change, determines how many spirals
   v *= Math.PI * 2

   let epow = Math.pow(Math.E, u / (6 * Math.PI))
   let cossq = Math.cos(v / 2) * Math.cos(v / 2)

   let x = 2 * (1 - epow) * Math.cos(u) * cossq
   let y = 2 * (-1 + epow) * Math.sin(u) * cossq
   let z = 1 - Math.pow(Math.E, u / (3 * Math.PI)) - Math.sin(v) + epow * Math.sin(v)

   target.set(x, y, z)
}

function seashell2(u: number, v: number, target: THREE.Vector3) {
   v *= 2 * Math.PI
   u *= 2 * Math.PI
   let a = 0.5
   let b = 5
   let c = 0.1
   let n = 5

   let val1 = 1 - v / (2 * Math.PI)
   let val2 = val1 * (1 + Math.cos(u)) + c
   let x = val2 * Math.cos(n * v)
   let y = val2 * Math.sin(n * v)
   let z = (b * v) / (Math.PI * 2) + a * Math.sin(u) * val1
   target.set(x, y, z)
}

let geo = new ParametricGeometry(seashell2, 10, 50)

let material = new THREE.MeshNormalMaterial({
   wireframe: true,
   side: THREE.DoubleSide,
})

let mesh = new THREE.Mesh(geo, material)
world.scene.add(mesh)

mesh.rotateX(-Math.PI / 2)
// mesh.position.set(0, 2, 0)

function animate() {
   world.render()
   requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
