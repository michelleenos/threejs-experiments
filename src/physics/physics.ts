import '../style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import * as CANNON from 'cannon-es'
import { setup, colors, makeLights, makeFloor, guiLightFolder, gray } from './setup'
import { type PhysicsData, setInstanceItem, updateInstanceItem } from './geometries'

let boxesMax = 300
let spheresMax = 300

const params = {
   floorMetalness: 0.3,
   floorRoughness: 0.6,
   shapeMetalness: 0.1,
   shapeRoughness: 0.5,
   fogColor: gray,
   floorColor: gray,
   directionalLight: {
      intensity: 1,
      color: '#ffffff',
   },
   ambientLight: { intensity: 1.5, color: '#ffffff' },
   hemisphereLight: { intensity: 1, color: '#ffffff', groundColor: gray },
   positions: {
      x: { min: -4, max: 4 },
      y: { min: 3, max: 3.5 },
      z: { min: -3, max: 4 },
   },
   scales: { min: 0.25, max: 0.5 },
}

const { sizes, stats, scene, renderer, camera, clock, resize } = setup()
const { ambientLight, directionalLight } = makeLights(scene, params.ambientLight, params.directionalLight)
window.addEventListener('resize', resize)

camera.position.set(0, 3, -10)
camera.lookAt(scene.position)
camera.updateProjectionMatrix()

// const controls = new OrbitControls(camera, renderer.domElement)

/**
 * Physics World
 */
const world = new CANNON.World({
   gravity: new CANNON.Vec3(0, -9.82, 0),
   allowSleep: true,
})
world.broadphase = new CANNON.SAPBroadphase(world)

const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
   friction: 0.6,
   restitution: 0.3,
})

world.defaultContactMaterial = defaultContactMaterial
world.defaultMaterial = defaultMaterial

/**
 * Geometries
 */
const floor = makeFloor(scene, params.floorColor, 100, 100)
floor.material.metalness = params.floorMetalness
floor.material.roughness = params.floorRoughness

const floorBody = new CANNON.Body({ shape: new CANNON.Plane() })
floorBody.position.set(floor.position.x, floor.position.y, floor.position.z)
floorBody.quaternion.set(floor.quaternion.x, floor.quaternion.y, floor.quaternion.z, floor.quaternion.w)
world.addBody(floorBody)

const sphereGeometry = new THREE.SphereGeometry(1, 34, 34)
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const instanceMaterial = new THREE.MeshStandardMaterial({
   metalness: params.shapeMetalness,
   roughness: params.shapeRoughness,
})
const sphereInstance = new THREE.InstancedMesh(sphereGeometry, instanceMaterial, spheresMax)
const boxInstance = new THREE.InstancedMesh(boxGeometry, instanceMaterial, boxesMax)
sphereInstance.castShadow = true
boxInstance.castShadow = true
// boxInstance.receiveShadow = true
// sphereInstance.receiveShadow = true
sphereInstance.count = 0
boxInstance.count = 0

const boxesData = {
   max: boxesMax,
   physics: [] as PhysicsData,
   toAdd: 20,
   lastTimeAdded: 0,
   lastAddedIndex: -1,
   interval: 0.2,
}

const spheresData = {
   max: spheresMax,
   physics: [] as PhysicsData,
   toAdd: 20,
   lastTimeAdded: 0,
   lastAddedIndex: -1,
   interval: 0.23,
}

scene.add(boxInstance, sphereInstance)

/**
 * Mouse Stuff
 */
const mouse = new THREE.Vector2()
const mouseStart = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
// the plane is rotated a little so that clicking higher above the plane further away still intersects
const plane = new THREE.Plane(new THREE.Vector3(0, 1, -0.4))
plane.translate(new THREE.Vector3(0, 1, 0))

// const planeHelper = new THREE.PlaneHelper(plane, 30, 0xff0000)
// scene.add(planeHelper)

const onClick = () => {
   raycaster.setFromCamera(mouse, camera)

   const newBoxPos = new THREE.Vector3()
   const intersects = raycaster.ray.intersectPlane(plane, newBoxPos)

   if (!intersects) return
   if (intersects.z > 7) newBoxPos.z = 7
   if (intersects.y > 5) newBoxPos.y = 5

   let i = (boxesData.lastAddedIndex + 1) % boxesData.max
   if (boxInstance.count < i + 1) {
      boxInstance.count = i + 1
   }

   setInstanceItem(i, boxInstance, 'box', boxesData.physics, world, newBoxPos, params.scales)
   boxesData.lastAddedIndex = i
}

