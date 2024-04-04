import '../style.css'
import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { generatePoints } from './generate-points'
import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'

function lerp(start: number, end: number, amt: number) {
   return (1 - amt) * start + amt * end
}

const props = {
   particleSize: 2,
   mouseSpeed: 0.02,
   strengthSpeedUp: 0.03,
   strengthSpeedDown: 0.01,
   color1: new THREE.Color(120 / 255, 242 / 255, 205 / 255),
   color2: new THREE.Color(129 / 255, 116 / 255, 200 / 255),
   pullFrom: 0.3,
   pullAmount: 0.1,
   waveA: 35,
   waveB: 20,
   waveSpeed: 3,
   waveStrength: 10,
   innerSize: 0.1,
   noiseSpeed: 0.9,
   noiseVal: 20,
   freezeMouseToCenter: false,
}

const stats = new Stats()
document.body.appendChild(stats.dom)

const scene = new THREE.Scene()

const planeWidth = 30
const planeHeight = 20

const { positions, scales } = generatePoints(planeWidth, planeHeight, 80, 80, 1)
const pointsGeometry = new THREE.BufferGeometry()
pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
pointsGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

const pointsMaterial = new THREE.ShaderMaterial({
   uniforms: {
      u_time: { value: 0 },
      u_waveSpeed: { value: 3 },
      u_waveA: { value: 35 },
      u_waveB: { value: 20 },
      u_waveStrength: { value: 10 },
      u_res: { value: new THREE.Vector3(planeWidth, 0, planeHeight) },
   },
   vertexShader,
   fragmentShader,
   transparent: true,
   blending: THREE.AdditiveBlending,
   depthWrite: false,
})
const particles = new THREE.Points(pointsGeometry, pointsMaterial)
scene.add(particles)

const sizes = {
   width: window.innerWidth,
   height: window.innerHeight,
}

// particles.rotation.x = -Math.PI * 0.5

window.addEventListener('resize', () => {
   sizes.width = window.innerWidth
   sizes.height = window.innerHeight

   camera.aspect = sizes.width / sizes.height
   camera.updateProjectionMatrix()

   renderer.setSize(sizes.width, sizes.height)
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
camera.position.set(0, 30, 5)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const clock = new THREE.Clock()

/**
 * Animation
 */

const tick = () => {
   const elapsedTime = clock.getElapsedTime()
   pointsMaterial.uniforms.u_time.value = elapsedTime
   controls.update()
   renderer.render(scene, camera)
   stats.update()

   window.requestAnimationFrame(tick)
}

tick()
