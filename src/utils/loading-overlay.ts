import * as THREE from 'three'
import { lerp } from '../utils'

export default class Loader {
   scene: THREE.Scene
   geometry: THREE.PlaneGeometry
   material: THREE.ShaderMaterial
   mesh: THREE.Mesh
   manager: THREE.LoadingManager
   bar: HTMLElement
   _opacity: THREE.IUniform<number>
   onReady?: () => any

   constructor(scene: THREE.Scene, onReady?: () => any) {
      this.onReady = onReady
      this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
      this.material = new THREE.ShaderMaterial({
         transparent: true,
         uniforms: { uAlpha: { value: 1.0 } },
         vertexShader: `void main() {gl_Position = vec4(position, 1.0);}`,
         fragmentShader: `
            uniform float uAlpha;
            void main() {
               gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
            }
         `,
      })
      this._opacity = this.material.uniforms.uAlpha

      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.manager = new THREE.LoadingManager(this.onFinished, this.onProgress)

      this.bar = document.createElement('div')
      this.bar.setAttribute(
         'style',
         'position: absolute; width: 100%; height: 20px; background: #fff; left: 0; bottom: 0; transform-origin: left; transform: scaleX(0); z-index: 100; transition: all 0.5s ease-out;'
      )

      document.body.appendChild(this.bar)
      this.scene = scene
      this.scene.add(this.mesh)
   }

   tickFadeOut = () => {
      let amount = lerp(this._opacity.value, 0, 0.01)
      this._opacity.value = amount
      if (amount > 0.01) {
         window.requestAnimationFrame(this.tickFadeOut)
      } else {
         this.dispose()
      }
   }

   onFinished = () => {
      window.setTimeout(() => {
         this.bar.style.transform = ''
         this.bar.style.opacity = '0'
         window.requestAnimationFrame(this.tickFadeOut)
         if (this.onReady) this.onReady()
      }, 2000)
   }

   onProgress = (_: any, itemsLoaded: number, itemsTotal: number) => {
      const progress = itemsLoaded / itemsTotal
      this.bar.style.transform = `scaleX(${progress})`
   }

   dispose() {
      this.scene.remove(this.mesh)
      this.material.dispose()
      this.geometry.dispose()
   }
}
