import * as THREE from 'three'
import WonkyShape, { WonkyShapeOptions } from './WonkyShape'

export type ShapeChunkOptions = {
   outerOptions?: {
      opacity?: number
      metalness?: number
      roughness?: number
      color?: string
   }
   innerOptions?: WonkyShapeOptions
   positionY?: number
}

export default class ShapeChunk extends THREE.Group {
   outer: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>
   inner: WonkyShape

   constructor(
      geometry?: THREE.BufferGeometry,
      {
         outerOptions: { opacity = 0.5, metalness = 0.5, roughness = 0.5, color = '#fff' } = {},
         innerOptions = {},
         positionY = -5,
      }: ShapeChunkOptions = {}
   ) {
      super()

      let outerGeometry = geometry ?? new THREE.ConeGeometry(7, 20, 25)
      let outerMaterial = new THREE.MeshStandardMaterial({
         color,
         opacity,
         metalness,
         roughness,
         transparent: true,
         side: THREE.DoubleSide,
      })
      this.outer = new THREE.Mesh(outerGeometry, outerMaterial)
      this.add(this.outer)

      this.inner = new WonkyShape(innerOptions)
      this.inner.position.y = positionY
      this.add(this.inner)
   }

   dispose = () => {
      this.remove(this.inner)
      this.remove(this.outer)
      this.inner.geometry.dispose()
      this.inner.material.dispose()
      this.outer.geometry.dispose()
      this.outer.material.dispose()
   }
}
