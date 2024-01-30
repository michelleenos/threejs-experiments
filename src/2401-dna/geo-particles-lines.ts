import * as THREE from 'three'

import fragmentShader from './glsl/frag.glsl'
import vertexShader from './glsl/vert.glsl'
import Sizes from '../utils/sizes'

export default class GeoParticles {
   points: THREE.Vector3[]
   cloud: THREE.Points
   material: THREE.ShaderMaterial
   geometry: THREE.BufferGeometry
   _count = 4000

   constructor(points: THREE.Vector3[], sizes: Sizes, count = 4000) {
      this.points = points
      this._count = count

      this.material = new THREE.ShaderMaterial({
         fragmentShader,
         vertexShader,
         transparent: true,
         blending: THREE.AdditiveBlending,
         depthWrite: false,
         uniforms: {
            uPixelRatio: { value: sizes.pixelRatio },
            uSize: { value: 20 },
            uScaleMin: { value: 1 },
            uScaleMax: { value: 5 },
            uSpeed: { value: 0.3 },
            uPhiMult: { value: 3 },
            uThetaMult: { value: 3 },
            uNoiseRadius: { value: 0.2 },
            uTime: { value: 0 },
         },
      })

      this.geometry = new THREE.BufferGeometry()

      this.cloud = new THREE.Points(this.geometry, this.material)
      this.getPositions()
   }

   get count() {
      return this._count
   }

   set count(val: number) {
      this._count = val
      this.getPositions()
   }

   getPositions = () => {
      const positions = new Float32Array(this._count * 3)
      const scales = new Float32Array(this._count)

      for (let i = 0; i < this._count; i++) {
         let point = this.points[Math.floor(Math.random() * this.points.length)]
         positions[i * 3 + 0] = point.x
         positions[i * 3 + 1] = point.y
         positions[i * 3 + 2] = point.z

         scales[i] = Math.random()
      }

      this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
   }

   tick = (time: number) => {
      this.material.uniforms.uTime.value = time
   }
}
