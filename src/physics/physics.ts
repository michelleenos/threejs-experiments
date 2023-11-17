import '../style.css'
import * as THREE from 'three'

import GUI from 'lil-gui'
import { random } from '../utils'
import * as CANNON from 'cannon-es'
import { setup, colors, makeLights, makeFloor, guiLightFolder } from './setup'

let shapeMaxCount = 15

const params = {
   floorMetalness: 0.3,
   floorRoughness: 0.6,
   shapeMetalness: 0.1,
   shapeRoughness: 0.5,
   nShapes: 5,
   directionalLight: {
      shadowMapSize: 1024,
      intensity: 0.6,
      color: '#ffffff',
   },
   ambientLight: {
      intensity: 2,
      color: '#ffffff',
   },
}

const { sizes, stats, scene, renderer, camera, controls, clock, resize } = setup()
const { ambientLight, directionalLight } = makeLights(
   scene,
   params.ambientLight,
   params.directionalLight
)
window.addEventListener('resize', resize)

/**
 * Physics World
 */
const world = new CANNON.World()
world.gravity.set(0, -9.82, 0)
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true

const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
   // friction: 50,
   restitution: 0.8,
   // contactEquationRelaxation: -44,
})

world.defaultContactMaterial = defaultContactMaterial
world.defaultMaterial = defaultMaterial

/**
 * Geometries
 */
const floor = makeFloor(scene, scene.fog?.color, 15)
floor.material.metalness = params.floorMetalness
floor.material.roughness = params.floorRoughness

const floorBody = new CANNON.Body({
   shape: new CANNON.Plane(),
})
floorBody.quaternion.set(
   floor.quaternion.x,
   floor.quaternion.y,
   floor.quaternion.z,
   floor.quaternion.w
)
world.addBody(floorBody)

const sphereGeometry = new THREE.SphereGeometry(1, 34, 34)
const instanceMaterial = new THREE.MeshStandardMaterial({
   metalness: params.shapeMetalness,
   roughness: params.shapeRoughness,
})
const sphereInstance = new THREE.InstancedMesh(sphereGeometry, instanceMaterial, shapeMaxCount)
sphereInstance.count = params.nShapes
sphereInstance.castShadow = true
scene.add(sphereInstance)

const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const boxInstance = new THREE.InstancedMesh(boxGeometry, instanceMaterial, shapeMaxCount)
boxInstance.count = params.nShapes
boxInstance.castShadow = true
const boxesData: PhysicsData = []

scene.add(boxInstance)

type PhysicsData = { scale: number; body: CANNON.Body }[]
const spheresData: PhysicsData = []

const setSpheres = (n: number, instance: THREE.InstancedMesh, data: PhysicsData = []) => {
   data.forEach(({ body }) => world.removeBody(body))
   data.length = n
   instance.count = n

   for (let i = 0; i < n; i++) {
      let pos = new THREE.Vector3(random(-4, 4), random(1, 5), random(-4, 4))
      let scale = random(0.5, 1)
      const matrix = new THREE.Matrix4()
      matrix.setPosition(pos)
      matrix.scale(new THREE.Vector3(scale, scale, scale))

      instance.setMatrixAt(i, matrix)
      instance.setColorAt(i, colors[i % colors.length])

      const shape = new CANNON.Sphere(scale)
      const body = new CANNON.Body({
         mass: 1,
         shape,
      })
      body.position.set(pos.x, pos.y, pos.z)
      // body.applyForce(new CANNON.Vec3(-2, 0, 0), body.position)
      world.addBody(body)
      data[i] = { scale, body }
   }
   if (instance.instanceColor) {
      instance.instanceColor.needsUpdate = true
   }
}

const setBoxes = (n: number, instance: THREE.InstancedMesh, data: PhysicsData = []) => {
   data.forEach(({ body }) => world.removeBody(body))
   data.length = n
   instance.count = n

   for (let i = 0; i < n; i++) {
      let pos = new THREE.Vector3(random(-4, 4), random(1, 5), random(-4, 4))
      let scale = random(0.9, 2)
      const matrix = new THREE.Matrix4()
      matrix.setPosition(pos)
      matrix.scale(new THREE.Vector3(scale, scale, scale))

      instance.setMatrixAt(i, matrix)
      instance.setColorAt(i, colors[i % colors.length])

      const shape = new CANNON.Box(new CANNON.Vec3(scale / 2, scale / 2, scale / 2))
      const body = new CANNON.Body({
         mass: 1,
         shape,
      })
      body.position.set(pos.x, pos.y, pos.z)
      world.addBody(body)
      data[i] = { scale, body }
   }
   if (instance.instanceColor) {
      instance.instanceColor.needsUpdate = true
   }
}

