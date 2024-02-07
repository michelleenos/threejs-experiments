import * as THREE from 'three'
import { MeshSurfaceSampler } from 'three/examples/jsm/Addons.js'

import fragmentShader from './glsl/frag.glsl'
import vertexShader from './glsl/vert.glsl'
import Sizes from '../utils/sizes'
import Mouse from '../utils/Mouse'
import World from '../utils/World'

let lastIntersects = [] as THREE.Intersection[]
document.addEventListener('click', () => {
   console.log(lastIntersects)
})

export default class GeoParticles {
   sizes: Sizes
   mouse: Mouse
   world: World
   meshToSample: THREE.Mesh
   sampler: MeshSurfaceSampler
   cloud: THREE.Points
   material: THREE.ShaderMaterial
   geometry: THREE.BufferGeometry
   raycaster: THREE.Raycaster
   intersectionCount: number = 0
   testMeshVisible: boolean = false
   _count: number

   constructor(mesh: THREE.Mesh, world: World, mouse: Mouse, count = 28000) {
      this.meshToSample = mesh
      this.sampler = new MeshSurfaceSampler(this.meshToSample).build()
      this._count = count
      this.world = world
      this.sizes = world.sizes
      this.mouse = mouse

      this.raycaster = new THREE.Raycaster()
      this.raycaster.params.Points.threshold = 0.6

      this.material = new THREE.ShaderMaterial({
         fragmentShader,
         vertexShader,
         transparent: true,
         blending: THREE.AdditiveBlending,
         depthWrite: false,
         uniforms: {
            uPixelRatio: { value: this.sizes.pixelRatio },
            uSize: { value: 7 },
            uScaleMain: { value: 5 },
            uScaleMiddle: { value: 5 },
            uSpeed: { value: 0.1 },
            uNoiseResolution: { value: 7 },
            uNoiseRadius: { value: 0.03 },
            uSquishMain: { value: 0.115 },
            uSquishMiddle: { value: 0.027 },
            uTime: { value: 0 },
            uMouseScreen: { value: new THREE.Vector2() },
            uMouse1: { value: new THREE.Vector3() },
            uMouse2: { value: new THREE.Vector3() },
            uMouse3: { value: new THREE.Vector3() },
            uCamSizes: { value: new THREE.Vector2() },
            uDoMouseDistort: { value: false },
            uResolution: { value: new THREE.Vector2(this.sizes.width, this.sizes.height) },
         },
      })

      this.onResize()
      this.geometry = new THREE.BufferGeometry()

      this.cloud = new THREE.Points(this.geometry, this.material)
      this.getPositions()

      this.sizes.on('resize', this.onResize)
   }

   onResize = () => {
      this.material.uniforms.uPixelRatio.value = this.sizes.pixelRatio
      this.material.uniforms.uResolution.value = new THREE.Vector2(
         this.sizes.width,
         this.sizes.height
      )

      const vFov = (this.world.camera.fov * Math.PI) / 180
      const height = 2 * Math.tan(vFov / 2) * this.world.camera.position.z
      const width = height * this.world.camera.aspect
      this.material.uniforms.uCamSizes.value.set(width, height)
   }

   set threshold(val: number) {
      this.raycaster.params.Points.threshold = val
   }

   get threshold() {
      return this.raycaster.params.Points.threshold
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

   raycast = () => {
      this.raycaster.setFromCamera(this.mouse.pos, this.world.camera)
      const intersects = this.raycaster.intersectObjects([this.cloud], false)
      if (intersects.length > 0) {
         let first = intersects[0]
         let last = intersects.length > 1 ? intersects[intersects.length - 1] : first
         let mid = intersects[Math.floor(intersects.length / 2)]
         this.intersectionCount = intersects.length
         this.material.uniforms.uMouse1.value = first.point
         this.material.uniforms.uMouse2.value = last.point
         this.material.uniforms.uMouse3.value = mid.point
      }
   }

   tick = (time: number) => {
      this.raycast()
      this.material.uniforms.uMouseScreen.value = this.mouse.pos
      this.material.uniforms.uTime.value = time
   }
}
