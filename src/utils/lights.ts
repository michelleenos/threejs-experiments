import * as THREE from 'three'
import { Pane } from 'tweakpane'

export type AmbiLightOpts = {
   color?: number
   intensity?: number
}
export function makeAmbientLight(
   scene: THREE.Scene,
   pane?: Pane,
   { color = 0x222222, intensity = 1 }: AmbiLightOpts = {}
) {
   const light = new THREE.AmbientLight(color, intensity)
   if (pane) {
      const folder = pane.addFolder({ title: 'Ambient Light' })
      folder.addInput(light, 'color', { color: { type: 'float', expanded: true } })
      folder.addInput(light, 'intensity', { min: 0, max: 5, step: 0.1 })
   }
   scene.add(light)
   return light
}

export type DirLightOpts = {
   position?: [number, number, number]
   color?: number
   intensity?: number
   target?: THREE.Object3D
}
export function makeDirectionalLight(
   scene: THREE.Scene,
   pane?: Pane,
   { position = [0, 1, 0], color = 0xffffff, intensity = 1, target }: DirLightOpts = {}
) {
   const light = new THREE.DirectionalLight(color, intensity)
   light.position.set(...position)
   if (target) light.target = target
   if (pane) {
      const folder = pane.addFolder({ title: 'Directional Light' })
      folder.addInput(light, 'position', { x: { step: 1 }, y: { step: 1 }, z: { step: 1 } })
      folder.addInput(light, 'color', { color: { type: 'float' } })
      folder.addInput(light, 'intensity', { min: 0, max: 5, step: 0.1 })
   }
   scene.add(light)
   return light
}

export type PointLightOpts = {
   position?: [number, number, number]
   pane?: Pane
   color?: number
   intensity?: number
   distance?: number
   decay?: number
}

export function makePointLight(
   scene: THREE.Scene,
   {
      position = [0, 1, 0],
      pane,
      color = 0xffffff,
      intensity = 2,
      distance = 0,
      decay = 1,
   }: PointLightOpts = {}
) {
   const light = new THREE.PointLight(color, intensity, distance, decay)
   light.position.set(...position)
   if (pane) {
      const folder = pane.addFolder({ title: 'Point Light' })
      folder.addInput(light, 'position', { x: { step: 1 }, y: { step: 1 }, z: { step: 1 } })
      folder.addInput(light, 'color', { color: { type: 'float' } })
      folder.addInput(light, 'intensity', { min: 0, max: 5, step: 0.1 })
      folder.addInput(light, 'distance', { min: 0, max: 5000, step: 1 })
      folder.addInput(light, 'decay', { min: 0, max: 5, step: 0.1 })
   }
   scene.add(light)
   return light
}
