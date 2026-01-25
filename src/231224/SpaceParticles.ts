import * as THREE from 'three'
import { ringsSceneAssets } from './assets'

const { sprites } = ringsSceneAssets
export type ParticlesOpts = {
    count?: number
    size?: number
    color?: string
    opacity?: number
    radius?: number
    spriteName?: keyof typeof sprites
    position?: { x: number; y: number; z: number }
    rotateSpeed?: { x: number; y: number; z: number }
    blending?: THREE.Blending
}

export const particlesDefaults: Required<ParticlesOpts> = {
    count: 100,
    size: 1,
    opacity: 0.5,
    color: '#ffffff',
    radius: 10,
    spriteName: 'smoke01',
    rotateSpeed: { x: -0.0001, y: 0.0001, z: 0 },
    position: { x: 0, y: 0, z: 0 },
    blending: THREE.AdditiveBlending,
}

export default class Particles extends THREE.Points<
    THREE.BufferGeometry,
    THREE.PointsMaterial
> {
    positions!: Float32Array
    _count: number
    _radius: number
    _spriteName: keyof typeof sprites
    rotateSpeed: THREE.Vector3

    constructor(opts: ParticlesOpts = {}, name?: string) {
        super(new THREE.BufferGeometry(), new THREE.PointsMaterial())
        const {
            count,
            size,
            opacity,
            color,
            radius,
            spriteName,
            rotateSpeed,
            position,
            blending,
        } = { ...particlesDefaults, ...opts }
        this._count = count
        this._radius = radius
        this._spriteName = spriteName

        this.size = size
        this.opacity = opacity
        this.color = color
        this.material.blending = blending

        if (name) this.name = name

        this.setPositions()
        this.setupMaterial()

        this.rotateSpeed = new THREE.Vector3(
            rotateSpeed.x,
            rotateSpeed.y,
            rotateSpeed.z,
        )
        this.position.set(position.x, position.y, position.z)
    }

    get radius() {
        return this._radius
    }

    set radius(value: number) {
        this._radius = value
        this.setPositions()
    }

    get opacity() {
        return this.material.opacity
    }

    set opacity(value: number) {
        this.material.opacity = value
    }

    get color(): string {
        return `#${this.material.color.getHexString()}`
    }

    set color(value: string) {
        this.material.color.setStyle(value)
    }

    get spriteName() {
        return this._spriteName
    }

    set spriteName(name: keyof typeof sprites) {
        this._spriteName = name
        this.material.alphaMap = sprites[name]
    }

    get size() {
        return this.material.size
    }

    set size(value: number) {
        this.material.size = value
    }

    get count() {
        return this._count
    }

    set count(value: number) {
        this._count = value
        this.setPositions()
    }

    get blending() {
        return this.material.blending
    }

    set blending(val: THREE.Blending) {
        this.material.blending = val
    }

    getPointInSphere() {
        let d, x, y, z
        // https://karthikkaranth.me/blog/generating-random-points-in-a-sphere/
        do {
            x = Math.random() * 2 - 1
            y = Math.random() * 2 - 1
            z = Math.random() * 2 - 1
            d = x * x + y * y + z * z
        } while (d > 1)
        return { x, y, z }
    }

    setPositions() {
        this.positions = new Float32Array(this._count * 3)
        for (let i = 0; i < this._count; i++) {
            let point = this.getPointInSphere()
            this.positions[i * 3 + 0] = point.x * this._radius
            this.positions[i * 3 + 1] = point.y * this._radius
            this.positions[i * 3 + 2] = point.z * this._radius
        }
        this.geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(this.positions, 3),
        )
    }

    setupMaterial() {
        this.material.sizeAttenuation = true
        this.material.depthWrite = false
        this.material.transparent = true
        this.material.alphaMap = sprites[this._spriteName]

        this.material.needsUpdate = true
    }

    update() {
        this.rotateX(this.rotateSpeed.x)
        this.rotateY(this.rotateSpeed.y)
        this.rotateZ(this.rotateSpeed.z)
    }
}
