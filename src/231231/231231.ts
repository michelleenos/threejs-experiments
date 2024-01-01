import '../style.css'
import * as THREE from 'three'
import Sizes from '../utils/Sizes'
import Timer from '../utils/Timer'
import World from '../utils/World'
import { GUI } from 'lil-gui'
import { lightGui } from './guistuff'
import { MeshReflectorMaterial } from '@pmndrs/vanilla'

const params = {
   shapes: 10,
   startingAngle: 0,
   shapesRotation: Math.PI * 0.5,
}

const gui = new GUI()

const timer = new Timer()
const sizes = new Sizes()

const world = new World(sizes)
world.camera.position.set(0, 30, 100)
world.renderer.setClearColor('#eafdff')
world.camera.far = 1000
// world.scene.fog = new THREE.Fog('#eafdff', 200, 300)

const loader = new THREE.TextureLoader()
const matcap = loader.load('/matcaps/iridescent.png')

// const rgbeLoader = new RGBELoader()
// rgbeLoader.load('/env/studio-2k.hdr', (texture) => {
//    texture.mapping = THREE.EquirectangularReflectionMapping
//    world.scene.environment = texture
//    // world.scene.background = texture
// })

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#fafafa', 0.5)
const dirLight = new THREE.DirectionalLight('#fff', 2.5)
dirLight.position.set(-5, 15, 0)
const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 5, '#00ff00')
const pointLight = new THREE.PointLight('#fafafa', 5, 0, 1)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 5, '#ff00ff')
pointLight.position.set(10, -3, 0)
ambientLight.visible = false
// dirLight.visible = false
pointLight.visible = false
world.scene.add(ambientLight, dirLight, pointLight)
lightGui(ambientLight, gui)
lightGui(dirLight, gui)
lightGui(pointLight, gui)

const matcapMaterial = new THREE.MeshMatcapMaterial({
   matcap: matcap,
   transparent: true,
   side: THREE.DoubleSide,
   opacity: 0.5,
})

const geometry = new THREE.ConeGeometry(7, 20, 32)
const shapes: THREE.Mesh[] = []
for (let i = 0; i < params.shapes; i++) {
   const shape = new THREE.Mesh(geometry, matcapMaterial)

   shapes.push(shape)
}

const shapesGroup = new THREE.Group()
shapesGroup.add(...shapes)
world.scene.add(shapesGroup)

const centerSphere = new THREE.Mesh(
   new THREE.SphereGeometry(5, 32, 32),
   new THREE.MeshStandardMaterial({ color: '#ff00ff' })
)
world.scene.add(centerSphere)

const setCones = () => {
   shapes.forEach((shape, i) => {
      shape.rotation.set(0, 0, 0)
      const angle = (i / params.shapes) * Math.PI * 2 + params.startingAngle
      shape.position.x = Math.cos(angle) * 50
      shape.position.z = Math.sin(angle) * 50
      shape.lookAt(centerSphere.position)
      shape.rotateX(params.shapesRotation)
   })
}

setCones()

/**
 * Floor
 */
const floor = new THREE.Mesh(
   new THREE.PlaneGeometry(1000, 1000),
   new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.5,
   })
)

floor.position.y = -30
world.scene.add(floor)
floor.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI * -0.5)
const reflectorMaterial = new MeshReflectorMaterial({
   color: '#fafafa',
   mixBlur: 1,
   mixStrength: 5,
   minDepthThreshold: 0,
   maxDepthThreshold: 1,
   depthToBlurRatioBias: 0.25,
   mirror: 0,
   distortion: 0.25,
   mixContrast: 1,
   reflectorOffset: 0,
   textureMatrix: new THREE.Matrix4(),
})
floor.material = reflectorMaterial

// window.world = world

/**
 * GUI
 */

gui.add(shapesGroup.position, 'x', -100, 100, 0.1)
gui.add(shapesGroup.position, 'y', -100, 100, 0.1)
gui.add(shapesGroup.position, 'z', -100, 100, 0.1)

// folderMaterial.add(floor.material, 'roughness', 0, 3, 0.01)
// folderMaterial.add(floor.material, 'metalness', 0, 3, 0.01)
// folderMaterial
//    .addColor(floor.material, 'color')
//    .onChange((val: string) => floor.material.color.set(val))

// Animate
function animate() {
   world.render()
}

timer.on('tick', animate)
