import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function createRenderer(bgColor = 0xe5e5e5) {
   const renderer = new THREE.WebGLRenderer({ antialias: true })
   renderer.setPixelRatio(window.devicePixelRatio)
   renderer.setSize(window.innerWidth, window.innerHeight)
   renderer.setClearColor(bgColor)
   document.body.appendChild(renderer.domElement)
   return renderer
}

export function createPerspectiveCamera(
   fov = 50,
   aspect = window.innerWidth / window.innerHeight,
   near = 1,
   far = 1000
) {
   const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(fov, aspect, near, far)
   return camera
}

export function createControls(
   camera: THREE.Camera,
   renderer: THREE.Renderer,
   { autoRotate = false } = {}
) {
   const controls = new OrbitControls(camera, renderer.domElement)
   controls.zoomSpeed = 0.5
   controls.autoRotate = autoRotate
   controls.update()
   return controls
}

export function resize(camera: THREE.PerspectiveCamera, renderer: THREE.Renderer) {
   camera.aspect = window.innerWidth / window.innerHeight
   camera.updateProjectionMatrix()
   renderer.setSize(window.innerWidth, window.innerHeight)
}

export function animate(
   renderer: THREE.Renderer,
   scene: THREE.Scene,
   camera: THREE.Camera,
   controls?: OrbitControls
) {
   function cb() {
      if (controls) {
         controls.update()
      }
      renderer.render(scene, camera)
      requestAnimationFrame(cb)
   }

   requestAnimationFrame(cb)
}
