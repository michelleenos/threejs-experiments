import { GUI } from 'lil-gui'
import * as THREE from 'three'
import Ring from './Ring'
import FloorMirror from './FloorMirror'
import World from '../utils/World'

export const lightGui = (
   light: THREE.AmbientLight | THREE.DirectionalLight | THREE.PointLight,
   gui: GUI,
   helper?: THREE.DirectionalLightHelper | THREE.PointLightHelper
) => {
   const folder = gui.addFolder(light.type).close()
   folder.addColor(light, 'color').onChange((val: string) => light.color.set(val))
   folder.add(light, 'intensity', 0, 100, 0.1)
   folder.add(light, 'visible')

   if (light instanceof THREE.AmbientLight) {
      return
   }

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
   const shapesFolder = gui.addFolder('Shapes').close()
   shapesFolder.add(ring, 'shapeMetalness', 0, 1, 0.01)
   shapesFolder.add(ring, 'shapeRoughness', 0, 1, 0.01)
   shapesFolder.add(ring, 'shapeOpacity', 0, 1, 0.01)
   shapesFolder.add(ring, 'innerMetalness', 0, 1, 0.01)
   shapesFolder.add(ring, 'innerRoughness', 0, 1, 0.01)
   shapesFolder.add(ring, 'wonkyVary', 0, 5, 0.1)
   shapesFolder.add(ring, 'wonkyRadius', 0, 5, 0.1)
   shapesFolder.add(ring, 'coneRadius', 0, 50, 0.1)
   shapesFolder.add(ring, 'coneHeight', 0, 50, 0.1)
   shapesFolder.add(ring, 'coneSegments', 0, 200, 1)
   shapesFolder.add(ring, 'ringRadius', 0, 100, 1)
   shapesFolder.add(ring, 'count', 0, 100, 1)
   shapesFolder.add(ring, 'wonkyPosY', -10, 10, 0.1)

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
   floorFolder
      .addColor(mirror.floor.material, 'color')
      .name('floorColor')
      .onChange((val: string) => {
         mirror.floor.material.color.set(val)
      })
   floorFolder.add(mirror, 'planeDist', -10, 5, 0.01)
   // floorFolder.add(mirror.position, 'x', -100, 100, 0.1)
   // floorFolder.add(mirror.position, 'y', -100, 100, 0.1)
   // floorFolder.add(mirror.position, 'z', -100, 100, 0.1)
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
   floorFolder.addColor(mirror, 'mirrorColor')

   floorFolder.close()
}

export type SceneParams = {
   cameraPosDefault: THREE.Vector3
   maxAcceleration: number
   velMult: number
}

export const sceneGui = (world: World, gui: GUI, params: SceneParams) => {
   const sceneParams = {
      clearColor: new THREE.Color(),
   }
   world.renderer.getClearColor(sceneParams.clearColor)

   const sceneFolder = gui.addFolder('Scene').close()
   sceneFolder.addColor(sceneParams, 'clearColor').onChange((val: string) => {
      world.renderer.setClearColor(val)
   })

   sceneFolder
      .add(world.controls, 'enabled')
      .name('controls')
      .onChange((val: boolean) => {
         if (!val) world.camera.position.copy(params.cameraPosDefault)
      })

   sceneFolder.add(params, 'maxAcceleration', 0, 0.5, 0.01)
   sceneFolder.add(params, 'velMult', 0, 1, 0.01)
}
