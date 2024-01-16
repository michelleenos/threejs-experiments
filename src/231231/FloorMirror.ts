import * as THREE from 'three'
import { Reflector } from 'three/examples/jsm/Addons.js'
import Sizes from '../utils/sizes'

export type MirrorOpts = {
   size?: THREE.Vector2
   mirrorColor?: string
   screenColor?: string
   screenOpacity?: number
   screenMetalness?: number
   screenRoughness?: number
   clipBias?: number
   planeDist?: number
   position?: THREE.Vector3
}

export default class FloorMirror extends THREE.Group {
   mirror: Reflector
   floor: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>
   geometry: THREE.PlaneGeometry
   windowSizes: Sizes
   _planeDist: number
   _size: THREE.Vector2
   _mirrorColor: string

   constructor(
      sizes: Sizes,
      {
         size = new THREE.Vector2(100, 100),
         mirrorColor = '#66ffff',
         screenColor = '#bf94ff',
         screenOpacity = 0.2,
         screenMetalness = 1,
         screenRoughness = 0.6,
         planeDist = 0.1,
         position = new THREE.Vector3(-25, -10, -25),
      }: MirrorOpts
   ) {
      super()

      this.windowSizes = sizes
      this._size = size
      this._planeDist = planeDist
      this._mirrorColor = mirrorColor

      this.geometry = new THREE.PlaneGeometry(size.x, size.y)
      this.floor = new THREE.Mesh(
         this.geometry,
         new THREE.MeshStandardMaterial({
            roughness: screenRoughness,
            metalness: screenMetalness,
            transparent: true,
            opacity: screenOpacity,
            color: screenColor,
         })
      )
      this.mirror = new Reflector(this.geometry, {
         clipBias: 0.003,
         textureWidth: this.windowSizes.width * this.windowSizes.pixelRatio,
         textureHeight: this.windowSizes.height * this.windowSizes.pixelRatio,
         color: mirrorColor,
      })
      this.add(this.mirror, this.floor)

      this.position.copy(position)
      this.rotation.set(Math.PI * -0.5, 0, 0)

      this.floor.position.z = this._planeDist

      this.windowSizes.on('resize', this.onWindowResize)
   }

   onWindowResize = () => {
      this.mirror
         .getRenderTarget()
         .setSize(
            this.windowSizes.width * this.windowSizes.pixelRatio,
            this.windowSizes.height * this.windowSizes.pixelRatio
         )
   }

   get mirrorColor() {
      return this._mirrorColor
   }

   set mirrorColor(color: string) {
      this._mirrorColor = color
      this.mirror.dispose()
      this.remove(this.mirror)
      this.mirror = new Reflector(this.geometry, {
         clipBias: 0.003,
         textureWidth: this.windowSizes.width * this.windowSizes.pixelRatio,
         textureHeight: this.windowSizes.height * this.windowSizes.pixelRatio,
         color: this._mirrorColor,
      })
      this.add(this.mirror)
   }

   get planeDist() {
      return this._planeDist
   }

   set planeDist(dist: number) {
      this._planeDist = dist
      this.floor.position.z = this._planeDist
   }

   get size() {
      return this._size
   }
   set size(size: THREE.Vector2) {
      this._size = size
      this.geometry = new THREE.PlaneGeometry(size.x, size.y)
      this.floor.geometry = this.geometry
      this.mirror.geometry = this.geometry
   }

   dispose = () => {
      this.remove(this.mirror, this.floor)
      this.mirror.dispose()
      this.floor.material.dispose()
      this.geometry.dispose()
   }
}
