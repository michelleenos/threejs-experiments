import * as THREE from 'three'
import Sizes from '../utils/sizes'
import Timer from '../utils/timer'
import World from './World'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Resources, { TextureSource, type GltfSource } from '../utils/Resources'
import GUI from 'lil-gui'

const couch: GltfSource = { type: 'gltf', path: './resources/couch.glb' }
const fabricColor: TextureSource = {
   type: 'texture',
   // path: './resources/fabric-blue/Fabric023_1K-JPG_Color.jpg',
   // path: './resources/3dtextures-fabric035/Fabric_035_basecolor.jpg',
   path: './resources/3dtextures-rug006/Fabric_Rug_006_COLOR.jpg',
}
const fabricRoughness: TextureSource = {
   type: 'texture',
   // path: './resources/fabric-blue/Fabric023_1K-JPG_Roughness.jpg',
   // path: './resources/3dtextures-fabric035/Fabric_035_roughness.jpg',
   path: './resources/3dtextures-rug006/Fabric_Rug_006_ROUGH.jpg',
}
const fabricNormal: TextureSource = {
   type: 'texture',
   // path: './resources/fabric-blue/Fabric023_1K-JPG_NormalGL.jpg',
   path: './resources/3dtextures-rug006/Fabric_Rug_006_NRM.jpg',
}
const fabricAo: TextureSource = {
   type: 'texture',
   // path: './resources/3dtextures-fabric035/Fabric_035_ambientOcclusion.jpg',
   path: './resources/3dtextures-rug006/Fabric_Rug_006_OCC.jpg',
}
const fabricDisplacement: TextureSource = {
   type: 'texture',
   // path: './resources/fabric-blue/Fabric023_1K-JPG_Displacement.jpg',
   path: './resources/3dtextures-rug006/Fabric_Rug_006_DISP.png',
}
const sources = {
   couch,
   fabricColor,
   fabricRoughness,
   fabricNormal,
   fabricAo,
   fabricDisplacement,
}

export default class Experience {
   renderer!: THREE.WebGLRenderer
   sizes: Sizes
   timer: Timer
   scene: THREE.Scene
   camera: THREE.PerspectiveCamera
   controls: OrbitControls
   canvas!: HTMLCanvasElement
   world: World
   resources: Resources
   gui?: GUI

   constructor(hasGui = false, canvas?: HTMLCanvasElement) {
      this.sizes = new Sizes()
      this.timer = new Timer()

      if (hasGui) this.gui = new GUI()

      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 1000)
      this.setRenderer(canvas)

      this.camera.position.y = 3

      this.controls = new OrbitControls(this.camera, this.canvas)
      this.controls.enableDamping = true

      this.resources = new Resources(sources)

      this.world = new World(this)

      this.sizes.on('resize', () => this.resize())
      this.timer.on('tick', () => this.render())
   }

   setRenderer(canvas?: HTMLCanvasElement) {
      this.renderer = new THREE.WebGLRenderer({
         antialias: true,
         canvas: canvas || undefined,
      })
      this.canvas = this.renderer.domElement

      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(this.sizes.pixelRatio)
      this.renderer.shadowMap.enabled = true
      if (!canvas) document.body.appendChild(this.canvas)
   }

   resize() {
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(this.sizes.pixelRatio)
      this.camera.aspect = this.sizes.width / this.sizes.height
      this.camera.updateProjectionMatrix()
   }

   render() {
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
   }
}