const boxMaterial = new THREE.MeshStandardMaterial({
   metalness: 0.3,
   roughness: 0.6,
   color: colors[0],
})
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)

/**
 * Mouse Stuff
 */
const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0))
plane.translate(new THREE.Vector3(0, 3, 0))

// const planeHelper = new THREE.PlaneHelper(plane, 100, 0xff0000)
// scene.add(planeHelper)

document.body.addEventListener('click', (e) => {
   mouse.x = (e.clientX / sizes.width) * 2 - 1
   mouse.y = -(e.clientY / sizes.height) * 2 + 1

   raycaster.setFromCamera(mouse, camera)
   const mesh = boxMesh.clone()

   // raycaster.ray.at(camera.position.z, mesh.position)
   raycaster.ray.intersectPlane(plane, mesh.position)
   scene.add(mesh)
})

/**
 * GUI
 */
const gui = new GUI()
gui.add(params, 'floorMetalness', 0, 1, 0.01).onChange(
   (val: number) => (floor.material.metalness = val)
)
gui.add(params, 'floorRoughness', 0, 1, 0.01).onChange(
   (val: number) => (floor.material.roughness = val)
)
gui.add(params, 'shapeMetalness', 0, 1, 0.01).onChange(
   (val: number) => (instanceMaterial.metalness = val)
)
gui.add(params, 'shapeRoughness', 0, 1, 0.01).onChange(
   (val: number) => (instanceMaterial.roughness = val)
)
gui.add(params, 'nShapes', 1, shapeMaxCount, 1).onChange((v: number) =>
   setSpheres(v, sphereInstance, spheresData)
)
const guiButtons = {
   reset: () => setSpheres(params.nShapes, sphereInstance, spheresData),
}
gui.add(guiButtons, 'reset').name('Reset Spheres')
guiLightFolder(gui, ambientLight, params.ambientLight, 'Ambient Light')
guiLightFolder(gui, directionalLight, params.directionalLight, 'Directional Light')

/**
 * Animate
 */
setSpheres(params.nShapes, sphereInstance, spheresData)
setBoxes(params.nShapes, boxInstance, boxesData)
console.log(boxesData)

let oldTime = 0
function animate() {
   requestAnimationFrame(animate)

   const elapsedTime = clock.getElapsedTime()
   const deltaTime = elapsedTime - oldTime
   oldTime = elapsedTime

   world.fixedStep()

   // ***** Update spheres ***** //
   for (let i = 0; i < params.nShapes; i++) {
      const matrix = new THREE.Matrix4()

      // let position = spheresData[i].position
      let { body, scale } = spheresData[i]
      let position = body.position

      matrix.setPosition(position.x, position.y, position.z)
      matrix.scale(new THREE.Vector3(scale, scale, scale))

      sphereInstance.setMatrixAt(i, matrix)
   }
   sphereInstance.instanceMatrix.needsUpdate = true

   // ***** Update boxes ***** //
   let count = boxInstance.count
   for (let i = 0; i < count; i++) {
      const matrix = new THREE.Matrix4()

      let { body, scale } = boxesData[i]
      let position = body.position
      let quaternion = new THREE.Quaternion(
         body.quaternion.x,
         body.quaternion.y,
         body.quaternion.z,
         body.quaternion.w
      )

      matrix.makeRotationFromQuaternion(quaternion)
      matrix.setPosition(position.x, position.y, position.z)
      matrix.scale(new THREE.Vector3(scale, scale, scale))

      boxInstance.setMatrixAt(i, matrix)
   }
   boxInstance.instanceMatrix.needsUpdate = true

   controls.update()

   renderer.render(scene, camera)
   stats.update()
}

requestAnimationFrame(animate)
