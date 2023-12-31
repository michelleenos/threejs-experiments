import '../style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { ParametricGeometry } from 'three/examples/jsm/Addons.js'
import Sizes from '../utils/Sizes'
import Timer from '../utils/Timer'
import World from '../utils/World'
import { fract, map } from '../utils'
import vertexShader from './vert.glsl'
import fragmentShader from './frag.glsl'
import { GUI } from 'lil-gui'

const timer = new Timer()
const sizes = new Sizes()

const world = new World(sizes)
world.renderer.shadowMap.enabled = true
world.renderer.shadowMap.type = THREE.PCFSoftShadowMap
world.camera.position.set(0, 10, 100)

const params = {
   xMin: -10,
   xMax: 10,
   yMin: -10,
   yMax: 10,
   stacks: 100,
   slices: 100,
}

// Lights
const ambientLight = new THREE.AmbientLight('#0095ff', 2)
const directionalLight = new THREE.DirectionalLight('#fff', 3)
directionalLight.castShadow = true
world.scene.add(ambientLight, directionalLight)

directionalLight.position.set(17, 28, -19)
directionalLight.lookAt(new THREE.Vector3(0, 0, 0))

directionalLight.shadow.camera.near = 11
directionalLight.shadow.camera.far = 40
directionalLight.shadow.camera.left = -20
directionalLight.shadow.camera.right = 20
directionalLight.shadow.camera.top = 20
directionalLight.shadow.camera.bottom = -20

directionalLight.shadow.camera.updateProjectionMatrix()

// Geometries
const material = new THREE.MeshLambertMaterial({
   color: '#fff',
   // vertexColors: true,
   // vertexShader,
   // fragmentShader,
   side: THREE.DoubleSide,
})
const graphGeometry = new ParametricGeometry(
   (u, v, target) => {
      const x = u * (params.xMax - params.xMin) + params.xMin
      const y = v * (params.yMax - params.yMin) + params.yMin
      // const z = Math.sin(x * y)
      const z = Math.sqrt(x * x + y * y)
      target.set(x, y, z)
   },
   100,
   100
)
const graph = new THREE.Mesh(graphGeometry, material)
graph.castShadow = true
graph.receiveShadow = true
graph.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
world.scene.add(graph)

// GUI
const gui = new GUI()
const graphFolder = gui.addFolder('Graph')
graphFolder.add(params, 'xMin', -10, 0)
graphFolder.add(params, 'xMax', 0, 10)
graphFolder.add(params, 'yMin', -10, 0)
graphFolder.add(params, 'yMax', 0, 10)
graphFolder.add(params, 'stacks', 0, 200).step(1)
graphFolder.add(params, 'slices', 0, 200).step(1)

graphFolder.onFinishChange(() => {
   graph.geometry.dispose()
   graph.geometry = new ParametricGeometry(
      (u, v, target) => {
         const x = u * (params.xMax - params.xMin) + params.xMin
         const y = v * (params.yMax - params.yMin) + params.yMin
         const z = Math.sqrt(x * x + y * y)
         target.set(x, y, z)
      },
      params.slices,
      params.stacks
   )
})

// Helpers
const axesHelper = new THREE.AxesHelper(20)
world.scene.add(axesHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
world.scene.add(directionalLightHelper)

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// world.scene.add(directionalLightCameraHelper)

const lightFolder = gui.addFolder('Light')

lightFolder.add(directionalLight, 'intensity', 0, 10)
const lightPosFolder = lightFolder.addFolder('Position')
lightPosFolder.add(directionalLight.position, 'x', -50, 50)
lightPosFolder.add(directionalLight.position, 'y', -50, 50)
lightPosFolder.add(directionalLight.position, 'z', -50, 50)

// const lightShadowFolder = lightFolder.addFolder('Shadow')
// lightShadowFolder.add(directionalLight.shadow.camera, 'near', 0, 100)
// lightShadowFolder.add(directionalLight.shadow.camera, 'far', 0, 100)
// lightShadowFolder.add(directionalLight.shadow.camera, 'left', -100, 100)
// lightShadowFolder.add(directionalLight.shadow.camera, 'right', -100, 100)
// lightShadowFolder.add(directionalLight.shadow.camera, 'top', -100, 100)
// lightShadowFolder.add(directionalLight.shadow.camera, 'bottom', -100, 100)
lightPosFolder.onChange(() => {
   directionalLight.lookAt(new THREE.Vector3(0, 0, 0))
   // directionalLight.shadow.camera.updateProjectionMatrix()
   // directionalLightCameraHelper.update()
})
// lightShadowFolder.add(directionalLight.shadow, 'radius', 0, 100)

function animate() {
   world.render()
}

timer.on('tick', animate)
