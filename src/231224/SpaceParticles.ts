import * as THREE from 'three'

export type ParticlesOpts = {
   count?: number
   size?: number
   color?: string
   opacity?: number
   radius?: number
}

export default class Particles {
   geometry: THREE.BufferGeometry
   positions!: Float32Array
   material: THREE.PointsMaterial
   mesh: THREE.Points
   _count: number
   texture: THREE.Texture
   _color: THREE.Color
   _size: number
   _opacity: number
   _radius: number
   rotateSpeed: THREE.Vector3

   constructor(
      texture: THREE.Texture,
      { count = 100, size = 1, opacity = 0.5, color = '#fff', radius = 10 }: ParticlesOpts = {}
   ) {
      this.texture = texture
      this._count = count
      this._size = size
      this._color = new THREE.Color(color)
      this._opacity = opacity
      this._radius = radius
      this.rotateSpeed = new THREE.Vector3(-0.0001, 0.0001, 0.0)

      this.geometry = new THREE.BufferGeometry()
      // this.positions = new Float32Array(this._count * 3)

      this.setPositions()

      this.material = new THREE.PointsMaterial()
      this.setupMaterial()
      this.mesh = new THREE.Points(this.geometry, this.material)
   }

   get radius() {
      return this._radius
   }

   set radius(value: number) {
      this._radius = value
      this.setPositions()
   }

   get opacity() {
      return this._opacity
   }

   set opacity(value: number) {
      this._opacity = value
      this.setupMaterial()
   }

   get color(): THREE.Color {
      return this._color
   }

   set color(value: string | number | THREE.Color) {
      this._color.set(value)
      this.setupMaterial()
   }

   get size() {
      return this._size
   }

   set size(value: number) {
      this._size = value
      this.setupMaterial()
   }

   get count() {
      return this._count
   }

   set count(value: number) {
      this._count = value
      this.setPositions()
   }

   getPointInSphere() {
      let d, x, y, z
      // https://karthikkaranth.me/blog/generating-random-points-in-a-sphere/
      do {
         x = Math.random() * 2 - 1
         y = Math.random() * 2 - 1
         z = Math.random() * 2 - 1
         d = x * x + y * y + z * z
      } while (d > 1)
      return { x, y, z }
   }

   setPositions() {
      this.positions = new Float32Array(this._count * 3)
      for (let i = 0; i < this._count; i++) {
         let point = this.getPointInSphere()
         this.positions[i * 3 + 0] = point.x * this._radius
         this.positions[i * 3 + 1] = point.y * this._radius
         this.positions[i * 3 + 2] = point.z * this._radius
      }
      this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
   }

   setupMaterial() {
      this.material.size = this._size
      this.material.opacity = this._opacity
      this.material.sizeAttenuation = true
      this.material.depthWrite = false
      this.material.transparent = true
      this.material.alphaMap = this.texture

      this.material.blending = THREE.AdditiveBlending
      this.material.color = this._color

      this.material.needsUpdate = true
   }

   update() {
      this.mesh.rotateX(this.rotateSpeed.x)
      this.mesh.rotateY(this.rotateSpeed.y)
      this.mesh.rotateZ(this.rotateSpeed.z)
   }
}
