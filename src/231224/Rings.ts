import * as THREE from 'three'
import { map, fract } from '../utils'
import { easing } from '../utils/easings'
import World from '../utils/World'

export type RingsFn = (pos: number, d?: number) => number
export const ringsFns: RingsFn[] = [
   (pos: number) => Math.cos(pos * 2),
   (pos: number) => Math.sin(pos * 2),
   (pos: number) => Math.sin(pos),
   (pos: number) => Math.cos(pos),
   (pos: number, d: number = 0.2) => Math.cos(Math.sin(pos) * d),
]

export type RingsOpts = {
   count?: number
   space?: number
   thickness?: number
   radius?: number
   opacity?: number
   easingTime?: keyof typeof easing
   easingShape?: keyof typeof easing
   scaleFn?: RingsFn
   posFn?: RingsFn
   rotateSpeed?: THREE.Vector3
   speed?: number
   coverAmt?: number
   initRotation?: THREE.Vector3
   matcap: THREE.Texture
}

export default class Rings {
   world: World
   meshes: THREE.Mesh[] = []
   scaleFn: RingsFn = ringsFns[0]
   posFn: RingsFn = ringsFns[2]
   easingShape: keyof typeof easing = 'linear'
   easingTime: keyof typeof easing = 'linear'
   material: THREE.MeshMatcapMaterial
   group: THREE.Group
   rotateSpeed: THREE.Vector3
   coverAmt: number = 1
   initRotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
   _opacity: number = 0.5
   _thickness = 0.02
   _count = 30
   _radius = 4
   scaleVar = 2
   speed = 1

   constructor(
      world: World,
      {
         count = 30,
         thickness = 0.02,
         radius = 4,
         opacity = 0.5,
         scaleFn = ringsFns[0],
         posFn = ringsFns[2],
         rotateSpeed = new THREE.Vector3(0, 0, 0),
         speed = 1,
         initRotation = new THREE.Vector3(0, 0, 0),
         easingTime,
         easingShape,
         matcap,
         coverAmt = 1,
      }: RingsOpts
   ) {
      this._count = count
      this._thickness = thickness
      this._radius = radius
      this._opacity = opacity
      this.scaleFn = scaleFn
      this.posFn = posFn
      this.rotateSpeed = rotateSpeed
      this.world = world
      this.speed = speed
      this.coverAmt = coverAmt
      this.initRotation = initRotation
      easingTime && (this.easingTime = easingTime)
      easingShape && (this.easingShape = easingShape)

      this.group = new THREE.Group()

      this.material = new THREE.MeshMatcapMaterial({
         color: '#fff',
         matcap,
         transparent: true,
         side: THREE.DoubleSide,
         opacity: this.opacity,
      })
      this.setupMeshes()
   }

   set visible(value: boolean) {
      this.group.visible = value
   }

   get visible() {
      return this.group.visible
   }

   get blending() {
      return this.material.blending
   }

   set blending(value: THREE.Blending) {
      this.material.blending = value
   }

   get opacity() {
      return this._opacity
   }

   set opacity(value: number) {
      this._opacity = value
      this.material.opacity = value
   }

   get radius() {
      return this._radius
   }

   set radius(value: number) {
      this._radius = value
      this.setupMeshes()
   }

   get count() {
      return this._count
   }

   set count(value: number) {
      this._count = value
      this.setupMeshes()
   }

   get thickness() {
      return this._thickness
   }

   set thickness(value: number) {
      this._thickness = value
      this.setupMeshes()
   }

   setupMeshes() {
      if (this.meshes.length > 0) {
         this.meshes.forEach((mesh) => {
            this.world.scene.remove(mesh)
            this.group.remove(mesh)
            mesh.geometry.dispose()
         })
      }

      this.meshes = []

      for (let i = 0; i < this._count; i++) {
         const geometry = new THREE.TorusGeometry(this._radius, this._thickness, 20, 100)
         const mesh = new THREE.Mesh(geometry, this.material)
         mesh.rotateX(Math.PI / 2)
         this.meshes.push(mesh)
      }

      this.group.add(...this.meshes)
      this.world.scene.add(this.group)
   }

   setColors() {
      this.meshes.forEach((mesh, i) => {
         const step = i / this._count
         const positions = mesh.geometry.attributes.position as THREE.BufferAttribute
         const count = positions.count
         let colors = []
         let color = new THREE.Color()

         for (let j = 0; j < count; j++) {
            let y = positions.getY(j)

            // let r = map(x, this.radius * -1, this.radius, step, 1)
            let r = step
            let g = map(y, this._radius * -1, this._radius, 0, 1)

            color.setRGB(r, g, 1 - step)
            colors.push(color.r, color.g, color.b)
         }

         mesh.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
      })
   }

   update(time: number) {
      let posTime = time * 0.0001 * this.speed

      const a = map(easing[this.easingTime](fract(posTime)), 0, 1, -1, 1)

      this.meshes.forEach((mesh, i) => {
         // const spaceVal = easing[this.easing](i / this.count) * this.maxSpace
         // const pos = ((spaceVal + a) * Math.PI) % (Math.PI * 2)
         const spaceVal = easing[this.easingShape](i / this.count) * this.coverAmt
         let pos = (spaceVal + a) * (Math.PI * 2)
         pos %= Math.PI * 2

         mesh.position.y = this.posFn(pos) * this.radius

         // const scale = map(Math.cos(Math.sin(pos) * i * 0.5), -1, 1, 0.1, 1)
         const scale = map(this.scaleFn(pos, this.scaleVar), -1, 1, 0.1, 1)
         mesh.scale.set(scale, scale, scale)
      })

      this.group.rotation.set(
         this.initRotation.x + this.rotateSpeed.x * time,
         this.initRotation.y + this.rotateSpeed.y * time,
         this.initRotation.z + this.rotateSpeed.z * time
      )
   }
}
