import * as THREE from 'three'
import { noise2d, perlin3d, transformNoise3d, transformNoise2d } from './shadercode'

export interface WonkyShapeOptions extends WonkyGeometryOptions, WonkyMaterialOptions {
   radius?: number
}

export type WonkyMaterialOptions = {
   color?: string
   metalness?: number
   roughness?: number
}

export type WonkyGeometryOptions = {
   detail?: number
   vary?: number
}

export class WonkyGeometry extends THREE.OctahedronGeometry {
   _vary: number
   initPositions: THREE.BufferAttribute

   constructor({ detail = 1, vary = 2 }: WonkyGeometryOptions = {}) {
      super(1, detail)
      this._vary = vary
      this.initPositions = this.getAttribute('position').clone()
      this.setPositions()
   }

   set vary(vary: number) {
      this._vary = vary
      this.setPositions()
   }

   get vary() {
      return this._vary
   }

   setPositions = () => {
      let count = this.initPositions.count
      let point = new THREE.Vector3()
      this.setAttribute('position', this.initPositions.clone())
      let currentPositions = this.getAttribute('position')
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

      this.computeVertexNormals()
   }
}

export default class WonkyShape extends THREE.Mesh<WonkyGeometry, WonkyMaterial> {
   _radius: number

   constructor({ detail, radius = 5, color, metalness, roughness, vary }: WonkyShapeOptions = {}) {
      let geometry = new WonkyGeometry({ detail, vary })
      let material = new WonkyMaterial({ color, metalness, roughness })
      super(geometry, material)
      this._radius = radius
      this.scale.set(radius, radius, radius)
   }

   set radius(radius: number) {
      this._radius = radius
      this.scale.set(radius, radius, radius)
   }

   get radius() {
      return this._radius
   }

   tick = (time: number) => {
      this.material.tick(time)
   }
}

export class WonkyMaterial extends THREE.MeshStandardMaterial {
   shader: THREE.Shader | undefined
   noiseId: number = Math.random() * 100

   constructor({ color = '#fff', metalness = 0, roughness = 1 } = {}) {
      super({ color, metalness, roughness })
      this.onBeforeCompile = (shader) => {
         this.shader = shader
         this.updateShaderCode(shader)
      }
   }

   updateShaderCode = (shader: THREE.Shader) => {
      shader.uniforms.uTime = { value: 0 }
      shader.uniforms.uNoiseId = { value: this.noiseId }
      // https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
      shader.vertexShader = shader.vertexShader.replace(
         `#include <common>`,
         `#include <common>
         uniform float uTime;
         uniform float uNoiseId;
         ${perlin3d}`
      )

      shader.vertexShader = shader.vertexShader.replace(
         `#include <begin_vertex>`,
         `#include <begin_vertex>
         ${transformNoise3d}`
      )
   }

   tick = (time: number) => {
      if (this.shader) {
         this.shader.uniforms.uTime.value = time
      }
   }
}
