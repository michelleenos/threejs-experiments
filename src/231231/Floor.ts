import * as THREE from 'three'
import fragmentShader from './glsl/floor-fs.glsl'
import vertexShader from './glsl/floor-vs.glsl'
import Sizes from '../utils/Sizes'

export default class Floor {
   mirrorCamera: THREE.PerspectiveCamera
   mirrorRender: THREE.WebGLRenderTarget = new THREE.WebGLRenderTarget(1024, 1024)
   textureMatrix = new THREE.Matrix4()
   uniforms: { [key: string]: THREE.IUniform }
   mesh: THREE.Mesh
   sizes: Sizes

   constructor(sizes: Sizes) {
      this.mirrorCamera = new THREE.PerspectiveCamera(
         75,
         document.body.clientWidth / window.innerHeight,
         0.1,
         1000
      )
      this.mirrorRender = new THREE.WebGLRenderTarget(document.body.clientWidth, window.innerHeight)

      this.mirrorCamera.position.set(0, -100, 0)
      this.mirrorCamera.lookAt(0, 0, 0)
      this.sizes = sizes

      this.uniforms = {
         texture: { value: this.mirrorRender.texture },
         textureMatrix: { value: this.textureMatrix },
         mirrorPosition: { value: this.mirrorCamera.position },
      }

      this.mesh = this.createObj()

      this.mesh.rotation.set(-Math.PI / 2, 0, 0)
      this.mesh.position.set(0, -10, 0)

      this.sizes.on('resize', this.resize)
   }

   createObj = () => {
      return new THREE.Mesh(
         new THREE.PlaneGeometry(1000, 1000),
         new THREE.RawShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader,
            vertexShader,
            transparent: true,
         })
      )
   }

   updateTextureMatrix = () => {
      // prettier-ignore
      this.textureMatrix.set(
            0.5, 0.0, 0.0, 0.5,
            0.0, 0.5, 0.0, 0.5,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        )
      this.textureMatrix.multiply(this.mirrorCamera.projectionMatrix)
      this.textureMatrix.multiply(this.mirrorCamera.matrixWorldInverse)
   }

   render = (renderer: THREE.WebGLRenderer, scene: THREE.Scene) => {
      this.updateTextureMatrix()
      this.mesh.visible = false
      renderer.setRenderTarget(this.mirrorRender)
      renderer.render(scene, this.mirrorCamera)
      this.mesh.visible = true
      renderer.setRenderTarget(null)
   }

   resize = () => {
      this.mirrorCamera.aspect = this.sizes.width / this.sizes.height
      this.mirrorCamera.updateProjectionMatrix()
      this.mirrorRender.setSize(this.sizes.width, this.sizes.height)
   }
}
