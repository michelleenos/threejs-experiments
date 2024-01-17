import * as THREE from 'three'
import { lerp } from '../utils'

type LerpableType = number | THREE.Vector3 | THREE.Color

interface Lerpable<T extends LerpableType> {
   _target: T
   _prop: T
   _lerpStrategy: (prop: T, target: T) => boolean

   set(value: T): void
}

type LerpStrategy<T extends LerpableType> = (
   prop: T,
   target: T extends THREE.Uniform<number> ? number : T
) => boolean

const lerpStrategies: {
   [key: string]: LerpStrategy<any>
} = {
   'THREE.Vector3': (prop: THREE.Vector3, target: THREE.Vector3) => {
      prop.lerp(target, 0.1)
      return prop.distanceTo(target) > 0.01
   },
   number: (prop: number, target: number) => {
      prop = lerp(prop, target, 0.1)
      return Math.abs(prop - target) > 0.01
   },
   'THREE.Color': (prop: THREE.Color, target: THREE.Color) => {
      prop.lerp(target, 0.1)
      return prop.getHexString() !== target.getHexString()
   },
}

class Lerpable<T extends LerpableType> {
   raf: number = 0

   constructor(prop: T) {
      if (prop instanceof THREE.Uniform) {
         this._target = prop.value
      } else {
         this._target = prop
      }

      this._prop = prop

      if (prop instanceof THREE.Vector3) {
         this._lerpStrategy = lerpStrategies['THREE.Vector3']
      } else if (prop instanceof THREE.Color) {
         this._lerpStrategy = lerpStrategies['THREE.Color']
      } else {
         this._lerpStrategy = lerpStrategies['number']
      }
   }

   set(value: T) {
      this._target = value
      if (this.raf) window.cancelAnimationFrame(this.raf)
      this.raf = window.requestAnimationFrame(this.tick)
   }

   tick = () => {
      let animating = this._lerpStrategy(this._prop, this._target)
      if (animating) {
         window.requestAnimationFrame(this.tick)
      } else {
         this.raf = 0
      }
   }

   cancel = () => {
      if (this.raf) window.cancelAnimationFrame(this.raf)
      this.raf = 0
   }
}

export default Lerpable
