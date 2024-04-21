import '../style.css'
import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { generatePoints } from '../utils/generate-points-sheet'
import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'
import { DataView } from '../utils/data-view'
import { createElement } from '../utils/dom'

import './radio-styles.css'
import { RadioGroup } from './radio-group'

const gui = new GUI()

const sizes = {
   width: window.innerWidth,
   height: window.innerHeight,
   pixelRatio: Math.min(window.devicePixelRatio, 2),
}

THREE.ColorManagement.enabled = true

const scene = new THREE.Scene()

const planeWidth = 5
const planeHeight = 8

const { positions, scales } = generatePoints(planeWidth, planeHeight, 100, 80)
const pointsGeometry = new THREE.BufferGeometry()

const pointsMaterial = new THREE.ShaderMaterial({
   uniforms: {
      u_time: { value: 0 },

      // u_res: { value: new THREE.Vector3(planeWidth, 0, planeHeight) },
      u_res: new THREE.Uniform(
         new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)
      ),
      u_planeRes: new THREE.Uniform(new THREE.Vector2(planeWidth, planeHeight)),

      u_showPosX: new THREE.Uniform(false),
      u_showPosY: new THREE.Uniform(false),
      u_showModelPosX: new THREE.Uniform(false),
      u_showModelPosY: new THREE.Uniform(false),
      u_showModelPosZ: new THREE.Uniform(false),
      u_showViewPosX: new THREE.Uniform(false),
      u_showViewPosY: new THREE.Uniform(false),
      u_showViewPosZ: new THREE.Uniform(false),
      u_showProjPosX: new THREE.Uniform(false),
      u_showProjPosY: new THREE.Uniform(false),
      u_showProjPosZ: new THREE.Uniform(false),
      u_showNewUvX: new THREE.Uniform(false),
      u_showNewUvY: new THREE.Uniform(false),
      u_showNewUv2X: new THREE.Uniform(false),
      u_showNewUv2Y: new THREE.Uniform(false),
      u_showUvX: new THREE.Uniform(false),
      u_showUvY: new THREE.Uniform(false),
      u_useFract: new THREE.Uniform(true),
   },
   vertexShader,
   fragmentShader,
   transparent: true,
   blending: THREE.AdditiveBlending,
   depthWrite: false,
})

pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
pointsGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))
// pointsGeometry.setIndex(null)
const particles = new THREE.Points(pointsGeometry, pointsMaterial)
particles.position.set(0, 0, 0)
scene.add(particles)

const circle = new THREE.Mesh(
   new THREE.SphereGeometry(1),
   new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
)
// scene.add(circle)

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
 * GUI/Debug
 */

const radioGroup = new RadioGroup(pointsMaterial.uniforms)

const debugObj = {
   planeWidth,
   planeHeight,
   resetCamera: () => {
      camera.position.set(0, 0, 18)
   },
}

radioGroup.addInfo('position var: pos w/in group of particles')
radioGroup.addRadio('pos x', 'u_showPosX')
radioGroup.addRadio('pos y', 'u_showPosY')

radioGroup.addInfo(`model pos: position in model's local space
changes with model's rotation/scale`)
radioGroup.addRadio('x', 'u_showModelPosX')
radioGroup.addRadio('y', 'u_showModelPosY')
radioGroup.addRadio('z', 'u_showModelPosZ')

radioGroup.addInfo(`view pos: position in camera space
uses all of above + camera position/rotation`)
radioGroup.addRadio('x', 'u_showViewPosX')
radioGroup.addRadio('y', 'u_showViewPosY')
radioGroup.addRadio('z', 'u_showViewPosZ')

radioGroup.addInfo(`projected position: position in screen space ??? `)
radioGroup.addRadio('x', 'u_showProjPosX')
radioGroup.addRadio('y', 'u_showProjPosY')
radioGroup.addRadio('z', 'u_showProjPosZ')

radioGroup.addInfo(`newuv`)
radioGroup.addRadio('x', 'u_showNewUvX')
radioGroup.addRadio('y', 'u_showNewUvY')

radioGroup.addInfo('newuv2 (based on y)')
radioGroup.addRadio('x', 'u_showNewUv2X')
radioGroup.addRadio('y', 'u_showNewUv2Y')

radioGroup.addInfo('actual uv')
radioGroup.addRadio('x', 'u_showUvX')
radioGroup.addRadio('y', 'u_showUvY')

let geo = gui.addFolder('geometry').close()
geo.add(particles.position, 'x', -20, 20, 0.5)
geo.add(particles.position, 'y', -20, 20, 0.5)
geo.add(particles.position, 'z', -20, 20, 0.5)
geo.add(particles.scale, 'x', 0, 5, 0.1).name('scale x')
geo.add(particles.scale, 'y', 0, 5, 0.1).name('scale y')
geo.add(particles.scale, 'z', 0, 5, 0.1).name('scale z')
geo.add(particles.rotation, 'x', -Math.PI, Math.PI, 0.1).name('rot x')
geo.add(particles.rotation, 'y', -Math.PI, Math.PI, 0.1).name('rot y')
geo.add(particles.rotation, 'z', -Math.PI, Math.PI, 0.1).name('rot z')

let others = gui.addFolder('position stuff')
others.add(particles.material.uniforms.u_useFract, 'value').name('use fract')
others.add(debugObj, 'resetCamera')

const dataView = new DataView()
const dataSection = dataView.createSection('Data')

dataSection.add(debugObj, 'planeWidth', 'planeWidth', 0)
dataSection.add(debugObj, 'planeHeight', 'planeHeight', 0)

/**
 * Animation
 */

const tick = () => {
   const elapsedTime = clock.getElapsedTime()
   pointsMaterial.uniforms.u_time.value = elapsedTime
   // controls.update()
   renderer.render(scene, camera)

   window.requestAnimationFrame(tick)
}

tick()
