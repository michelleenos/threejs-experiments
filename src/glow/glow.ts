import '../style.css'
import * as THREE from 'three'
import { Scene } from '../utils/scene'

class GlowScene extends Scene {
   geo = new THREE.SphereGeometry(100, 32, 32)
   shapeMesh: THREE.Mesh
   glowMesh: THREE.Mesh
   glowMat: THREE.ShaderMaterial

   constructor(
      pane = true,
      { controls = true, fov = 70, clearColor = 0x111111, mouse = false, rendererAlpha = true } = {}
   ) {
      super(pane, { controls, fov, clearColor, mouse, rendererAlpha })

      this.camera.position.z = 200

      if (this.controls) {
         this.controls.enablePan = true
      }

      this.shapeMesh = this.initSphereMesh()
      this.glowMat = this.initShaderMaterial()
      this.glowMesh = this.initGlowMesh()

      this.dirLight({ position: [0.5, 1, 0.2], color: 0xffffff, intensity: 0.5 })
      this.dirLight({ position: [-1, 1, 0.1], color: 0xffffff, intensity: 0.5 })
      this.dirLight({ position: [0, 0, 1.5], color: 0xffffff, intensity: 0.1 })
      // this.pointLight({ position: [150, 200, -100], distance: 1500, decay: 1 })
      // this.pointLight({ position: [150, 200, 100], distance: 1000, decay: 1 })
      // this.ambiLight({ color: 0xc26a6a, intensity: 0.5 })

      this.glowControls()

      this.addToDom()
      this.animate()
   }

   initSphereMesh() {
      let mat = new THREE.MeshLambertMaterial({ color: 0xfafafa })
      let sphere = new THREE.Mesh(this.geo, mat)
      sphere.position.set(0, 0, -100)
      this.scene.add(sphere)
      return sphere
   }

   initShaderMaterial() {
      return new THREE.ShaderMaterial({
         uniforms: {
            viewVector: { value: this.camera.position },
            c: { value: 0.05 },
            p: { value: 8.3 },
            glowColor: { value: new THREE.Color(0xffcc00) },
         },
         fragmentShader: document.getElementById('fragment-shader')?.textContent || '',
         vertexShader: document.getElementById('vertex-shader')?.textContent || '',
         side: THREE.FrontSide,
         blending: THREE.AdditiveBlending,
         transparent: true,
      })
   }

   initGlowMesh() {
      let glowMesh = new THREE.Mesh(this.geo.clone(), this.glowMat)
      glowMesh.position.copy(this.shapeMesh.position)
      glowMesh.scale.multiplyScalar(1.4)
      this.scene.add(glowMesh)
      return glowMesh
   }

   glowControls() {
      if (!this.pane) return
      let folder = this.pane.addFolder({ title: 'glow', expanded: true })
      folder.addInput(this.glowMat.uniforms.c, 'value', { min: 0, max: 1, step: 0.01, label: 'c' })
      folder.addInput(this.glowMat.uniforms.p, 'value', { min: 0, max: 10, step: 0.01, label: 'p' })
   }

   render() {
      // this.glowMat.uniforms.viewVector.value = new THREE.Vector3().subVectors(
      //    this.camera.position,
      //    this.glowMesh.position
      // )
      if (this.controls) this.controls.update()
      this.renderer.render(this.scene, this.camera)
   }
}

new GlowScene()
