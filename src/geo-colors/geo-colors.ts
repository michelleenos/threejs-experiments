import '../style.css'
import * as THREE from 'three'
import { GUI } from 'lil-gui'

function lerp(start: number, end: number, amt: number) {
   return (1 - amt) * start + amt * end
}

function map(num: number, inMin: number, inMax: number, outMin: number, outMax: number) {
   return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

const mousePos = new THREE.Vector2()
const sizes = new THREE.Vector2(window.innerWidth, window.innerHeight)
const clock = new THREE.Clock()

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(sizes.x, sizes.y)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor('#ffffff')
document.body.appendChild(renderer.domElement)

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 300)
camera.position.z = 100

// lights
const dirLight = new THREE.DirectionalLight('#11e8b9', 2)
dirLight.position.set(0, 0, 1)

const hemiLight = new THREE.HemisphereLight('#ffffff', '#ffffff', 3)
hemiLight.position.set(0, 0, 0)

const ambiLight = new THREE.AmbientLight('#c13bff', 0.1)

scene.add(dirLight, ambiLight, hemiLight)

// Geometry
function createGeo(radius = 10) {
   const geometry = new THREE.IcosahedronGeometry(radius, 0)
   const material = new THREE.MeshPhongMaterial({
      color: '#ffffff',
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
   })
   const mesh = new THREE.Mesh(geometry, material)
   return mesh
}

function setColors(geometry: THREE.BufferGeometry, radius: number, style = 'one') {
   const count = geometry.attributes.position.count
   let colors = []
   let color = new THREE.Color()
   const positions = geometry.attributes.position as THREE.BufferAttribute

   for (let i = 0; i < count; i++) {
      let y = positions.getY(i)
      let x = positions.getX(i)
      let z = positions.getZ(i)

      if (style === 'one') {
         color.setHSL(map(i, 0, count, 0, 1), 1.0, 0.5)
         colors.push(color.r, color.g, color.b)
      } else if (style === 'two') {
         let r = map(z, radius * 0.9, -radius * 0.9, 0, 1)
         let g = map(x, -radius * 0.9, radius * 0.9, 0, 1)
         let b = map(y, -radius * 0.9, radius * 0.9, 0, 1)
         color.setRGB(r, g, b)
         colors.push(color.r, color.g, color.b)
      } else if (style === 'three') {
         let r = map(z, radius * 0.9, -radius * 0.9, 0, 1)
         let g = map(x, -radius * 0.9, radius * 0.9, 0, 1)
         color.setRGB(r, g, 0.2)
         colors.push(color.r, color.g, color.b)
      }
   }

   geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
}

let radius = 10
const opts = { style: 'two' }

let shape = createGeo(10)
setColors(shape.geometry, 10, opts.style)
scene.add(shape)

let wireMesh = new THREE.Mesh(
   new THREE.IcosahedronGeometry(radius * 1.3, 1),
   new THREE.MeshBasicMaterial({
      color: '#513b9a',
      wireframe: true,
      transparent: true,
      opacity: 0.3,
   })
)
scene.add(wireMesh)
// GUI
const gui = new GUI()
let styleDropdown = gui.add(opts, 'style', ['one', 'two', 'three'])
styleDropdown.onChange(() => {
   setColors(shape.geometry, 10, opts.style)
})

function onMouseMove(event: MouseEvent) {
   mousePos.x = (event.clientX / sizes.x) * 2 - 1
   mousePos.y = -(event.clientY / sizes.y) * 2 + 1
}

function onWindowResize() {
   sizes.x = window.innerWidth
   sizes.y = window.innerHeight

   camera.aspect = sizes.x / sizes.y
   camera.updateProjectionMatrix()
   renderer.setSize(sizes.x, sizes.y)
}

function animate() {
   requestAnimationFrame(animate)

   let elapsedTime = clock.getElapsedTime()

   shape.rotation.x = elapsedTime * 0.25
   shape.rotation.y = elapsedTime * 0.5 + Math.sin(elapsedTime * 0.07)
   shape.rotation.z = elapsedTime * 0.25

   wireMesh.rotation.x = elapsedTime * -0.15
   wireMesh.rotation.y = elapsedTime * 0.25
   wireMesh.rotation.z = elapsedTime * 0.15 + Math.sin(elapsedTime * 0.1)

   camera.position.x = lerp(camera.position.x, mousePos.x * 80, 0.05)
   camera.position.y = lerp(camera.position.y, mousePos.y * 80, 0.05)
   camera.lookAt(scene.position)

   renderer.render(scene, camera)
}

requestAnimationFrame(animate)

window.addEventListener('mousemove', onMouseMove)
window.addEventListener('resize', onWindowResize)
