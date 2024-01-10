import * as THREE from 'three'
import { perlin3d, transformNoise3d } from './shadercode'
import Lerpable from './LerpableProp'

export interface WonkyShapeOptions {
   radius?: number
   color?: string
   metalness?: number
   roughness?: number
   noiseAmount?: number
   noiseSpeed?: number
   vary?: number
}

export default class WonkyShape extends THREE.Mesh<
   THREE.OctahedronGeometry,
   THREE.MeshStandardMaterial
> {
   _scale: Lerpable<THREE.Vector3>
   _color: Lerpable<THREE.Color>
   _vary: number
   noiseId: number = Math.random() * 100
   shader: THREE.Shader | undefined
   initPositions: THREE.BufferAttribute

   constructor({
      radius = 4,
      color = '#fff',
      metalness = 0.5,
      roughness = 0.5,
      vary = 0.1,
      noiseSpeed = 0.001,
      noiseAmount = 0.3,
   }: WonkyShapeOptions = {}) {
      let geometry = new THREE.OctahedronGeometry(1, 1)
      let material = new THREE.MeshStandardMaterial({ color, metalness, roughness })

      material.onBeforeCompile = (shader) => {
         this.shader = shader
         this.updateShaderCode(shader, noiseSpeed, noiseAmount)
      }
      super(geometry, material)

      this._vary = vary
      this.scale.set(radius, radius, radius)
      this._color = new Lerpable(this.material.color)
      this._scale = new Lerpable(this.scale)

      this.initPositions = this.geometry.getAttribute('position').clone()
      this.setPositions()
   }

   set vary(vary: number) {
      this._vary = vary
      this.setPositions()
   }

   get vary() {
      return this._vary
   }

   set noiseAmount(noiseAmount: number) {
      if (this.shader) this.shader.uniforms.uNoiseAmount.value = noiseAmount
   }

   set noiseSpeed(noiseSpeed: number) {
      if (this.shader) this.shader.uniforms.uSpeed.value = noiseSpeed
   }

   setScale(scale: number) {
      this._scale.set(new THREE.Vector3(scale, scale, scale))
   }

   setColor(color: THREE.Color, instant = false) {
      instant ? this.material.color.copy(color) : this._color.set(color)
   }

   setPositions = () => {
      let count = this.initPositions.count
      let point = new THREE.Vector3()
      this.geometry.setAttribute('position', this.initPositions.clone())
      let currentPositions = this.geometry.getAttribute('position')
      let verticesMap: { [key: string]: { x: number; y: number; z: number } } = {}

      for (let i = 0; i < count; i++) {
         point.fromBufferAttribute(this.initPositions, i)
         let key = `${point.x.toFixed(2)}_${point.y.toFixed(2)}_${point.z.toFixed(2)}`
         if (!verticesMap[key]) {
            verticesMap[key] = {
               x: point.x + (Math.random() - 0.5) * this._vary,
               y: point.y + (Math.random() - 0.5) * this._vary,
               z: point.z + (Math.random() - 0.5) * this._vary,
            }
         }

         let { x, y, z } = verticesMap[key]
         currentPositions.setXYZ(i, x, y, z)
      }

      this.geometry.computeVertexNormals()
   }

   updateShaderCode = (shader: THREE.Shader, noiseSpeed: number, noiseAmount: number) => {
      shader.uniforms.uTime = { value: 0 }
      shader.uniforms.uNoiseId = { value: this.noiseId }
      shader.uniforms.uSpeed = { value: noiseSpeed }
      shader.uniforms.uNoiseAmount = { value: noiseAmount }
      // https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
      shader.vertexShader = shader.vertexShader.replace(
         `#include <common>`,
         `#include <common>
         uniform float uTime;
         uniform float uNoiseId;
         uniform float uNoiseAmount;
         uniform float uSpeed;
         ${perlin3d}`
      )

      shader.vertexShader = shader.vertexShader.replace(
         `#include <begin_vertex>`,
         `#include <begin_vertex>
         ${transformNoise3d}`
      )
   }

   tick = (time: number) => {
      if (this.shader) this.shader.uniforms.uTime.value = time
   }

   dispose = () => {
      this._color.cancel()
      this._scale.cancel()
      this.geometry.dispose()
      this.material.dispose()
   }
}
