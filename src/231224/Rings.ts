import * as THREE from 'three'
import { map, fract } from '../utils'
import { easing } from '../utils/easings'
import World from '../utils/World'
import { ringsSceneAssets } from './assets'

const { matcaps } = ringsSceneAssets

export type RingFn = 'sin' | 'cos' | 'cos-sin'
const ringFns: Record<RingFn, (val: number, scale: number) => number> = {
    cos: (val: number, scale: number) => Math.cos(val * scale),
    sin: (val: number, scale: number) => Math.sin(val * scale),
    'cos-sin': (val: number, scale: number) => Math.cos(Math.sin(val) * scale),
}

export type RingsOpts = {
    count?: number
    speed?: number
    radius?: number
    opacity?: number
    thickness?: number
    coverAmt?: number
    initRotation?: { x: number; y: number; z: number }
    rotateSpeed?: { x: number; y: number; z: number }
    blending?: THREE.Blending
    easingShape?: keyof typeof easing
    scaleFn?: RingFn
    posFn?: RingFn
    posFnVar?: number
    scaleFnVar?: number
    matcapName?: keyof typeof matcaps
    visible?: boolean
    radialSegments?: number
    tubularSegments?: number
}

export const ringsDefaults: Required<RingsOpts> = {
    count: 30,
    speed: 0.1,
    radius: 4,
    opacity: 1,
    thickness: 0.02,
    coverAmt: 1,
    initRotation: { x: 0, y: 0, z: 0 },
    rotateSpeed: { x: 0, y: 0, z: 0 },
    blending: 1,
    easingShape: 'linear',
    scaleFn: 'cos',
    posFn: 'sin',
    scaleFnVar: 1,
    posFnVar: 1,
    matcapName: 'blueish',
    visible: true,
    radialSegments: 10,
    tubularSegments: 30,
}

export default class Rings extends THREE.Group {
    meshes: THREE.Mesh[] = []
    scaleFn: RingFn
    posFn: RingFn
    posFnVar: number
    scaleFnVar: number
    easingShape: keyof typeof easing
    material: THREE.MeshMatcapMaterial
    rotateSpeed: THREE.Vector3
    coverAmt: number
    initRotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
    _thickness: number
    _count: number
    _radius: number
    _radialSegments: number
    _tubularSegments: number
    speed: number
    _matcapName: keyof typeof matcaps

    constructor(opts: RingsOpts = {}) {
        super()
        const {
            count,
            thickness,
            radius,
            opacity,
            scaleFn,
            posFn,
            scaleFnVar,
            posFnVar,
            speed,
            coverAmt,
            rotateSpeed,
            initRotation,
            easingShape,
            blending,
            matcapName,
            visible,
            radialSegments,
            tubularSegments,
        } = { ...ringsDefaults, ...opts }

        this._count = count
        this._thickness = thickness
        this._radius = radius
        this._radialSegments = radialSegments
        this._tubularSegments = tubularSegments
        this._matcapName = matcapName
        this.scaleFn = scaleFn
        this.posFn = posFn
        this.posFnVar = posFnVar
        this.scaleFnVar = scaleFnVar
        this.speed = speed
        this.coverAmt = coverAmt
        this.rotateSpeed = new THREE.Vector3(
            rotateSpeed.x,
            rotateSpeed.y,
            rotateSpeed.z,
        )
        this.initRotation = new THREE.Vector3(
            initRotation.x,
            initRotation.y,
            initRotation.z,
        )
        this.easingShape = easingShape
        this.visible = visible

        this.material = new THREE.MeshMatcapMaterial({
            color: '#fff',
            matcap: matcaps[this._matcapName],
            transparent: true,
            side: THREE.DoubleSide,
            opacity,
            blending,
        })
        this.createRings()
    }

    updateMaterial = () => {
        this.material.matcap = matcaps[this._matcapName]
    }

    set matcapName(name: keyof typeof matcaps) {
        this._matcapName = name
        this.material.matcap = matcaps[this._matcapName]
    }

    get matcapName() {
        return this._matcapName
    }

    get blending() {
        return this.material.blending
    }

    set blending(value: THREE.Blending) {
        this.material.blending = value
    }

    get opacity() {
        return this.material.opacity
    }

