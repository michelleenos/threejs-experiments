import * as THREE from 'three'
import { lerp } from '../utils'

type LerpableType = number | THREE.Vector3 | THREE.Color

interface Lerpable<T extends LerpableType> {
    _target: T
    _prop: T
    _lerpStrategy: (prop: T, target: T, amount?: number) => boolean

    set(value: T): void
}

type LerpStrategy<T extends LerpableType> = (
    prop: T,
    target: T extends THREE.Uniform<number> ? number : T,
    amount?: number,
) => boolean

const lerpStrategies: {
    [key: string]: LerpStrategy<any>
} = {
    'THREE.Vector3': (
        prop: THREE.Vector3,
        target: THREE.Vector3,
        amount = 1,
    ) => {
        prop.lerp(target, 0.1 * amount)
        return prop.distanceTo(target) > 0.01
    },
    number: (prop: number, target: number, amount = 1) => {
        prop = lerp(prop, target, 0.1 * amount)
        return Math.abs(prop - target) > 0.01
    },
    'THREE.Color': (prop: THREE.Color, target: THREE.Color, amount = 1) => {
        prop.lerp(target, 0.1 * amount)
        return prop.getHexString() !== target.getHexString()
    },
}

class Lerpable<T extends LerpableType> {
    raf: number = 0
    lastTime = performance.now()
    interval = 1000 / 60

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
        this.lastTime = performance.now()
        if (this.raf) window.cancelAnimationFrame(this.raf)
        this.raf = window.requestAnimationFrame(this.tick)
    }

    tick = (t: number) => {
        let delta = t - this.lastTime
        this.lastTime = t
        let animating = this._lerpStrategy(
            this._prop,
            this._target,
            delta / this.interval,
        )
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
