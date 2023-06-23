import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Pane } from 'tweakpane'
import {
   makeDirectionalLight,
   makePointLight,
   makeAmbientLight,
   type AmbiLightOpts,
   type PointLightOpts,
   type DirLightOpts,
} from './lights'

export class Scene {
   scene: THREE.Scene
   renderer: THREE.WebGLRenderer
   camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera()
   controls?: OrbitControls
   lights: THREE.Light[] = []
   pane?: Pane
   pointer = new THREE.Vector2()

   constructor(
      pane = true,
      {
         controls = false,
         fov = 70,
         clearColor = 0xe5e5e5,
         mouse = false,
         rendererAlpha = false,
      } = {}
   ) {
      this.scene = new THREE.Scene()
      this.camera.fov = fov

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: rendererAlpha })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setClearColor(clearColor)
      if (controls) this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      if (pane) this.pane = new Pane()
      if (mouse) document.addEventListener('mousemove', this.mouseMove)

      this.init()
   }

   addToDom = () => {
      document.body.appendChild(this.renderer.domElement)
   }

   mouseMove = (event: MouseEvent) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
   }

   init() {
      this.resize()
      window.addEventListener('resize', this.resize)
   }

   resize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
   }

   animate = () => {
      requestAnimationFrame(this.animate)
      this.render()
   }

   render() {
      if (this.controls) this.controls.update()
      this.renderer.render(this.scene, this.camera)
   }

   dirLight = (opts: DirLightOpts = {}) => {
      this.lights.push(makeDirectionalLight(this.scene, this.pane, opts))
   }

   pointLight = (opts: PointLightOpts = {}) => {
      this.lights.push(makePointLight(this.scene, { ...opts, pane: this.pane }))
   }

   ambiLight = (opts: AmbiLightOpts = {}) => {
      this.lights.push(makeAmbientLight(this.scene, this.pane, { ...opts }))
   }
}
