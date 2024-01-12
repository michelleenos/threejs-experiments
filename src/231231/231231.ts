import { GUI } from 'lil-gui'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import '../style.css'
import { clamp, lerp, map } from '../utils'
import Mouse from '../utils/Mouse'
import Sizes from '../utils/Sizes'
import Timer from '../utils/Timer'
import World from '../utils/World'
import FloorMirror, { MirrorOpts } from './FloorMirror'
import Ring, { RingOptions } from './Ring'
import getGui from './guistuff'

THREE.ColorManagement.enabled = true

export interface SceneLightParams {
   ambient?: {
      visible?: boolean
      intensity?: number
      color?: string
   }
   directional?: {
      color?: string
      intensity?: number
      visible?: boolean
      position?: THREE.Vector3
   }
   point?: {
      color?: string
      intensity?: number
      visible?: boolean
      position?: THREE.Vector3
      distance?: number
      decay?: number
   }
}

export interface ExpParams {
   clearColor?: string
   maxAcceleration?: number
   velMult?: number
   cameraPosDefault?: THREE.Vector3
   lightOptions?: SceneLightParams
   ringOptions?: RingOptions
   mirrorOptions?: MirrorOpts
}

const lightParamsDefaults = {
   ambient: { color: '#fafafa', visible: false },
   directional: {
      color: '#e5ffff',
      intensity: 5.8,
      visible: true,
      position: new THREE.Vector3(-150, -6, -30),
   },
   point: {
      color: '#d9c2ff',
      intensity: 9,
      distance: 0,
      decay: 0.1,
      position: new THREE.Vector3(-10, 57, 45),
      visible: true,
   },
}

export default class Experience {
   stats: Stats
   gui!: GUI
   world: World
   sizes: Sizes
   timer: Timer
   mouse: Mouse
   lights!: {
      ambient: THREE.AmbientLight
      directional: THREE.DirectionalLight
      point: THREE.PointLight
      dirHelper: THREE.DirectionalLightHelper
      pointHelper: THREE.PointLightHelper
   }
   ring!: Ring
   mirror!: FloorMirror
   maxAcceleration: number = 0.08
   velMult: number = 0.98
   cameraPosDefault = new THREE.Vector3(0, 40, 100)
   mirrorX: { min: number; max: number } = { min: -30, max: 30 }
   mirrorZ: { min: number; max: number } = { min: -10, max: 10 }

   wheelVelocity = 0
   wheelAcceleration = 0

   constructor(params: ExpParams = {}) {
      this.stats = new Stats()
      this.stats.dom.style.bottom = '0px'
      this.stats.dom.style.top = ''
      document.body.appendChild(this.stats.dom)
      this.sizes = new Sizes()
      this.mouse = new Mouse(this.sizes)
      this.timer = new Timer()

      this.world = new World(this.sizes)
      this.setFromParams(params)

      this.timer.on('tick', this.tick)

      window.addEventListener('wheel', this.onWheel)
   }

   setFromParams = ({
      clearColor = '#0c0911',
      maxAcceleration,
      velMult,
      cameraPosDefault,
      ringOptions = {},
      mirrorOptions = {},
      lightOptions = {},
   }: ExpParams) => {
      if (maxAcceleration) this.maxAcceleration = maxAcceleration
      if (velMult) this.velMult = velMult
      if (cameraPosDefault) this.cameraPosDefault = cameraPosDefault

      this.world.renderer.setClearColor(clearColor)
      this.setCameraAndControls()
      this.ring = new Ring(this.world.camera, this.mouse, ringOptions)
      this.mirror = new FloorMirror(this.sizes, mirrorOptions)

      let ambiLightOpts = { ...lightParamsDefaults.ambient, ...lightOptions.ambient }
      let ambient = new THREE.AmbientLight(ambiLightOpts.color, ambiLightOpts.intensity)
      ambient.visible = ambiLightOpts.visible ?? false

      let dirLightOpts = { ...lightParamsDefaults.directional, ...lightOptions.directional }
      let directional = new THREE.DirectionalLight(dirLightOpts.color, dirLightOpts.intensity)
      directional.position.copy(dirLightOpts.position)
      directional.visible = dirLightOpts.visible ?? false
      let dirHelper = new THREE.DirectionalLightHelper(directional, 5)

      let pointOpts = { ...lightParamsDefaults.point, ...lightOptions.point }
      let point = new THREE.PointLight(
         pointOpts.color,
         pointOpts.intensity,
         pointOpts.distance,
         pointOpts.decay
      )
      point.position.copy(pointOpts.position)
      point.visible = pointOpts.visible ?? false
      let pointHelper = new THREE.PointLightHelper(point, 5)

      this.lights = { ambient, directional, point, dirHelper, pointHelper }
      this.world.scene.add(
         this.ring,
         this.mirror,
         ambient,
         directional,
         point,
         dirHelper,
         pointHelper
      )

      this.setupGui()
   }

   setCameraAndControls = () => {
      this.world.camera.position.copy(this.cameraPosDefault)
      this.world.camera.far = 200
      this.world.camera.updateProjectionMatrix()
      this.world.controls.maxPolarAngle = Math.PI * 0.5
      this.world.controls.minPolarAngle = Math.PI * 0
      this.world.controls.enableZoom = false
      this.world.controls.enabled = false
   }

   onWheel = (e: WheelEvent) => {
      this.wheelAcceleration = e.deltaY * 0.0001
   }

   setupGui = () => {
      this.gui = new GUI()
      getGui(this)
   }

   set clearColor(color: string) {
      this.world.renderer.setClearColor(color)
   }

   tick = () => {
      this.stats.begin()
      const time = this.timer.elapsed

      this.ring.tick(time)

      let mirrorX = map(this.mouse.pos.x, -1, 1, this.mirrorX.min, this.mirrorX.max)
      let mirrorZ = map(this.mouse.pos.y, -1, 1, this.mirrorZ.max, this.mirrorZ.min)
      this.mirror.position.x = lerp(this.mirror.position.x, mirrorX, 0.02)
      this.mirror.position.z = lerp(this.mirror.position.z, mirrorZ, 0.02)

      this.wheelVelocity += this.wheelAcceleration
      this.wheelVelocity = clamp(this.wheelVelocity, -this.maxAcceleration, this.maxAcceleration)
      this.wheelAcceleration = 0
      this.wheelVelocity *= this.velMult
      this.ring.rotation.y += this.wheelVelocity

      this.world.render()
      this.stats.end()
   }

   dispose = () => {
      this.world.scene.remove(
         this.ring,
         this.mirror,
         this.lights.ambient,
         this.lights.directional,
         this.lights.point,
         this.lights.dirHelper,
         this.lights.pointHelper
      )
      this.ring.dispose()
      this.mirror.dispose()
      this.lights.ambient.dispose()
      this.lights.directional.dispose()
      this.lights.dirHelper.dispose()
      this.lights.point.dispose()
      this.lights.pointHelper.dispose()
      this.gui.destroy()
   }
}

const experience = new Experience()
