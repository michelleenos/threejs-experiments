import { GUI } from 'lil-gui'
import * as THREE from 'three'
import Ring from './Ring'
import Experience, { ExpParams } from './231231'
import presets from './presets'

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
   folder.add(light, 'intensity', 0, 15, 0.1)
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
      helper.visible = false
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
   f.add(ring, 'wonkyShapeNoiseSpeed', 0, 0.05, 0.0001).name('noiseSpeed')
   f.add(ring, 'wonkyShapeNoiseAmount', 0, 5, 0.01).name('noiseAmount')
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

export const mirrorGui = (env: Experience) => {
   let { gui, mirror } = env
   const f = gui.addFolder('Floor/Mirror')
   f.add(mirror.floor.material, 'opacity', 0, 1, 0.01)
   f.add(mirror.floor.material, 'roughness', 0, 3, 0.01).name('floorRoughness')
   f.add(mirror.floor.material, 'metalness', 0, 3, 0.01).name('floorMetalness')
   f.add(env.mirrorX, 'min', -100, 100, 1).name('mirrorXmin')
   f.add(env.mirrorX, 'max', -100, 100, 1).name('mirrorXmax')
   f.add(env.mirrorZ, 'min', -100, 100, 1).name('mirrorZmin')
   f.add(env.mirrorZ, 'max', -100, 100, 1).name('mirrorZmax')
   const floorParams = {
      mirrorColor: mirror.mirrorColor,
      floorColor: mirror.floor.material.color.getHexString(),
   }
   f.addColor(floorParams, 'floorColor').onChange((val: string) => {
      mirror.floor.material.color.set(val)
   })
   f.addColor(floorParams, 'mirrorColor').onChange((val: string) => {
      mirror.mirrorColor = val
   })

   f.add(mirror.size, 'x', 0, 1000, 0.1)
      .name('width')
      .onChange((val: number) => {
         mirror.size = new THREE.Vector2(val, mirror.size.y)
      })
   f.add(mirror.size, 'y', 0, 1000, 0.1)
      .name('height')
      .onChange((val: number) => {
         mirror.size = new THREE.Vector2(mirror.size.x, val)
      })

   f.close()
}

export const sceneGui = (env: Experience) => {
   const sceneFolder = env.gui.addFolder('Scene').close()

   let clearColor = new THREE.Color()
   env.world.renderer.getClearColor(clearColor)
   let params = {
      clearColor: clearColor.getHexString(),
   }
   sceneFolder.addColor(params, 'clearColor').onChange((val: string) => {
      env.clearColor = val
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
   lightGui(env.lights.directional, lightsFolder, env.lights.dirHelper)
   lightGui(env.lights.point, lightsFolder, env.lights.pointHelper)
   ringGui(env.ring, env.gui)
   mirrorGui(env)

   let params = {
      preset: '',
      getPreset: () => getPreset(env),
   }
   let presetOpts = [''].concat(Object.keys(presets))
   env.gui.add(params, 'preset', presetOpts).onChange((val: number | string) => {
      // console.log(val)
      if (presets[+val]) {
         env.dispose()
         env.setFromParams(presets[+val])
      }
   })
   env.gui.add(params, 'getPreset')
}

const getPreset = (env: Experience) => {
   const getPositionCode = (pos: THREE.Vector3) => {
      return `new THREE.Vector3(${pos.x}, ${pos.y}, ${pos.z})`
   }
   let preset = {
      clearColor: `#${env.clearColor}`,
      lightOptions: {
         ambient: {
            color: `#${env.lights.ambient.color.getHexString()}`,
            intensity: env.lights.ambient.intensity,
            visible: env.lights.ambient.visible,
         },
         directional: {
            visible: env.lights.directional.visible,
            intensity: env.lights.directional.intensity,
            color: `#${env.lights.directional.color.getHexString()}`,
            position: getPositionCode(env.lights.directional.position),
         },
         point: {
            color: `#${env.lights.point.color.getHexString()}`,
            visible: env.lights.point.visible,
            position: getPositionCode(env.lights.point.position),
            intensity: env.lights.point.intensity,
            distance: env.lights.point.distance,
            decay: env.lights.point.decay,
         },
      },
      ringOptions: {
         innerPosY: env.ring.innerPosY,
         posY: env.ring.position.y,
         outerOpacity: env.ring.outerMaterial.opacity,
         metalness: env.ring.outerMaterial.metalness,
         roughness: env.ring.outerMaterial.roughness,
         coneRadius: env.ring.coneRadius,
         coneHeight: env.ring.coneHeight,
         coneSegments: env.ring.coneSegments,
         ringRadius: env.ring.ringRadius,
         count: env.ring.count,
         wonkyShapeOptions: {
            vary: env.ring.wonkyVary,
            radius: env.ring.wonkyRadius,
            roughness: env.ring.wonkyRoughness,
            metalness: env.ring.wonkyMetalness,
            noiseAmount: env.ring.wonkyShapeNoiseAmount,
            noiseSpeed: env.ring.wonkyShapeNoiseSpeed,
         },
         colorOpts: {
            ...env.ring.colorOpts,
         },
      },
      mirrorOptions: {
         mirrorColor: env.mirror.mirrorColor,
         screenColor: `#${env.mirror.floor.material.color.getHexString()}`,
         screenRoughness: env.mirror.floor.material.roughness,
         screenMetalness: env.mirror.floor.material.metalness,
         screenOpacity: env.mirror.floor.material.opacity,
      },
   }

   let str = JSON.stringify(preset, null, 3)
   str = str.replace(/"([^"]+)":/g, '$1:')
   str = str.replace(/"(new THREE.Vector3\(.+, .+, .+\))"/g, '$1')
   navigator.clipboard.writeText(str).then(() => {
      console.log('copied preset to clipboard')
   })
}

export default getGui
