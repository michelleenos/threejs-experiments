import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GuiExtra } from '~/utils/gui-extra'
import '../style.css'
import { lerp, map } from '../utils'
import Mouse from '../utils/Mouse'
import Sizes from '../utils/sizes'
import Timer from '../utils/timer'
import World from '../utils/World'
import FloorMirror, { MirrorOpts } from './FloorMirror'
import Ring, { RingOptions } from './Ring'
import getGui from './guistuff'
import RingSceneLights, { RingSceneLightOpts } from './RingSceneLights'

THREE.ColorManagement.enabled = true

export interface ExpParams {
    clearColor?: string
    fov?: number
    cameraPosDefault?: { x: number; y: number; z: number }
    lightOptions?: RingSceneLightOpts
    ringOptions?: RingOptions
    mirrorOptions?: MirrorOpts
}

const expParamDefaults: Required<ExpParams> = {
    clearColor: '#0c0911',
    fov: 65,
    cameraPosDefault: { x: 0, y: 50, z: 90 },
    lightOptions: {},
    ringOptions: {},
    mirrorOptions: {},
}

export default class Experience {
    stats: Stats
    gui!: GuiExtra
    world: World
    sizes: Sizes
    timer: Timer
    mouse: Mouse
    lights!: RingSceneLights
    ring!: Ring
    mirror!: FloorMirror
    cameraPosDefault = new THREE.Vector3(0, 50, 90)
    mirrorX: { min: number; max: number } = { min: -30, max: 30 }
    mirrorZ: { min: number; max: number } = { min: -10, max: 10 }
    target = new THREE.Vector3(0, 0, 0)
    fps = 60

    constructor(params: ExpParams = {}) {
        this.stats = new Stats()
        this.stats.dom.style.bottom = '0px'
        this.stats.dom.style.top = ''
        document.body.appendChild(this.stats.dom)
        this.sizes = new Sizes()
        this.mouse = new Mouse(this.sizes)
        this.timer = new Timer()
        this.world = new World(this.sizes)
        this.world.camera.fov = 65
        this.setFromParams(params)

        this.timer.on('tick', this.tick)
    }

    setFromParams = (params: ExpParams) => {
        const {
            clearColor,
            fov,
            cameraPosDefault,
            ringOptions,
            mirrorOptions,
            lightOptions,
        } = { ...expParamDefaults, ...params }

        this.world.camera.fov = fov
        this.cameraPosDefault.x = cameraPosDefault.x
        this.cameraPosDefault.y = cameraPosDefault.y
        this.cameraPosDefault.z = cameraPosDefault.z

        this.world.renderer.setClearColor(clearColor)
        this.setCameraAndControls()
        this.ring = new Ring(this.world, this.mouse, ringOptions)
        this.mirror = new FloorMirror(this.sizes, mirrorOptions)

        this.lights = new RingSceneLights(lightOptions)
        this.world.scene.add(this.ring, this.mirror, this.lights)

        this.setupGui()
    }

    setCameraAndControls = () => {
        this.world.camera.position.copy(this.cameraPosDefault)
        this.world.camera.far = 200
        this.world.camera.updateProjectionMatrix()
        if (this.world.controls) {
            this.world.controls.maxPolarAngle = Math.PI * 0.5
            this.world.controls.minPolarAngle = Math.PI * 0
            this.world.controls.enableZoom = false
            this.world.controls.enabled = false
        }
        this.world.camera.lookAt(this.target)
    }

    setupGui = () => {
        this.gui = new GuiExtra()
        getGui(this)
    }

    tick = () => {
        this.stats.begin()
        const delta = this.timer.delta
        const dt = delta / (1000 / this.fps)

        this.ring.tick(this.timer.elapsed, dt)

        let mx = map(
            this.mouse.pos.x,
            -1,
            1,
            this.mirrorX.min,
            this.mirrorX.max,
        )
        let mz = map(
            this.mouse.pos.y,
            -1,
            1,
            this.mirrorZ.max,
            this.mirrorZ.min,
        )
        this.mirror.position.x = lerp(this.mirror.position.x, mx, 0.04 * dt)
        this.mirror.position.z = lerp(this.mirror.position.z, mz, 0.04 * dt)

        this.world.render()
        this.stats.end()
    }

    dispose = () => {
        this.world.scene.remove(this.ring, this.mirror, this.lights)
        this.ring.dispose()
        this.mirror.dispose()
        this.lights.dispose()

        this.gui.destroy()
    }
}

new Experience()
