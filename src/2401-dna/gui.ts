import World from '../utils/World'
import { GUI } from 'lil-gui'
import * as THREE from 'three'
import GeoParticles from './geo-particles'
import { FlyControls } from 'three/examples/jsm/Addons.js'
import { DNAScroll } from './scroll-positions'

const roundVecIsh = (vecIsh: THREE.Vector3 | THREE.Euler) => {
   let rounded = new THREE.Vector3(vecIsh.x, vecIsh.y, vecIsh.z)
   rounded.x = Math.round(vecIsh.x * 100) / 100
   rounded.y = Math.round(vecIsh.y * 100) / 100
   rounded.z = Math.round(vecIsh.z * 100) / 100
   return rounded
}

export const buildGui = (
   gui: GUI,
   world: World,
   particles: GeoParticles,
   controls: FlyControls,
   scroller: DNAScroll
) => {
   let main = gui.addFolder('main').close()
   main.add(particles.material.uniforms.uSize, 'value', 0, 100).name('size')
   main.add(particles.material.uniforms.uScaleMin, 'value', 0, 10, 0.1).name('scale min')
   main.add(particles.material.uniforms.uScaleMax, 'value', 0, 10, 0.1).name('scale max')
   main
      .add(particles.material.uniforms.uScaleMiddleMin, 'value', 0, 10, 0.1)
      .name('scale middle min')
   main
      .add(particles.material.uniforms.uScaleMiddleMax, 'value', 0, 10, 0.1)
      .name('scale middle max')
   main
      .add(particles.material.uniforms.uNoiseResolution, 'value', 0, 10, 0.1)
      .name('noise resolution')
   main.add(particles.material.uniforms.uNoiseRadius, 'value', 0, 1, 0.01).name('noise radius')
   main.add(particles.material.uniforms.uSpeed, 'value', 0, 1, 0.01).name('speed')
   main.add(particles.material.uniforms.uSquishMain, 'value', 0, 1, 0.001).name('squish main')
   main
      .add(particles.material.uniforms.uSquishMiddle, 'value', 0, 0.3, 0.001)
      .name('squish middles')
   main.add(particles.raycaster.params.Points, 'threshold', 0, 10, 0.01).name('raycaster threshold')
   main.add(particles, 'count', 0, 100000).name('count')

   let camFolder = gui.addFolder('camera').close().hide()
   camFolder.add(world.camera.position, 'x', -10, 10).name('x')
   camFolder.add(world.camera.position, 'y', -10, 10).name('y')
   camFolder.add(world.camera.position, 'z', -10, 10).name('z')
   camFolder.add(world.camera.rotation, 'x', -10, 10).name('rot x')
   camFolder.add(world.camera.rotation, 'y', -10, 10).name('rot y')
   camFolder.add(world.camera.rotation, 'z', -10, 10).name('rot z')

   let particleFolder = gui.addFolder('particles').close().hide()
   particleFolder.add(particles.cloud.position, 'x', -10, 10).name('x')
   particleFolder.add(particles.cloud.position, 'y', -10, 10).name('y')
   particleFolder.add(particles.cloud.position, 'z', -10, 10).name('z')
   particleFolder.add(particles.cloud.rotation, 'x', -10, 10).name('rot x')
   particleFolder.add(particles.cloud.rotation, 'y', -10, 10).name('rot y')
   particleFolder.add(particles.cloud.rotation, 'z', -10, 10).name('rot z')

   controls.enabled = false
   const obj = {
      copyCameraData: () => {
         let position = world.camera.position
         let rotation = world.camera.rotation

         let pos = roundVecIsh(position)
         let rot = roundVecIsh(rotation)

         // copy to clipboard
         let data = `position: new THREE.Vector3(${pos.x}, ${pos.y}, ${pos.z})\n`
         data += `rotation: new THREE.Euler(${rot.x}, ${rot.y}, ${rot.z})\n`
         navigator.clipboard.writeText(data)
      },
      copyParticlesData: () => {
         let position = particles.cloud.position
         let rotation = particles.cloud.rotation

         let pos = roundVecIsh(position)
         let rot = roundVecIsh(rotation)
         let data = `position: new THREE.Vector3(${pos.x}, ${pos.y}, ${pos.z})\n`
         data += `rotation: new THREE.Euler(${rot.x}, ${rot.y}, ${rot.z})\n`
         navigator.clipboard.writeText(data)
      },
      switchToManualControls: () => {
         switchToControls(gui, world, particles, controls, scroller)
      },
   }

   gui.add(obj, 'copyCameraData')
   gui.add(obj, 'copyParticlesData')
   gui.add(obj, 'switchToManualControls')
}

const switchToControls = (
   gui: GUI,
   world: World,
   particles: GeoParticles,
   controls: FlyControls,
   scroller: DNAScroll
) => {
   controls.enabled = true
   document.body.classList.add('controls-enabled')
   scroller.destroy()

   let camFolder = gui.folders.find((f) => f._title === 'camera')
   if (camFolder) camFolder.show()

   let particleFolder = gui.folders.find((f) => f._title === 'particles')
   if (particleFolder) particleFolder.show()

   let manualControlsBtn = gui.controllers.find((c) => c._name === 'switchToManualControls')
   if (manualControlsBtn) manualControlsBtn.hide()

   const obj = {
      refreshControllers: () => {
         gui.controllersRecursive().forEach((c) => c.updateDisplay())
      },
      lookAtCenter: () => {
         world.camera.lookAt(0, 0, 0)
         camFolder && camFolder.controllersRecursive().forEach((c) => c.updateDisplay())
      },
   }

   gui.add(obj, 'refreshControllers')
   gui.add(obj, 'lookAtCenter')
}
