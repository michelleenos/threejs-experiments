import World from '../utils/World'
import { GUI } from 'lil-gui'
import * as THREE from 'three'
import GeoParticles from './geo-particles'
import { FlyControls } from 'three/examples/jsm/Addons.js'
import { DNAScroll } from './scroll-positions'
import { DataView } from '../utils/data-view'
import { createElement } from '../utils/dom'

export const makeDataView = (
   data: DataView,
   world: World,
   particles: GeoParticles,
   scroll: DNAScroll
) => {
   const cameraData = data.createSection('camera')
   cameraData.add(world.camera, 'position')
   cameraData.add(world.camera, 'rotation')

   let particlesData = data.createSection('particles')
   particlesData.add(particles.cloud, 'position')
   particlesData.add(particles.cloud, 'rotation')

   let mouseData = data.createSection('mouse')
   mouseData.add(particles.mouse, 'screenPos')
   mouseData.add(particles.material.uniforms.uMouse1, 'value', 'cloudPos')
   mouseData.add(particles, 'intersectionCount', 'intersects')

   scrollTableDataView(data, scroll)
}

const scrollTableDataView = (data: DataView, scroller: DNAScroll) => {
   const createRow = (i: number) => {
      return createElement('tr', { id: `scroll-${i}` }, [
         createElement('th', {}, i.toString()),
         createElement('td', { class: 'pos' }),
         createElement('td', { class: 'duration' }),
         createElement('td', { class: 'offset' }),
      ])
   }

   const rows = [createRow(0), createRow(1), createRow(2)]
   const table = createElement('table', {}, [
      createElement('tr', {}, [
         createElement('td'),
         createElement('th', {}, 'position'),
         createElement('th', {}, 'duration'),
         createElement('th', {}, 'offset'),
      ]),
      ...rows,
   ])

   const writeScrollRow = (row: HTMLElement, i: number) => {
      let pos = row.querySelector('.pos')!
      let duration = row.querySelector('.duration')!
      let offset = row.querySelector('.offset')!
      pos.innerHTML = scroller.sections[i].position.toFixed(2)
      duration.innerHTML = scroller.sections[i].duration.toFixed(2)
      offset.innerHTML = scroller.sections[i].offset.toFixed(2)
   }

   const onUpdate = () => {
      rows.forEach((row, i) => writeScrollRow(row, i))
   }

   data.createCustomSection(table, onUpdate, 'scroll positions')
}

const roundVecIsh = (vecIsh: THREE.Vector3 | THREE.Euler) => {
   let rounded = new THREE.Vector3(vecIsh.x, vecIsh.y, vecIsh.z)
   rounded.x = Math.round(vecIsh.x * 100) / 100
   rounded.y = Math.round(vecIsh.y * 100) / 100
   rounded.z = Math.round(vecIsh.z * 100) / 100
   return rounded
}

const getThreeJsCodeForItem = (item: THREE.Vector3 | THREE.Euler, name: string) => {
   let rounded = roundVecIsh(item)
   let type = item instanceof THREE.Euler ? 'Euler' : 'Vector3'
   return `${name}: new THREE.${type}(${rounded.x}, ${rounded.y}, ${rounded.z})`
}

export const buildGui = (
   gui: GUI,
   world: World,
   particles: GeoParticles,
   controls: FlyControls,
   scroller: DNAScroll
) => {
   let fShader = gui.addFolder('uniforms')
   fShader.add(particles.material.uniforms.uSize, 'value', 0, 100).name('size')
   fShader.add(particles.material.uniforms.uScaleMain, 'value', 0, 10, 0.1).name('scale main')
   fShader.add(particles.material.uniforms.uScaleMiddle, 'value', 0, 10, 0.1).name('scale middle')
   fShader
      .add(particles.material.uniforms.uNoiseResolution, 'value', 0, 10, 0.1)
      .name('noise resolution')
   fShader.add(particles.material.uniforms.uNoiseRadius, 'value', 0, 1, 0.01).name('noise radius')
   fShader.add(particles.material.uniforms.uSpeed, 'value', 0, 1, 0.01).name('speed')
   fShader.add(particles.material.uniforms.uSquishMain, 'value', 0, 1, 0.001).name('squish main')
   fShader
      .add(particles.material.uniforms.uSquishMiddle, 'value', 0, 0.3, 0.001)
      .name('squish middles')
   fShader.add(particles.material.uniforms.uDoMouseDistort, 'value', 0, 1, 1).name('mouse distort')
   fShader.add(particles.material.uniforms.uMove, 'value', -3, 3, 0.1).name('move')

   let fParticles = gui.addFolder('particles').close()
   fParticles
      .add(particles.raycaster.params.Points, 'threshold', 0, 10, 0.01)
      .name('raycaster threshold')
   fParticles.add(particles, 'count', 0, 100000).name('count')

   let fCamera = gui.addFolder('camera').close().hide()
   fCamera.add(world.camera.position, 'x', -10, 10).name('x')
   fCamera.add(world.camera.position, 'y', -10, 10).name('y')
   fCamera.add(world.camera.position, 'z', -10, 10).name('z')
   fCamera.add(world.camera.rotation, 'x', -10, 10).name('rx')
   fCamera.add(world.camera.rotation, 'y', -10, 10).name('ry')
   fCamera.add(world.camera.rotation, 'z', -10, 10).name('rz')

   let fParticleMesh = gui.addFolder('mesh').close().hide()
   fParticleMesh.add(particles.cloud.position, 'x', -10, 10).name('x')
   fParticleMesh.add(particles.cloud.position, 'y', -10, 10).name('y')
   fParticleMesh.add(particles.cloud.position, 'z', -10, 10).name('z')
   fParticleMesh.add(particles.cloud.rotation, 'x', -10, 10).name('rx')
   fParticleMesh.add(particles.cloud.rotation, 'y', -10, 10).name('ry')
   fParticleMesh.add(particles.cloud.rotation, 'z', -10, 10).name('rz')

   controls.enabled = false
   controls.addEventListener('change', particles.onResize)
   const obj = {
      copyCameraData: () => {
         navigator.clipboard.writeText(`
            ${getThreeJsCodeForItem(world.camera.position, 'position')}\n
            ${getThreeJsCodeForItem(world.camera.rotation, 'rotation')}\n`)
      },
      copyParticlesData: () => {
         navigator.clipboard.writeText(`
            ${getThreeJsCodeForItem(particles.cloud.position, 'position')}\n
            ${getThreeJsCodeForItem(particles.cloud.rotation, 'rotation')}\n`)
      },
      switchToFlyControls: () => {
         switchToControls(gui, world, particles, controls, scroller)
      },
   }

   gui.add(obj, 'copyCameraData')
   gui.add(obj, 'copyParticlesData')
   gui.add(obj, 'switchToFlyControls')
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

   let particleFolder = gui.folders.find((f) => f._title === 'mesh')
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
