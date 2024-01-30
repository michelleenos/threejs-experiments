import World from '../utils/World'
import { GUI } from 'lil-gui'
import * as THREE from 'three'
import GeoParticles from './geo-particles'
import { FlyControls } from 'three/examples/jsm/Addons.js'

export const buildGui = (
   gui: GUI,
   world: World,
   particles: GeoParticles,
   controls: FlyControls,
   tls?: gsap.core.Timeline[]
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
   main.add(particles, 'count', 0, 100000).name('count')

   let camFolder = gui.addFolder('camera').close()
   camFolder.add(world.camera.position, 'x', -10, 10).name('x')
   camFolder.add(world.camera.position, 'y', -10, 10).name('y')
   camFolder.add(world.camera.position, 'z', -10, 10).name('z')
   camFolder.add(world.camera.rotation, 'x', -10, 10).name('rot x')
   camFolder.add(world.camera.rotation, 'y', -10, 10).name('rot y')
   camFolder.add(world.camera.rotation, 'z', -10, 10).name('rot z')

   let particleFolder = gui.addFolder('particles')
   particleFolder.add(particles.cloud.position, 'x', -10, 10).name('x')
   particleFolder.add(particles.cloud.position, 'y', -10, 10).name('y')
   particleFolder.add(particles.cloud.position, 'z', -10, 10).name('z')
   particleFolder.add(particles.cloud.rotation, 'x', -10, 10).name('rot x')
   particleFolder.add(particles.cloud.rotation, 'y', -10, 10).name('rot y')
   particleFolder.add(particles.cloud.rotation, 'z', -10, 10).name('rot z')

   controls.enabled = false
   const obj = {
      controlsEnabled: controls.enabled,
      copyCameraData: () => {
         let position = world.camera.position
         let rotation = world.camera.rotation
         let target = world.controls?.target

         const roundVecIsh = (vecIsh: THREE.Vector3 | THREE.Euler) => {
            let rounded = new THREE.Vector3(vecIsh.x, vecIsh.y, vecIsh.z)
            rounded.x = Math.round(vecIsh.x * 100) / 100
            rounded.y = Math.round(vecIsh.y * 100) / 100
            rounded.z = Math.round(vecIsh.z * 100) / 100
            return rounded
         }

         let pos = roundVecIsh(position)
         let rot = roundVecIsh(rotation)
         let tar = target && roundVecIsh(target)

         // copy to clipboard
         let data = `position: new THREE.Vector3(${pos.x}, ${pos.y}, ${pos.z})\n`
         data += `rotation: new THREE.Euler(${rot.x}, ${rot.y}, ${rot.z})\n`
         if (tar) data += `target: new THREE.Vector3(${tar.x}, ${tar.y}, ${tar.z})\n`
         navigator.clipboard.writeText(data)
      },
      updateCameraControls: () => {
         camFolder.controllersRecursive().forEach((c) => c.updateDisplay())
      },
      lookAtCenter: () => {
         world.camera.lookAt(0, 0, 0)
      },
   }

   gui.add(obj, 'controlsEnabled')
      .name('controls enabled')
      .onChange((enabled: Boolean) => {
         if (enabled) {
            controls.enabled = true
            document.body.classList.add('controls-enabled')

            if (tls) tls.forEach((tl) => tl.clear())
         } else {
            controls.enabled = false
            document.body.classList.remove('controls-enabled')
         }
      })
   gui.add(obj, 'lookAtCenter')
   gui.add(obj, 'copyCameraData')
   gui.add(obj, 'updateCameraControls').name('update camera controls')
}
