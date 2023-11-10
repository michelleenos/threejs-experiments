import '../style.css'
import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'

function lerp(start: number, end: number, amt: number) {
   return (1 - amt) * start + amt * end
}

/**
 * Variables
 */
const mousePos = new THREE.Vector2()
const sizes = new THREE.Vector2(window.innerWidth, window.innerHeight)
const clock = new THREE.Clock()
const props = {
   separation: 3,
   amountX: 50,
   amountY: 50,
}

const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.x / sizes.y, 1, 1000)
camera.position.z = 50
camera.position.y = 100
camera.position.x = 50

/**
 * Particles
 */

// ***** Positions ***** //
const numParticles = props.amountX * props.amountY
const positions = new Float32Array(numParticles * 3)
const scales = new Float32Array(numParticles)

let xRange = props.amountX * props.separation
let yRange = props.amountY * props.separation

for (let ix = 0; ix < props.amountX; ix++) {
   for (let iy = 0; iy < props.amountY; iy++) {
      const index = ix * props.amountY + iy
      const x = ix * props.separation - xRange / 2 + props.separation / 2
      const y = 0
      const z = iy * props.separation - yRange / 2 + props.separation / 2

      positions[index * 3] = x
      positions[index * 3 + 1] = y
      positions[index * 3 + 2] = z

      scales[index] = 1
   }
}

// ***** Geometry ***** //
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

const material = new THREE.ShaderMaterial({
   uniforms: {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector3() },
      u_res: { value: new THREE.Vector3(xRange, 0, yRange) },
   },
   vertexShader,
   fragmentShader,
})

material.transparent = true
material.blending = THREE.AdditiveBlending
// material.alphaTest = 0.001
material.depthWrite = false

const particles = new THREE.Points(geometry, material)
scene.add(particles)

// ***** Plane Geometry Helper ***** //
const plane = new THREE.Mesh(
   new THREE.PlaneGeometry(xRange, yRange),
   new THREE.MeshBasicMaterial({
      color: 0xffffff,
   })
)
plane.rotation.x = -Math.PI / 2
plane.visible = false
scene.add(plane)

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()

/**
 * Renderer, Controls, Events
 */
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(sizes.x, sizes.y)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

const stats = new Stats()
document.body.appendChild(stats.dom)

document.body.addEventListener('pointermove', onPointerMove)
// document.body.addEventListener('click', onMouseClick)
window.addEventListener('resize', onWindowResize)

function onPointerMove(event: PointerEvent) {
   if (event.isPrimary === false) return

   mousePos.x = (event.clientX / sizes.x) * 2 - 1
   mousePos.y = -(event.clientY / sizes.y) * 2 + 1
}

function onMouseClick(event: MouseEvent) {
   // if (event.isPrimary === false) return

   mousePos.x = (event.clientX / sizes.x) * 2 - 1
   mousePos.y = -(event.clientY / sizes.y) * 2 + 1

   raycaster.setFromCamera(mousePos, camera)
   const intersects = raycaster.intersectObject(plane, false)

   if (intersects[0]) {
      material.uniforms.u_mouse.value = intersects[0].point
      console.log(intersects[0].point)

      if (info) {
         info.innerHTML = `x: ${intersects[0].point.x.toFixed(
            2
         )}<br>y: ${intersects[0].point.y.toFixed(2)}<br>z: ${intersects[0].point.z.toFixed(2)}`
      }
   }
}

function onWindowResize() {
   sizes.x = window.innerWidth
   sizes.y = window.innerHeight

   camera.aspect = sizes.x / sizes.y
   camera.updateProjectionMatrix()
   renderer.setSize(sizes.x, sizes.y)
}

const info = document.querySelector('.info')

function raycast() {
   raycaster.setFromCamera(mousePos, camera)
   const intersects = raycaster.intersectObject(plane, false)

   if (intersects[0]) {
      const point = intersects[0].point
      const umouse = material.uniforms.u_mouse.value
      // material.uniforms.u_mouse.value = intersects[0].point
      material.uniforms.u_mouse.value.x = lerp(umouse.x, point.x, 0.1)
      material.uniforms.u_mouse.value.y = lerp(umouse.y, point.y, 0.1)
      material.uniforms.u_mouse.value.z = lerp(umouse.z, point.z, 0.1)

      if (info) {
         info.innerHTML = `x: ${intersects[0].point.x.toFixed(
            2
         )}<br>y: ${intersects[0].point.y.toFixed(2)}<br>z: ${intersects[0].point.z.toFixed(2)}`
      }
   }
}

function animate() {
   requestAnimationFrame(animate)

   const elapsedTime = clock.getElapsedTime()

   raycast()

   // particles.rotation.x = elapsedTime * 0.1

   controls.update()
   material.uniforms.u_time.value = elapsedTime

   renderer.render(scene, camera)
   stats.update()
}

requestAnimationFrame(animate)
