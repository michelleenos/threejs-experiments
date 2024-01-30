import * as THREE from 'three'
import { MeshSurfaceSampler } from 'three/examples/jsm/Addons.js'

import fragmentShader from './glsl/frag.glsl'
import vertexShader from './glsl/vert.glsl'
import Sizes from '../utils/sizes'

export default class GeoParticles {
   sizes: Sizes
   meshToSample: THREE.Mesh
   sampler: MeshSurfaceSampler
   cloud: THREE.Points
   material: THREE.ShaderMaterial
   geometry: THREE.BufferGeometry
   _count = 4000

   constructor(mesh: THREE.Mesh, sizes: Sizes, count = 4000) {
      this.meshToSample = mesh
      this.sampler = new MeshSurfaceSampler(this.meshToSample).build()
      this._count = count
      this.sizes = sizes

      this.material = new THREE.ShaderMaterial({
         fragmentShader,
         vertexShader,
         transparent: true,
         blending: THREE.AdditiveBlending,
         depthWrite: false,
         uniforms: {
            uPixelRatio: { value: this.sizes.pixelRatio },
            uSize: { value: 20 },
            uScaleMin: { value: 1 },
            uScaleMax: { value: 5 },
            uScaleMiddleMin: { value: 1 },
            uScaleMiddleMax: { value: 4 },
            uSpeed: { value: 0.1 },
            uNoiseResolution: { value: 7 },
            uNoiseRadius: { value: 0.03 },
            uSquishMain: { value: 0.115 },
            uSquishMiddle: { value: 0.027 },
            uTime: { value: 0 },
         },
      })

      this.geometry = new THREE.BufferGeometry()

      this.cloud = new THREE.Points(this.geometry, this.material)
      this.getPositions()

      this.sizes.on('resize', this.onResize)
   }

   onResize = () => {
      this.material.uniforms.uPixelRatio.value = this.sizes.pixelRatio
   }

   get count() {
      return this._count
   }

   set count(val: number) {
      this._count = val
      this.getPositions()
   }

   getPositions = () => {
      const position = new THREE.Vector3()
      const normal = new THREE.Vector3()
      const color = new THREE.Color()
      const positions = new Float32Array(this._count * 3)
      const normals = new Float32Array(this._count * 3)
      const middleWeights = new Float32Array(this._count)
      const scales = new Float32Array(this._count)

      for (let i = 0; i < this._count; i++) {
         this.sampler.sample(position, normal, color)
         positions[i * 3 + 0] = position.x
         positions[i * 3 + 1] = position.y
         positions[i * 3 + 2] = position.z

         normals[i * 3 + 0] = normal.x
         normals[i * 3 + 1] = normal.y
         normals[i * 3 + 2] = normal.z

         middleWeights[i] = 1 - color.r

         scales[i] = Math.random()
      }

      this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
      this.geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3))
      this.geometry.setAttribute('aMiddleWeight', new THREE.BufferAttribute(middleWeights, 1))
   }

   tick = (time: number) => {
      this.material.uniforms.uTime.value = time
   }
}
