import * as THREE from 'three'

export type WonkyShapeOptions = {
   geometryOptions?: WonkyGeometryOptions
   materialOptions?: {
      color?: string
      metalness?: number
      roughness?: number
   }
}

export default class WonkyShape extends THREE.Mesh<WonkyGeometry, WonkyMaterial> {
   constructor({ geometryOptions = {}, materialOptions = {} }: WonkyShapeOptions) {
      let geometry = new WonkyGeometry(geometryOptions)
      let material = new WonkyMaterial({
         color: materialOptions.color,
         metalness: materialOptions.metalness,
         roughness: materialOptions.roughness,
      })

      super(geometry, material)
   }

   tick = (time: number) => {
      this.material.tick(time)
   }
}

export class WonkyMaterial extends THREE.MeshStandardMaterial {
   shader: THREE.Shader | undefined

   constructor({ color = '#fff', metalness = 0, roughness = 1 } = {}) {
      super({ color, metalness, roughness })

      this.onBeforeCompile = (shader) => {
         this.shader = shader
         this.updateShaderCode(shader)
      }
   }

   updateShaderCode = (shader: THREE.Shader) => {
      shader.uniforms.uTime = { value: 0 }
      shader.vertexShader = shader.vertexShader.replace(
         `#include <common>`,
         `#include <common>
         uniform float uTime;
         float rand2(vec2 n) { 
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
         }       
         float noiseadd ( in vec2 npos ){
            const vec2 d = vec2(0.0, 1.0);
            vec2 b = floor(npos);
            vec2 f = smoothstep(vec2(0.0), vec2(1.0), fract(npos));
            return mix(mix(rand2(b), rand2(b + d.yx), f.x), mix(rand2(b + d.xy), rand2(b + d.yy), f.x), f.y);
         }`
      )

      shader.vertexShader = shader.vertexShader.replace(
         `#include <begin_vertex>`,
         `#include <begin_vertex>

      transformed.x += noiseadd(vec2(uTime + transformed.y, transformed.x)) - 0.5;
         transformed.y += noiseadd(vec2(uTime - transformed.x, transformed.z)) - 0.5;
         transformed.z += noiseadd(vec2(uTime + transformed.z, transformed.y)) - 0.5;`
      )
   }

   tick = (time: number) => {
      if (this.shader) {
         this.shader.uniforms.uTime.value = time
      }
   }
}

export type WonkyGeometryOptions = {
   radius?: number
   detail?: number
   vary?: number
}
export class WonkyGeometry extends THREE.OctahedronGeometry {
   _vary: number

   constructor({ radius = 5, detail = 1, vary = 2 }: WonkyGeometryOptions = {}) {
      super(radius, detail)
      this._vary = vary

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
      let positions = this.getAttribute('position')
      let count = positions.count
      let point = new THREE.Vector3()

      let verticesMap: { [key: string]: { x: number; y: number; z: number } } = {}

      for (let i = 0; i < count; i++) {
         point.fromBufferAttribute(positions, i)
         let key = `${point.x.toFixed(2)}_${point.y.toFixed(2)}_${point.z.toFixed(2)}`
         if (!verticesMap[key]) {
            verticesMap[key] = {
               x: point.x + Math.random() * this._vary,
               y: point.y + Math.random() * this._vary,
               z: point.z + Math.random() * this._vary,
            }
         }

         let { x, y, z } = verticesMap[key]
         positions.setXYZ(i, x, y, z)
      }

      this.computeVertexNormals()
   }
}