    set opacity(value: number) {
        this.material.opacity = value
    }

    get radius() {
        return this._radius
    }

    set radius(value: number) {
        this._radius = value
        this.createRings()
    }

    get count() {
        return this._count
    }

    set count(value: number) {
        this._count = value
        this.createRings()
    }

    get thickness() {
        return this._thickness
    }

    set thickness(value: number) {
        this._thickness = value
        this.createRings()
    }

    get radialSegments() {
        return this._radialSegments
    }

    set radialSegments(val: number) {
        this._radialSegments = val
        this.createRings()
    }

    get tubularSegments() {
        return this._tubularSegments
    }

    set tubularSegments(val: number) {
        this._tubularSegments = val
        this.createRings()
    }

    setFromOpts(o: RingsOpts) {
        const opts: Required<RingsOpts> = { ...ringsDefaults, ...o }
        this._count = opts.count
        this._thickness = opts.thickness
        this._radius = opts.radius
        this._radialSegments = opts.radialSegments
        this._tubularSegments = opts.tubularSegments
        this._matcapName = opts.matcapName
        this.material.opacity = opts.opacity
        this.material.matcap = matcaps[opts.matcapName]
        this.scaleFn = opts.scaleFn
        this.posFn = opts.posFn
        this.posFnVar = opts.posFnVar
        this.scaleFnVar = opts.scaleFnVar
        this.speed = opts.speed
        this.coverAmt = opts.coverAmt
        this.visible = opts.visible
        this.rotateSpeed.set(
            opts.rotateSpeed.x,
            opts.rotateSpeed.y,
            opts.rotateSpeed.z,
        )
        this.initRotation.set(
            opts.initRotation.x,
            opts.initRotation.y,
            opts.initRotation.z,
        )
        this.easingShape = opts.easingShape
        this.visible = opts.visible
        this.createRings()
        this.material.needsUpdate = true
    }

    createRings() {
        if (this.meshes.length > 0) {
            this.meshes.forEach((mesh) => {
                this.remove(mesh)
                mesh.geometry.dispose()
            })
        }

        this.meshes = []

        for (let i = 0; i < this._count; i++) {
            const geometry = new THREE.TorusGeometry(
                this._radius,
                this._thickness,
                this._radialSegments,
                this._tubularSegments,
            )
            const mesh = new THREE.Mesh(geometry, this.material)
            mesh.rotateX(Math.PI / 2)
            this.meshes.push(mesh)
        }

        this.add(...this.meshes)
    }

    setColors() {
        this.meshes.forEach((mesh, i) => {
            const step = i / this._count
            const positions = mesh.geometry.attributes
                .position as THREE.BufferAttribute
            const count = positions.count
            let colors = []
            let color = new THREE.Color()

            for (let j = 0; j < count; j++) {
                let y = positions.getY(j)

                // let r = map(x, this.radius * -1, this.radius, step, 1)
                let r = step
                let g = map(y, this._radius * -1, this._radius, 0, 1)

                color.setRGB(r, g, 1 - step)
                colors.push(color.r, color.g, color.b)
            }

            mesh.geometry.setAttribute(
                'color',
                new THREE.Float32BufferAttribute(colors, 3),
            )
        })
    }

    update(time: number) {
        let posTime = time * 0.0001 * this.speed

        const a = map(fract(posTime), 0, 1, -1, 1)

        this.meshes.forEach((mesh, i) => {
            const spaceVal =
                easing[this.easingShape](i / this.count) * this.coverAmt
            let pos = (spaceVal + a) * (Math.PI * 2)
            pos %= Math.PI * 2

            // mesh.position.y = this.posFn(pos) * this.radius
            mesh.position.y =
                ringFns[this.posFn](pos, this.posFnVar) * this.radius
            const scale = map(
                ringFns[this.scaleFn](pos, this.scaleFnVar),
                -1,
                1,
                0.1,
                1,
            )
            mesh.scale.set(scale, scale, scale)
        })

        this.rotation.set(
            this.initRotation.x + this.rotateSpeed.x * time * 0.001,
            this.initRotation.y + this.rotateSpeed.y * time * 0.001,
            this.initRotation.z + this.rotateSpeed.z * time * 0.001,
        )
    }
}
