import { GUI } from 'lil-gui'
import * as THREE from 'three'
import Ring from './Ring'
import FloorMirror from './FloorMirror'
import Experience from './231231'

export const lightGui = (
   light: THREE.AmbientLight | THREE.DirectionalLight | THREE.PointLight,
   gui: GUI,
   helper?: THREE.DirectionalLightHelper | THREE.PointLightHelper
) => {
   const folder = gui.addFolder(light.type)
   let lightParams = {
      color: light.color.getHexString(),
   }
   folder.addColor(lightParams, 'color').onChange((val: string) => light.color.set(val))
   folder.add(light, 'intensity', 0, 100, 0.1)
   folder.add(light, 'visible')

   if (light instanceof THREE.AmbientLight) return

   folder.add(light.position, 'x', -300, 300, 1)
   folder.add(light.position, 'y', -300, 300, 1)
   folder.add(light.position, 'z', -300, 300, 1)

   if (light instanceof THREE.PointLight) {
      folder.add(light, 'distance', 0, 5000, 1)
      folder.add(light, 'decay', 0, 5, 0.1)
   }

   if (helper) {
      folder.add(helper, 'visible').name('helper')
      folder.onChange(() => helper.update())
   }
}

export const ringGui = (ring: Ring, gui: GUI) => {
   const f = gui.addFolder('Shapes').close()
   f.add(ring.outerMaterial, 'metalness', 0, 1, 0.01)
   f.add(ring.outerMaterial, 'roughness', 0, 1, 0.01)
   f.add(ring.outerMaterial, 'opacity', 0, 1, 0.01)
   f.add(ring, 'wonkyMetalness', 0, 1, 0.01)
   f.add(ring, 'wonkyRoughness', 0, 1, 0.01)
   f.add(ring, 'wonkyVary', 0, 5, 0.1)
   f.add(ring, 'wonkyRadius', 0, 5, 0.1)
   f.add(ring, 'coneRadius', 0, 50, 0.1)
   f.add(ring, 'coneHeight', 0, 50, 0.1)
   f.add(ring, 'coneSegments', 0, 200, 1)
   f.add(ring, 'ringRadius', 0, 100, 1)
   f.add(ring, 'count', 0, 100, 1)
   f.add(ring, 'innerPosY', -10, 10, 0.1)
   f.add(ring.position, 'y', -10, 10, 0.1)

   const colorsFolder = gui.addFolder('Shape Colors').close()
   for (let color of Object.keys(ring.colorOpts) as ['red', 'green', 'blue']) {
      for (let opt of Object.keys(ring.colorOpts[color]) as ['start', 'end', 'offset']) {
         colorsFolder
            .add(ring.colorOpts[color], opt, -1, 2, 0.01)
            .name(`${color} ${opt}`)
            .onChange((val: number) => ring.updateColorOpt(color, opt, val))
      }
   }
}

export const mirrorGui = (mirror: FloorMirror, gui: GUI) => {
   const floorFolder = gui.addFolder('Floor/Mirror')
   floorFolder.add(mirror.floor.material, 'opacity', 0, 1, 0.01)
   floorFolder.add(mirror.floor.material, 'roughness', 0, 3, 0.01).name('floorRoughness')
   floorFolder.add(mirror.floor.material, 'metalness', 0, 3, 0.01).name('floorMetalness')
   const floorParams = {
      mirrorColor: mirror.mirrorColor,
      floorColor: mirror.floor.material.color.getHexString(),
   }
   floorFolder.addColor(floorParams, 'floorColor').onChange((val: string) => {
      mirror.floor.material.color.set(val)
   })
   floorFolder.addColor(floorParams, 'mirrorColor').onChange((val: string) => {
      mirror.mirrorColor = val
   })

   floorFolder
      .add(mirror.size, 'x', 0, 1000, 0.1)
      .name('width')
      .onChange((val: number) => {
         mirror.size = new THREE.Vector2(val, mirror.size.y)
      })
   floorFolder
      .add(mirror.size, 'y', 0, 1000, 0.1)
      .name('height')
      .onChange((val: number) => {
         mirror.size = new THREE.Vector2(mirror.size.x, val)
      })

   floorFolder.close()
}

export const sceneGui = (env: Experience) => {
   const sceneFolder = env.gui.addFolder('Scene').close()

   let clearColor = new THREE.Color()
   env.world.renderer.getClearColor(clearColor)
   const p = { clearColor: clearColor.getHexString() }

   sceneFolder.addColor(p, 'clearColor').onChange((val: string) => {
      env.world.renderer.setClearColor(val)
   })

   sceneFolder
      .add(env.world.controls, 'enabled')
      .name('controls')
      .onChange((val: boolean) => {
         if (!val) env.world.camera.position.copy(env.cameraPosDefault)
      })

   sceneFolder.add(env, 'maxAcceleration', 0, 0.5, 0.01)
   sceneFolder.add(env, 'velMult', 0, 1, 0.01)
}

const getGui = (env: Experience) => {
   sceneGui(env)
   let lightsFolder = env.gui.addFolder('Lights').close()
   lightGui(env.lights.ambient, lightsFolder)
   lightGui(env.lights.directional, lightsFolder)
   lightGui(env.lights.point, lightsFolder)
   ringGui(env.ring, env.gui)
   mirrorGui(env.mirror, env.gui)
}

export default getGui
