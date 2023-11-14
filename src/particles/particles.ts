import '../style.css'
import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'

function lerp(start: number, end: number, amt: number) {
   return (1 - amt) * start + amt * end
}

const showParticlesUI = true
const showShaderUI = true

const props = {
   separation: 1,
   perSide: 150,
   randomness: 0,
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

/**
 * Variables
 */
let pointsMaterial: THREE.ShaderMaterial
let pointsGeometry: THREE.BufferGeometry
let particles: THREE.Points
let planeHelper: THREE.Mesh
let renderer: THREE.WebGLRenderer
let controls: OrbitControls

const info = document.querySelector('.info')

const mousePos = new THREE.Vector2(1, 1)
const lastMousePos = new THREE.Vector3()
const sizes = new THREE.Vector2(window.innerWidth, window.innerHeight)
const clock = new THREE.Clock()

const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.x / sizes.y, 1, 500)
camera.position.z = 100
camera.position.y = 70
camera.position.x = 20

/**
 * Particles
 */

function cleanup() {
   if (particles) {
      pointsGeometry.dispose()
      pointsMaterial.dispose()
      scene.remove(particles)
   }
}

function generatePoints() {
   cleanup()
   const numParticles = props.perSide ** 2
   const positions = new Float32Array(numParticles * 3)
   const scales = new Float32Array(numParticles)

   let planeWidth = props.perSide * props.separation
   let planeHeight = props.perSide * props.separation
   let randomAmount = props.randomness * props.separation

   for (let ix = 0; ix < props.perSide; ix++) {
      for (let iy = 0; iy < props.perSide; iy++) {
         const index = ix * props.perSide + iy

         const randomX = (Math.random() - 0.5) * randomAmount
         const randomY = (Math.random() - 0.5) * randomAmount
         const randomZ = (Math.random() - 0.5) * randomAmount

         const x = ix * props.separation - planeWidth / 2 + props.separation / 2 + randomX
         const y = 0 + randomY
         const z = iy * props.separation - planeHeight / 2 + props.separation / 2 + randomZ

         positions[index * 3] = x
         positions[index * 3 + 1] = y
         positions[index * 3 + 2] = z

         scales[index] = Math.min(window.devicePixelRatio, 2.0) * props.particleSize
      }
   }

   // ***** Geometry ***** //
   pointsGeometry = new THREE.BufferGeometry()
   pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
   pointsGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

   pointsMaterial = new THREE.ShaderMaterial({
      uniforms: {
         u_time: { value: 0 },
         u_mouse: { value: new THREE.Vector3() },
         u_res: { value: new THREE.Vector3(planeWidth, 0, planeHeight) },
         u_strength: { value: 0 },
         u_color1: { value: props.color1 },
         u_color2: { value: props.color2 },
         u_pullFrom: { value: props.pullFrom },
         u_pullAmount: { value: props.pullAmount },
         u_waveA: { value: props.waveA },
         u_waveB: { value: props.waveB },
         u_waveSpeed: { value: props.waveSpeed },
         u_waveStrength: { value: props.waveStrength },
         u_innerSize: { value: props.innerSize },
         u_noiseSpeed: { value: props.noiseSpeed },
         u_noiseVal: { value: props.noiseVal },
      },
      vertexShader,
      fragmentShader,
   })

   pointsMaterial.transparent = true
   pointsMaterial.blending = THREE.AdditiveBlending
   pointsMaterial.depthWrite = false

   particles = new THREE.Points(pointsGeometry, pointsMaterial)
   scene.add(particles)

   // ***** Plane Geometry Helper ***** //
   planeHelper = new THREE.Mesh(
      new THREE.PlaneGeometry(planeWidth, planeHeight),
      new THREE.MeshBasicMaterial({
         color: 0xffffff,
         side: THREE.DoubleSide,
      })
   )
   planeHelper.rotation.x = -Math.PI / 2
   planeHelper.visible = false
   scene.add(planeHelper)
}

/**
 * GUI
 */

if (showParticlesUI || showShaderUI) {
   const gui = new GUI()
   gui.close()

   if (showParticlesUI && showShaderUI) {
      let particlesFolder = gui.addFolder('Particles')
      let shaderFolder = gui.addFolder('Shader Vars')
      shaderFolder.close()
      guiParticles(particlesFolder)
      guiShader(shaderFolder)
   } else {
      showParticlesUI && guiParticles(gui)
      showShaderUI && guiShader(gui)
   }

   // gui.add(props, 'freezeMouseToCenter')
}

