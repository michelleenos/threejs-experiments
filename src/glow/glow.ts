import '../style.css'
import * as THREE from 'three'
import { Scene } from '../utils/scene'
import { type Pane } from 'tweakpane'

type GlowBallOpts = {
   radius?: number
   segments?: number
   c?: number
   p?: number
   color?: number
   glowColor?: number
   glowScale?: number
   position?: [number, number, number]
}
class GlowBall {
   ballMesh: THREE.Mesh
   glowMesh: THREE.Mesh
   shaderMaterial: THREE.ShaderMaterial

   constructor({
      radius = 100,
      segments = 32,
      c = 0.01,
      p = 5.3,
      color = 0xfafafa,
      glowColor = 0xffcc00,
      glowScale = 1.4,
      position = [0, 0, -150],
   }: GlowBallOpts = {}) {
      this.shaderMaterial = this.initShaderMaterial(c, p, glowColor)
      this.ballMesh = this.initBaseMesh(radius, segments, color)
      this.ballMesh.position.set(...position)
      this.glowMesh = this.initGlowMesh(glowScale)
   }

   get position() {
      return this.ballMesh.position.toArray()
   }

   set position([x, y, z]: [number, number, number]) {
      this.ballMesh.position.set(x, y, z)
      this.glowMesh.position.set(x, y, z)
   }

   set viewVector(vector: THREE.Vector3) {
      this.shaderMaterial.uniforms.viewVector.value = vector
   }

   initBaseMesh(radius: number, segments: number, color: number) {
      let geo = new THREE.SphereGeometry(radius, segments, segments)
      let material = new THREE.MeshLambertMaterial({ color })
      return new THREE.Mesh(geo, material)
   }

   controlPanel(pane: Pane, title: string = 'Glow Ball') {
      let folder = pane.addFolder({ title })
      folder.addInput(this.shaderMaterial.uniforms.c, 'value', {
         min: 0,
         max: 1,
         step: 0.01,
         label: 'c',
      })
      folder.addInput(this.shaderMaterial.uniforms.p, 'value', {
         min: 0,
         max: 10,
         step: 0.01,
         label: 'p',
      })
   }

   addTo(scene: THREE.Scene) {
      scene.add(this.ballMesh)
      scene.add(this.glowMesh)
   }

   initGlowMesh(glowScale: number) {
      let mesh = new THREE.Mesh(this.ballMesh.geometry, this.shaderMaterial)
      mesh.position.copy(this.ballMesh.position)
      mesh.scale.multiplyScalar(glowScale)
      return mesh
   }

   initShaderMaterial(c: number, p: number, color: number) {
      return new THREE.ShaderMaterial({
         uniforms: {
            viewVector: { value: new THREE.Vector3(0, 0, 0) },
            c: { value: c },
            p: { value: p },
            glowColor: { value: new THREE.Color(color) },
         },
         fragmentShader: document.getElementById('fragment-shader')?.textContent || '',
         vertexShader: document.getElementById('vertex-shader')?.textContent || '',
         side: THREE.FrontSide,
         blending: THREE.AdditiveBlending,
         transparent: true,
      })
   }
}

type SpriteGlowBallOpts = {
   radius?: number
   segments?: number
   color?: number
   position?: [number, number, number]
}

class SpriteGlowBall {
   ballMesh: THREE.Mesh
   sprite: THREE.Sprite

   constructor({
      radius = 100,
      segments = 32,
      color = 0xfafafa,
      position = [0, 0, -150],
   }: SpriteGlowBallOpts = {}) {
      this.ballMesh = this.initBaseMesh(radius, segments, color)
      this.sprite = this.initSprite()
      this.ballMesh.position.set(...position)

      this.ballMesh.add(this.sprite)
   }

   get position() {
      return this.ballMesh.position.toArray()
   }

   set position([x, y, z]: [number, number, number]) {
      this.ballMesh.position.set(x, y, z)
   }

   addTo(scene: THREE.Scene) {
      scene.add(this.ballMesh)
   }

   initBaseMesh(radius: number, segments: number, color: number) {
      let geo = new THREE.SphereGeometry(radius, segments, segments)
      let material = new THREE.MeshLambertMaterial({ color })
      return new THREE.Mesh(geo, material)
   }

   initSprite() {
      let spriteMat = new THREE.SpriteMaterial({
         map: new THREE.TextureLoader().load('/glow.png'),
         color: 0xaaaaff,
         transparent: true,
         blending: THREE.AdditiveBlending,
         depthTest: false,
         // alignment: THREE.SpriteAlignment.center,
         // useScreenCoordinates: false
      })

      let sprite = new THREE.Sprite(spriteMat)
      // sprite.center.set(this.ballMesh.position.x, this.ballMesh.position.y)

      sprite.scale.set(400, 400, 1.0)
      return sprite
   }
}
class GlowScene extends Scene {
   glowBall: GlowBall
   spriteGlowBall: SpriteGlowBall

   constructor(
      pane = true,
      { controls = true, fov = 90, clearColor = 0x111111, mouse = false, rendererAlpha = true } = {}
   ) {
      super(pane, { controls, fov, clearColor, mouse, rendererAlpha })

      this.camera.position.z = 300

      if (this.controls) {
         this.controls.enablePan = true
      }

      // this.pointLight({ position: [0, 100, -100], color: 0xffffff, intensity: 0.5 })

      this.dirLight({ position: [0.5, 1, 0.2], color: 0xffffff, intensity: 0.5 })
      // this.dirLight({ position: [-1, 1, 0.1], color: 0xffffff, intensity: 0.5 })
      // this.dirLight({ position: [0, 0, 1.5], color: 0xffffff, intensity: 0.1 })

      this.glowBall = new GlowBall({ glowScale: 1.4, position: [-180, 0, -150] })
      if (this.pane) this.glowBall.controlPanel(this.pane)
      this.glowBall.addTo(this.scene)

      this.spriteGlowBall = new SpriteGlowBall({ position: [180, 0, -150] })
      this.spriteGlowBall.addTo(this.scene)

      this.addToDom()
      this.animate()
   }

   render() {
      this.glowBall.viewVector = new THREE.Vector3().subVectors(
         this.camera.position,
         new THREE.Vector3(...this.glowBall.position)
      )
      if (this.controls) this.controls.update()
      this.renderer.render(this.scene, this.camera)
   }
}

new GlowScene()
