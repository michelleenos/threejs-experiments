import '../style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import World from '../utils/World'
import Sizes from '../utils/sizes'
import GeoParticles from './geo-particles'
import Mouse from '../utils/Mouse'
import { GUI } from 'lil-gui'

let particles: GeoParticles

const sizes = new Sizes()
const world = new World(sizes)
const mouse = new Mouse(sizes)
const clock = new THREE.Clock()
const gui = new GUI()

const target = new THREE.Vector3(0, 0, 0)

const axes = new THREE.AxesHelper(10)
world.scene.add(axes)
window.world = world

const cameraSpherical = new THREE.Spherical()
world.renderer.outputColorSpace = THREE.SRGBColorSpace
world.camera.position.set(0, 5, 0)

// world.scene.add(line)

// world.camera.position.set(-2.29, 0.06, -5.72)
// world.camera.rotation.set(2.88, -1, 2.92)
// world.controls.target.set(0.79, 0.56, -3.81)

cameraSpherical.setFromVector3(world.camera.position)

const baseUrl = import.meta.env.DEV ? '' : import.meta.env.BASE_URL
const gltfLoader = new GLTFLoader()
gltfLoader.load(baseUrl + '/scenes/dna/dna-2-painted.glb', (gltf) => {
   console.log(gltf)

   let object = gltf.scene?.children?.[0]
   if (!(object instanceof THREE.Mesh)) return

   particles = new GeoParticles(object, sizes)
   console.log(particles)
   particles.cloud.rotateX(Math.PI / 2)
   particles.cloud.rotateZ(Math.PI / 2)
   // particles.cloud.position.set(3, -5, -5)
   world.scene.add(particles.cloud)
   window.particles = particles

   buildGui()
})

const buildGui = () => {
   const obj = {
      lookAtCenter: () => {
         world.camera.lookAt(new THREE.Vector3(0, 0, 0))
         cameraSpherical.setFromVector3(world.camera.position)
         cameraFolder.controllersRecursive().forEach((controller) => {
            controller.updateDisplay()
         })
      },
      getCameraData: () => {
         let position = world.camera.position
         let rotation = world.camera.rotation
         let target = world.controls.target

         const roundVecIsh = (vecIsh: THREE.Vector3 | THREE.Euler) => {
            let rounded = new THREE.Vector3(vecIsh.x, vecIsh.y, vecIsh.z)
            rounded.x = Math.round(vecIsh.x * 100) / 100
            rounded.y = Math.round(vecIsh.y * 100) / 100
            rounded.z = Math.round(vecIsh.z * 100) / 100
            return rounded
         }

         let pos = roundVecIsh(position)
         let rot = roundVecIsh(rotation)
         let tar = roundVecIsh(target)

         // copy to clipboard
         let data = `world.camera.position.set(${pos.x}, ${pos.y}, ${pos.z})\n`
         data += `world.camera.rotation.set(${rot.x}, ${rot.y}, ${rot.z})\n`
         data += `world.controls.target.set(${tar.x}, ${tar.y}, ${tar.z})\n`
         navigator.clipboard.writeText(data)
      },
   }

   gui.add(particles.material.uniforms.uSize, 'value', 0, 100).name('size')
   gui.add(particles.material.uniforms.uScaleMin, 'value', 0, 10, 0.1).name('scale min')
   gui.add(particles.material.uniforms.uScaleMax, 'value', 0, 10, 0.1).name('scale max')
   gui.add(particles.material.uniforms.uScaleMiddleMin, 'value', 0, 10, 0.1).name(
      'scale middle min'
   )
   gui.add(particles.material.uniforms.uScaleMiddleMax, 'value', 0, 10, 0.1).name(
      'scale middle max'
   )
   gui.add(particles.material.uniforms.uPhiMult, 'value', 0, 10, 0.1).name('phi mult')
   gui.add(particles.material.uniforms.uThetaMult, 'value', 0, 10, 0.1).name('theta mult')
   gui.add(particles.material.uniforms.uNoiseRadius, 'value', 0, 1, 0.01).name('noise radius')
   gui.add(particles.material.uniforms.uSpeed, 'value', 0, 1, 0.01).name('speed')
   gui.add(particles.material.uniforms.uSquishMain, 'value', 0, 1, 0.001).name('squish main')
   gui.add(particles.material.uniforms.uSquishMiddle, 'value', 0, 1, 0.001).name('squish middles')
   gui.add(particles, 'count', 0, 100000).name('count')

   let cameraFolder = gui.addFolder('camera')
   // cameraFolder.add(world.camera.position, 'x', -30, 30).name('x')
   // cameraFolder.add(world.camera.position, 'y', -30, 30).name('y')
   // cameraFolder.add(world.camera.position, 'z', -30, 30).name('z')
   // cameraFolder.add(world.camera.rotation, 'x', -Math.PI, Math.PI).name('rx')
   // cameraFolder.add(world.camera.rotation, 'y', -Math.PI, Math.PI).name('ry')
   // cameraFolder.add(world.camera.rotation, 'z', -Math.PI, Math.PI).name('rz')
   cameraFolder.add(cameraSpherical, 'radius', 0, 30).name('radius')
   cameraFolder.add(cameraSpherical, 'phi', 0, Math.PI).name('phi')
   cameraFolder.add(cameraSpherical, 'theta', 0, 2 * Math.PI).name('theta')
   cameraFolder.add(target, 'x', -100, 100).name('target x')
   cameraFolder.add(target, 'y', -100, 100).name('target y')
   cameraFolder.add(target, 'z', -100, 100).name('target z')
   cameraFolder.onChange(() => {
      world.camera.position.setFromSpherical(cameraSpherical)
      world.camera.lookAt(target)
      world.controls.target.set(target.x, target.y, target.z)
   })
   gui.add(obj, 'lookAtCenter').name('look at center')
   gui.add(obj, 'getCameraData').name('get camera data')
}

const animate = () => {
   const time = clock.getElapsedTime()

   particles && particles.tick(time)

   world.render()
   window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)
