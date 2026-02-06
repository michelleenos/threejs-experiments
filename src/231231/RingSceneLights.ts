import * as THREE from 'three'

export interface RingSceneLightOpts {
    ambient?: {
        visible?: boolean
        intensity?: number
        color?: string
    }
    directional?: {
        color?: string
        intensity?: number
        visible?: boolean
        position?: { x: number; y: number; z: number }
    }
    point?: {
        color?: string
        intensity?: number
        visible?: boolean
        position?: { x: number; y: number; z: number }
        distance?: number
        decay?: number
    }
}

type DeepRequired<T> = Required<{
    [K in keyof T]: T[K] extends Required<T[K]> ? T[K] : DeepRequired<T[K]>
}>

export const ringSceneLightDefaults: DeepRequired<RingSceneLightOpts> = {
    ambient: { color: '#fafafa', visible: false, intensity: 1 },
    directional: {
        color: '#e5ffff',
        intensity: 5.8,
        visible: true,
        position: { x: -150, y: -6, z: -30 },
    },
    point: {
        color: '#d9c2ff',
        intensity: 9,
        distance: 0,
        decay: 0.1,
        position: { x: -10, y: 57, z: 45 },
        visible: true,
    },
}

export default class RingSceneLights extends THREE.Group {
    ambient: THREE.AmbientLight
    directional: THREE.DirectionalLight
    point: THREE.PointLight
    dirHelper: THREE.DirectionalLightHelper
    pointHelper: THREE.PointLightHelper

    constructor(params: RingSceneLightOpts) {
        super()
        const opts = {
            ...ringSceneLightDefaults,
            ...params,
        } as DeepRequired<RingSceneLightOpts>

        this.ambient = new THREE.AmbientLight(
            opts.ambient.color,
            opts.ambient.intensity,
        )
        this.ambient.visible = opts.ambient.visible

        this.directional = new THREE.DirectionalLight(
            opts.directional.color,
            opts.directional.intensity,
        )
        this.directional.position.copy(opts.directional.position)
        this.directional.visible = opts.directional.visible

        this.dirHelper = new THREE.DirectionalLightHelper(this.directional, 5)
        this.dirHelper.name = 'dirLightHelper'

        this.point = new THREE.PointLight(
            opts.point.color,
            opts.point.intensity,
            opts.point.distance,
            opts.point.decay,
        )
        this.point.position.copy(opts.point.position)
        this.point.visible = opts.point.visible

        this.pointHelper = new THREE.PointLightHelper(this.point, 5)
        this.pointHelper.name = 'pointLightHelper'

        this.add(
            this.directional,
            this.point,
            this.ambient,
            this.dirHelper,
            this.pointHelper,
        )
    }

    dispose = () => {
        this.ambient.dispose()
        this.directional.dispose()
        this.dirHelper.dispose()
        this.point.dispose()
        this.pointHelper.dispose()
    }
}
