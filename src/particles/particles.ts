import '../style.css'
import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'

function lerp(start: number, end: number, amt: number) {
   return (1 - amt) * start + amt * end
}

// function particleEasing(x: number) {
//    if (x < 0.5) {
//       return easeOutQuad(x * 2) / 2
//    } else {
//       return easeInQuad((x - 0.5) * 2) / 2 + 0.5
//    }
// }

/**
 * Variables
 */
const mousePos = new THREE.Vector2(0, 0)
const sizes = new THREE.Vector2(window.innerWidth, window.innerHeight)
const clock = new THREE.Clock()
const props = {
   separation: 1,
   amountX: 150,
   amountY: 150,
}

const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.x / sizes.y, 1, 1000)
camera.position.z = 0
camera.position.y = 100
camera.position.x = 10

/**
 * Particles
 */

// ***** Positions ***** //

// const perRing = 100
const numParticles = props.amountX * props.amountY
const positions = new Float32Array(numParticles * 3)
const scales = new Float32Array(numParticles)

let planeWidth = props.amountX * props.separation
let planeHeight = props.amountY * props.separation

for (let ix = 0; ix < props.amountX; ix++) {
   for (let iy = 0; iy < props.amountY; iy++) {
      const index = ix * props.amountY + iy

      const y = 0
      // const x =
      //    particleEasing(posx) * props.amountX * props.separation -
      //    planeWidth / 2 +
      //    props.separation / 2
      // const z =
      //    particleEasing(posy) * props.amountY * props.separation -
      //    planeHeight / 2 +
      //    props.separation / 2

      positions[index * 3] = ix * props.separation - planeWidth / 2 + props.separation / 2
      positions[index * 3 + 1] = y
      positions[index * 3 + 2] = iy * props.separation - planeHeight / 2 + props.separation / 2

      scales[index] = Math.min(window.devicePixelRatio, 2.0)
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
      u_res: { value: new THREE.Vector3(planeWidth, 0, planeHeight) },
      u_strength: { value: 0 },
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
   new THREE.PlaneGeometry(planeWidth, planeHeight),
   new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
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
controls.maxDistance = 200
controls.minDistance = 100
controls.autoRotate = true
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.autoRotateSpeed = 3

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

function onWindowResize() {
   sizes.x = window.innerWidth
   sizes.y = window.innerHeight

   camera.aspect = sizes.x / sizes.y
   camera.updateProjectionMatrix()
   renderer.setSize(sizes.x, sizes.y)
}

const info = document.querySelector('.info')
const lastMouse = new THREE.Vector3(0, 0)

function raycast() {
   raycaster.setFromCamera(mousePos, camera)
   const intersects = raycaster.intersectObject(plane, false)
   const ustrength = material.uniforms.u_strength.value
   const umouse = material.uniforms.u_mouse.value

   if (intersects[0]) {
      const point = intersects[0].point
      lastMouse.set(point.x, point.y, point.z)

      // material.uniforms.u_strength.value = lerp(ustrength, 1, 0.1)
      if (ustrength < 1) {
         material.uniforms.u_strength.value = lerp(ustrength, 1, 0.03)
      }
      material.uniforms.u_mouse.value.x = lerp(umouse.x, point.x, 0.04)
      material.uniforms.u_mouse.value.y = lerp(umouse.y, point.y, 0.04)
      material.uniforms.u_mouse.value.z = lerp(umouse.z, point.z, 0.04)

      if (info) {
         info.innerHTML = `x: ${point.x.toFixed(2)}<br>y: ${point.y.toFixed(
            2
         )}<br>z: ${point.z.toFixed(2)}`
      }
   } else {
      if (ustrength > 0) {
         material.uniforms.u_strength.value = lerp(ustrength, 0, 0.01)
      }
      if (lastMouse) {
         material.uniforms.u_mouse.value.x = lerp(umouse.x, lastMouse.x, 0.04)
         material.uniforms.u_mouse.value.y = lerp(umouse.y, lastMouse.y, 0.04)
         material.uniforms.u_mouse.value.z = lerp(umouse.z, lastMouse.z, 0.04)
      }
   }
}

function animate() {
   requestAnimationFrame(animate)

   const elapsedTime = clock.getElapsedTime()
   // camera.position.z = Math.sin(elapsedTime * 0.1) * 100
   // camera.position.x = Math.cos(elapsedTime * 0.1) * 100
   // camera.position.y = Math.sin(elapsedTime * 0.1) * 100

   raycast()

   controls.update()
   material.uniforms.u_time.value = elapsedTime

   renderer.render(scene, camera)
   stats.update()
}

requestAnimationFrame(animate)
