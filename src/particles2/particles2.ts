import '../style.css'
import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { generatePoints } from './generate-points'
import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'
import { GuiWithLocalStorage } from './local-storage-gui'

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

const sizes = {
   width: window.innerWidth,
   height: window.innerHeight,
   pixelRatio: Math.min(window.devicePixelRatio, 2),
}

THREE.ColorManagement.enabled = true

const stats = new Stats()
document.body.appendChild(stats.dom)

const scene = new THREE.Scene()

const planeWidth = 8
const planeHeight = 6

const { positions, scales } = generatePoints(planeWidth, planeHeight, 80, 60, 0.5)
const pointsGeometry = new THREE.BufferGeometry()

const pointsMaterial = new THREE.ShaderMaterial({
   uniforms: {
      u_time: { value: 0 },
      u_color1: new THREE.Uniform(new THREE.Color('#FF8D25')),
      u_color2: new THREE.Uniform(new THREE.Color('#0067A7')),
      // u_res: { value: new THREE.Vector3(planeWidth, 0, planeHeight) },
      u_res: new THREE.Uniform(
         new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)
      ),
      u_alpha: { value: 1 },
      u_planeRes: new THREE.Uniform(new THREE.Vector2(planeWidth, planeHeight)),
   },
   vertexShader,
   fragmentShader,
   transparent: true,
   // blending: THREE.AdditiveBlending,
   depthWrite: false,
})

pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
pointsGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))
const particles = new THREE.Points(pointsGeometry, pointsMaterial)
scene.add(particles)

// particles.rotation.x = -Math.PI * 0.5

window.addEventListener('resize', () => {
   sizes.width = window.innerWidth
   sizes.height = window.innerHeight

   camera.aspect = sizes.width / sizes.height
   camera.updateProjectionMatrix()

   pointsMaterial.uniforms.u_res.value.x = sizes.width * sizes.pixelRatio
   pointsMaterial.uniforms.u_res.value.y = sizes.height * sizes.pixelRatio

   renderer.setSize(sizes.width, sizes.height)
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 18)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const clock = new THREE.Clock()

/**
 * GUI
 */

// const guiValAndLocalStorage = (gui: GUI, obj: any, key: string, lsLey: string ) => {
//    // obj[key] = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : val
//    let stored = localStorage.getItem(lsLey)
//    if (stored) obj[key] = JSON.parse(stored)
//    gui.add(obj, key).onChange(() => {
//       // localStorage.setItem
//    })
// }
const gui = new GUI()
const img = document.querySelector<HTMLElement>('.wave-img')
const debugObj = {
   showImg: true,
   imgAlpha: 1,
}

let guils = new GuiWithLocalStorage('particles2', gui)

guils
   .add(debugObj, 'imgAlpha', 'imgAlpha', (val: number) => {
      if (img) img.style.opacity = `${val}`
   })
   .min(0)
   .max(1)
   .step(0.01)
guils.add(particles.position, 'x').min(-10).max(10).step(0.01).name('x')
guils.add(particles.rotation, 'x').min(-Math.PI).max(Math.PI).step(0.01).name('rotation')
guils
   .add(particles.material.uniforms.u_alpha, 'value', 'particlesAlpha')
   .min(0)
   .max(1)
   .step(0.01)
   .name('particlesAlpha')

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
