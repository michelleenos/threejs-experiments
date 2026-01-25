import * as THREE from 'three'
import { ringsSceneAssets } from './assets'
import vertexShader from './glsl/space-particles-vertex.glsl'
import fragmentShader from './glsl/space-particles-fragment.glsl'
import { random } from '~/utils/utils'

const { sprites } = ringsSceneAssets
export type ParticlesOpts = {
    count?: number
    size?: number
    color?: string
    opacity?: number
    radius?: number
    spriteName?: keyof typeof sprites
    blending?: THREE.Blending
    speed?: number
    movement?: number
    rotateSprite?: boolean
    position?: { x: number; y: number; z: number }
    visible?: boolean
}

export const particlesDefaults: Required<ParticlesOpts> = {
    count: 100,
    size: 1,
    opacity: 0.5,
    color: '#ffffff',
    radius: 10,
    spriteName: 'smoke01',
    speed: 0.05,
    movement: 3,
    rotateSprite: false,
    position: { x: 0, y: 0, z: 0 },
    blending: THREE.AdditiveBlending,
    visible: true,
}

export default class Particles extends THREE.Points<
    THREE.BufferGeometry,
    THREE.ShaderMaterial
> {
    positions!: Float32Array
    _count: number
    _radius: number
    _spriteName: keyof typeof sprites

    constructor(opts: ParticlesOpts = {}, name?: string) {
        const {
            count,
            size,
            opacity,
            color,
            radius,
            spriteName,
            speed,
            movement,
            rotateSprite,
            position,
            blending,
            visible,
        } = { ...particlesDefaults, ...opts }

        super(
            new THREE.BufferGeometry(),
            new THREE.ShaderMaterial({
                depthWrite: false,
                transparent: true,
                uniforms: {
                    uTime: new THREE.Uniform(0),
                    uColor: new THREE.Uniform(new THREE.Color(color)),
                    uTexture: new THREE.Uniform(sprites[spriteName]),
                    uSize: new THREE.Uniform(size),
                    uMovement: new THREE.Uniform(movement),
                    uSpeed: new THREE.Uniform(speed / 1000),
                    uOpacity: new THREE.Uniform(opacity),
                    uRadius: new THREE.Uniform(radius),
                    uRotateSprite: new THREE.Uniform(rotateSprite),
                    uPixelRatio: new THREE.Uniform(
                        Math.min(window.devicePixelRatio, 2),
                    ),
                    ...THREE.UniformsLib.fog,
                },
                vertexShader,
                fragmentShader,
                blending,
                fog: true,
            }),
        )
        this._count = count
        this._radius = radius
        this._spriteName = spriteName

        if (name) this.name = name

        this.setPositions()
        this.setupMaterial()

        this.position.set(position.x, position.y, position.z)
        this.visible = visible
    }

    get radius() {
        return this._radius
    }

    set radius(value: number) {
        this._radius = value
        this.material.uniforms.uRadius.value = value
        this.setPositions()
    }

    get opacity() {
        return this.material.uniforms.uOpacity.value
    }

    set opacity(value: number) {
        this.material.uniforms.uOpacity.value = value
    }

    get color(): string {
        return `#${this.material.uniforms.uColor.value.getHexString()}`
    }

    set color(value: string) {
        this.material.uniforms.uColor.value.setStyle(value)
    }

    get spriteName() {
        return this._spriteName
    }

    set spriteName(name: keyof typeof sprites) {
        this._spriteName = name
        // this.material.alphaMap = sprites[name]
        this.material.uniforms.uTexture.value = sprites[name]
    }

    get size() {
        return this.material.uniforms.uSize.value
    }

    set size(value: number) {
        this.material.uniforms.uSize.value = value
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

    get speed() {
        return this.material.uniforms.uSpeed.value * 1000
    }

    set speed(val: number) {
        this.material.uniforms.uSpeed.value = val / 1000
    }

    get movement() {
        return this.material.uniforms.uMovement.value
    }

    set movement(val: number) {
        this.material.uniforms.uMovement.value = val
    }

    get rotateSprite() {
        return this.material.uniforms.uRotateSprite.value === 1
    }

    set rotateSprite(val: boolean) {
        this.material.uniforms.uRotateSprite.value = val ? 1 : 0
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
        const rotations = new Float32Array(this._count)
        for (let i = 0; i < this._count; i++) {
            let point = this.getPointInSphere()
            this.positions[i * 3 + 0] = point.x * this._radius
            this.positions[i * 3 + 1] = point.y * this._radius
            this.positions[i * 3 + 2] = point.z * this._radius
            rotations[i] = random(0, Math.PI * 2)
        }
        this.geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(this.positions, 3),
        )
        this.geometry.setAttribute(
            'rotation',
            new THREE.BufferAttribute(rotations, 1),
        )
    }

    setupMaterial() {
        // this.material.sizeAttenuation = true
        this.material.depthWrite = false
        this.material.transparent = true
        // this.material.alphaMap = sprites[this._spriteName]

        this.material.uniforms.uTexture.value = sprites[this._spriteName]
        this.material.needsUpdate = true
    }

    update(time: number) {
        this.material.uniforms.uTime.value = time
        // this.rotateX(this.rotateSpeed.x)
        // this.rotateY(this.rotateSpeed.y)
        // this.rotateZ(this.rotateSpeed.z)
    }
}