renderer.domElement.addEventListener('mousedown', (e) => {
   mouseStart.x = e.clientX
   mouseStart.y = e.clientY
})
renderer.domElement.addEventListener('mouseup', (e) => {
   const diffX = Math.abs(mouseStart.x - e.clientX)
   const diffY = Math.abs(mouseStart.y - e.clientY)

   if (diffX < 5 && diffY < 5) {
      mouse.x = (e.clientX / sizes.width) * 2 - 1
      mouse.y = -(e.clientY / sizes.height) * 2 + 1
      onClick()
   }
})

/**
 * GUI
 */
const gui = new GUI()

const guiBtns = {
   add20Spheres: () => {
      spheresData.toAdd += 20
      spheresData.interval = 0.12
      addSpheresBtn.disable()
   },
   add20Boxes: () => {
      boxesData.toAdd += 20
      boxesData.interval = 0.11
      addBoxBtn.disable()
   },
}
let addSpheresBtn = gui.add(guiBtns, 'add20Spheres')
let addBoxBtn = gui.add(guiBtns, 'add20Boxes')
addSpheresBtn.disable()
addBoxBtn.disable()

let materialsFolder = gui.addFolder('Materials + Colors')
materialsFolder.close()
materialsFolder.add(params, 'floorMetalness', 0, 1, 0.01).onChange((val: number) => (floor.material.metalness = val))
materialsFolder.add(params, 'floorRoughness', 0, 1, 0.01).onChange((val: number) => (floor.material.roughness = val))
materialsFolder.add(params, 'shapeMetalness', 0, 1, 0.01).onChange((val: number) => (instanceMaterial.metalness = val))
materialsFolder.add(params, 'shapeRoughness', 0, 1, 0.01).onChange((val: number) => (instanceMaterial.roughness = val))
materialsFolder.addColor(params, 'fogColor').onChange((val: THREE.Color) => {
   scene.fog?.color.set(val)
   renderer.setClearColor(val)
})
materialsFolder.addColor(params, 'floorColor').onChange((val: THREE.Color) => floor.material.color.set(val))

guiLightFolder(gui, ambientLight, params.ambientLight, 'Ambient Light')
guiLightFolder(gui, directionalLight, params.directionalLight, 'Directional Light')
// guiLightFolder(gui, hemisphereLight, params.hemisphereLight, 'Hemisphere Light')

/**
 * Animate
 */
// setSpheres(params.nShapes, sphereInstance, spheresData)
// setBoxes(params.nShapes, boxInstance, boxesData)

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableZoom = false
// let angle = controls.getPolarAngle()
// controls.minPolarAngle = angle - 0.1
// controls.maxPolarAngle = angle + 0.1

let oldTime = 0

function animate() {
   requestAnimationFrame(animate)

   const elapsedTime = clock.getElapsedTime()
   const deltaTime = elapsedTime - oldTime
   oldTime = elapsedTime

   world.fixedStep()
   if (boxesData.toAdd > 0 && elapsedTime - boxesData.lastTimeAdded > boxesData.interval) {
      boxesData.lastTimeAdded = elapsedTime
      let i = (boxesData.lastAddedIndex + 1) % boxesData.max
      if (boxInstance.count < i + 1) boxInstance.count = i + 1
      setInstanceItem(i, boxInstance, 'box', boxesData.physics, world, params.positions, params.scales)
      boxesData.lastAddedIndex = i
      boxesData.toAdd--
   }

   if (spheresData.toAdd > 0 && elapsedTime - spheresData.lastTimeAdded > spheresData.interval) {
      spheresData.lastTimeAdded = elapsedTime
      let i = (spheresData.lastAddedIndex + 1) % spheresData.max
      if (sphereInstance.count < i + 1) sphereInstance.count = i + 1
      setInstanceItem(i, sphereInstance, 'sphere', spheresData.physics, world, params.positions, params.scales)
      spheresData.lastAddedIndex = i
      spheresData.toAdd--
   }

   if (boxesData.toAdd === 0) addBoxBtn.enable()
   if (spheresData.toAdd === 0) addSpheresBtn.enable()

   // ***** Update spheres ***** //
   let spheresCount = sphereInstance.count
   for (let i = 0; i < spheresCount; i++) {
      updateInstanceItem(i, sphereInstance, spheresData.physics)
   }

   // ***** Update boxes ***** //
   let count = boxInstance.count
   for (let i = 0; i < count; i++) {
      updateInstanceItem(i, boxInstance, boxesData.physics)
   }

   renderer.render(scene, camera)
   stats.update()
}

requestAnimationFrame(animate)