function guiParticles(folder: GUI) {
   folder.add(props, 'separation', 0.5, 7, 0.5).onFinishChange(generatePoints)
   folder.add(props, 'perSide', 1, 300, 1).onFinishChange(generatePoints)
   folder.add(props, 'randomness', 0, 3, 0.1).onFinishChange(generatePoints)
   folder.add(props, 'particleSize', 1, 8, 1).onFinishChange(generatePoints)
   folder.add(props, 'mouseSpeed', 0.001, 0.1, 0.001)
   // folder.add(props, 'strengthSpeedUp', 0.001, 0.1, 0.001)
   // folder.add(props, 'strengthSpeedDown', 0.001, 0.1, 0.001)

   folder.addColor(props, 'color1')
   folder.addColor(props, 'color2')
}

function guiShader(folder: GUI) {
   folder.add(props, 'pullFrom', 0, 1, 0.01).onChange((value: number) => {
      pointsMaterial.uniforms.u_pullFrom.value = value
   })
   folder.add(props, 'pullAmount', 0, 0.3, 0.001).onChange((value: number) => {
      pointsMaterial.uniforms.u_pullAmount.value = value
   })
   folder.add(props, 'waveA', -100, 100, 1).onChange((value: number) => {
      pointsMaterial.uniforms.u_waveA.value = value
   })
   folder.add(props, 'waveB', -100, 100, 1).onChange((value: number) => {
      pointsMaterial.uniforms.u_waveB.value = value
   })
   folder.add(props, 'waveSpeed', -10, 10, 0.1).onChange((value: number) => {
      pointsMaterial.uniforms.u_waveSpeed.value = value
   })
   folder.add(props, 'waveStrength', 0, 100, 1).onChange((value: number) => {
      pointsMaterial.uniforms.u_waveStrength.value = value
   })
   folder.add(props, 'innerSize', 0, 0.5, 0.01).onChange((value: number) => {
      pointsMaterial.uniforms.u_innerSize.value = value
   })
   folder.add(props, 'noiseSpeed', 0, 5, 0.1).onChange((value: number) => {
      pointsMaterial.uniforms.u_noiseSpeed.value = value
   })
   folder.add(props, 'noiseVal', 0, 100, 1).onChange((value: number) => {
      pointsMaterial.uniforms.u_noiseVal.value = value
   })
}

/**
 * Renderer, Controls
 */
renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(sizes.x, sizes.y)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.update()

generatePoints()

const stats = new Stats()
document.body.appendChild(stats.dom)

/**
 * Events
 */

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

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()
function raycast() {
   if (props.freezeMouseToCenter) {
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)
   } else {
      raycaster.setFromCamera(mousePos, camera)
   }
   const intersects = raycaster.intersectObject(planeHelper, false)
   const ustrength = pointsMaterial.uniforms.u_strength.value
   const umouse = pointsMaterial.uniforms.u_mouse.value

   if (intersects[0]) {
      const point = intersects[0].point
      lastMousePos.set(point.x, point.y, point.z)

      if (ustrength < 1) {
         pointsMaterial.uniforms.u_strength.value = lerp(ustrength, 1, props.strengthSpeedUp)
      }
      pointsMaterial.uniforms.u_mouse.value.x = lerp(umouse.x, point.x, props.mouseSpeed)
      pointsMaterial.uniforms.u_mouse.value.y = lerp(umouse.y, point.y, props.mouseSpeed)
      pointsMaterial.uniforms.u_mouse.value.z = lerp(umouse.z, point.z, props.mouseSpeed)

      if (info) {
         info.innerHTML = `x: ${point.x.toFixed(2)}<br>y: ${point.y.toFixed(
            2
         )}<br>z: ${point.z.toFixed(2)}`
      }
   } else {
      if (ustrength > 0) {
         pointsMaterial.uniforms.u_strength.value = lerp(ustrength, 0, props.strengthSpeedDown)
      }
      if (lastMousePos) {
         pointsMaterial.uniforms.u_mouse.value.x = lerp(umouse.x, lastMousePos.x, props.mouseSpeed)
         pointsMaterial.uniforms.u_mouse.value.y = lerp(umouse.y, lastMousePos.y, props.mouseSpeed)
         pointsMaterial.uniforms.u_mouse.value.z = lerp(umouse.z, lastMousePos.z, props.mouseSpeed)
      }
   }
}

/**
 * Animation
 */

function animate() {
   requestAnimationFrame(animate)

   const elapsedTime = clock.getElapsedTime()

   raycast()
   controls.update()
   pointsMaterial.uniforms.u_time.value = elapsedTime

   renderer.render(scene, camera)
   stats.update()
}

function init() {
   document.body.addEventListener('pointermove', onPointerMove)
   window.addEventListener('resize', onWindowResize)
   requestAnimationFrame(animate)
}

init()
