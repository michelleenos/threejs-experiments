import * as THREE from 'three'
import Sizes from './Sizes'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

export default class World {
   scene: THREE.Scene
   renderer: THREE.WebGLRenderer
   camera: THREE.PerspectiveCamera
   sizes: Sizes
   controls: OrbitControls

   constructor(sizes: Sizes) {
      this.sizes = sizes
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setClearColor('#000')
      document.body.appendChild(this.renderer.domElement)

      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 300)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true

      this.onResize()
      this.sizes.on('resize', this.onResize)
   }

   onResize = () => {
      this.camera.aspect = this.sizes.width / this.sizes.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
   }

   render = () => {
      this.renderer.render(this.scene, this.camera)
      this.controls.update()
   }
}
