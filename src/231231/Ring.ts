import * as THREE from 'three'
import ShapeChunk, { ShapeChunkOptions } from './ShapeChunk'
import { map } from '../utils'

export type ColorCoordOpt = {
   start: number
   end: number
   offset: number
}

export type ColorCoordOpts = {
   red: ColorCoordOpt
   green: ColorCoordOpt
   blue: ColorCoordOpt
}

export type RingOptions = {
   coneRadius?: number
   coneHeight?: number
   coneSegments?: number
   ringRadius?: number
   count?: number
   shapeChunkOptions?: ShapeChunkOptions
   colorOpts?: ColorCoordOpts
}

const defaultColorCoordOpts: ColorCoordOpts = {
   red: {
      start: 0.67,
      end: 0.05,
      offset: 0.4,
   },
   green: {
      start: -0.62,
      end: 0.23,
      offset: 0.23,
   },
   blue: {
      start: 0,
      end: 1.04,
      offset: 0.25,
   },
}

export default class Ring extends THREE.Group {
   children: ShapeChunk[] = []
   outerGeometry: THREE.BufferGeometry
   colorOpts: ColorCoordOpts
   _coneRadius: number
   _coneHeight: number
   _coneSegments: number
   _ringRadius: number
   _shapeOpacity: number
   _shapeMetalness: number
   _shapeRoughness: number
   _innerMetalness: number
   _innerRoughness: number
   _wonkyRadius: number
   _wonkyVary: number

   needsUpdate = {
      innerMaterial: false,
      wonkiness: false,
      outerMaterial: false,
      positions: false,
      colors: false,
   }

   constructor({
      coneRadius = 7,
      coneHeight = 20,
      coneSegments = 25,
      ringRadius = 50,
      count = 10,
      colorOpts = defaultColorCoordOpts,
      shapeChunkOptions = {},
   }: RingOptions = {}) {
      super()
      this._ringRadius = ringRadius
      this._coneRadius = coneRadius
      this._coneHeight = coneHeight
      this._coneSegments = coneSegments
      this.outerGeometry = new THREE.ConeGeometry(
         this._coneRadius,
         this._coneHeight,
         this._coneSegments
      )
      this.colorOpts = colorOpts

      for (let i = 0; i < count; i++) {
         let shapeChunk = new ShapeChunk(this.outerGeometry, shapeChunkOptions)
         this.add(shapeChunk)
      }

      this._shapeOpacity = this.children[0].outer.material.opacity
      this._shapeMetalness = this.children[0].outer.material.metalness
      this._shapeRoughness = this.children[0].outer.material.roughness
      this._innerMetalness = this.children[0].inner.material.metalness
      this._innerRoughness = this.children[0].inner.material.roughness
      this._wonkyRadius = this.children[0].inner.radius
      this._wonkyVary = this.children[0].inner.geometry.vary

      this.setShapeProps()
   }

   /**
    * CONE
    */
   get coneRadius() {
      return this._coneRadius
   }

   get coneHeight() {
      return this._coneHeight
   }
   get coneSegments() {
      return this._coneSegments
   }

   set coneRadius(value: number) {
      this._coneRadius = value
      this.resetOuterGeometry()
   }

   set coneHeight(value: number) {
      this._coneHeight = value
      this.resetOuterGeometry()
   }

   set coneSegments(value: number) {
      this._coneSegments = value
      this.resetOuterGeometry()
   }

   /**
    * SHAPES INNER
    */

   get wonkyRadius() {
      return this._wonkyRadius
   }
   get wonkyVary() {
      return this._wonkyVary
   }
   get innerMetalness() {
      return this._innerMetalness
   }
   get innerRoughness() {
      return this._innerRoughness
   }

   set wonkyRadius(value: number) {
      this._wonkyRadius = value
      this.needsUpdate.wonkiness = true
   }

   set wonkyVary(value: number) {
      this._wonkyVary = value
      this.needsUpdate.wonkiness = true
   }

   set innerMetalness(value: number) {
      this._innerMetalness = value
      this.needsUpdate.innerMaterial = true
   }

   set innerRoughness(value: number) {
      this._innerRoughness = value
      this.needsUpdate.innerMaterial = true
   }

   /**
    * SHAPES OUTER
    */

   get shapeOpacity() {
      return this._shapeOpacity
   }
   get shapeMetalness() {
      return this._shapeMetalness
   }
   get shapeRoughness() {
      return this._shapeRoughness
   }

   set shapeOpacity(value: number) {
      this._shapeOpacity = value
      this.needsUpdate.outerMaterial = true
   }
   set shapeMetalness(value: number) {
      this._shapeMetalness = value
      this.needsUpdate.outerMaterial = true
   }
   set shapeRoughness(value: number) {
      this._shapeRoughness = value
      this.needsUpdate.outerMaterial = true
   }

   /**
    * RING
    */

   get count() {
      return this.children.length
   }
   get ringRadius() {
      return this._ringRadius
   }

   set ringRadius(value: number) {
      this._ringRadius = value
      this.needsUpdate.positions = true
   }
   set count(value: number) {
      if (value > this.count) {
         for (let i = this.count; i < value; i++) {
            let shapeChunk = new ShapeChunk(this.outerGeometry)
            this.add(shapeChunk)
         }
      } else if (value < this.count) {
         for (let i = this.count; i > value; i--) {
            this.children[i - 1].dispose()
            this.remove(this.children[i - 1])
         }
      }
      this.needsUpdate.positions = true
      this.needsUpdate.colors = true
   }

   /**
    * METHODS
    */

   updateColorOpt = (color: keyof ColorCoordOpts, opt: keyof ColorCoordOpt, value: number) => {
      this.colorOpts[color][opt] = value
      this.needsUpdate.colors = true
   }

   resetOuterGeometry = () => {
      this.outerGeometry.dispose()
      this.outerGeometry = new THREE.ConeGeometry(
         this._coneRadius,
         this._coneHeight,
         this._coneSegments
      )

      this.children.forEach((item) => {
         item.outer.geometry = this.outerGeometry
      })
   }

   getColorCoordAtIndex = (index: number, color: 'red' | 'green' | 'blue') => {
      const { offset, start, end } = this.colorOpts[color]
      return map(Math.sin((index / this.count + offset) * Math.PI * 2), -1, 1, start, end)
   }

   setShapeProps = () => {
      this.children.forEach((shapeChunk, i) => {
         this.setShapeColor(i)
         this.setShapePosition(i)
      })
   }

   setShapeColor = (index: number) => {
      let red = this.getColorCoordAtIndex(index, 'red')
      let green = this.getColorCoordAtIndex(index, 'green')
      let blue = this.getColorCoordAtIndex(index, 'blue')

      this.children[index].outer.material.color = new THREE.Color(red, green, blue)
      this.children[index].inner.material.color = new THREE.Color(red, green, blue)
   }

   setShapePosition = (index: number) => {
      const angle = (index / this.count) * Math.PI * 2
      this.children[index].position.x = Math.cos(angle) * this._ringRadius
      this.children[index].position.z = Math.sin(angle) * this._ringRadius
      this.children[index].lookAt(0, 0, 0)
      this.children[index].rotateX(Math.PI)
   }

   updateInnerMaterial = (item: ShapeChunk) => {
      item.inner.material.metalness = this._innerMetalness
      item.inner.material.roughness = this._innerRoughness
   }

   updateOuterMaterial = (item: ShapeChunk) => {
      item.outer.material.opacity = this._shapeOpacity
      item.outer.material.metalness = this._shapeMetalness
      item.outer.material.roughness = this._shapeRoughness
   }

   updateWonkiness = (item: ShapeChunk) => {
      item.inner.radius = this._wonkyRadius
      item.inner.geometry.vary = this._wonkyVary
   }

   tick = (time: number) => {
      this.children.forEach((item, i) => {
         item.inner.tick(time * 0.001)

         if (this.needsUpdate.innerMaterial) {
            this.updateInnerMaterial(item)
         }

         if (this.needsUpdate.outerMaterial) {
            this.updateOuterMaterial(item)
         }

         if (this.needsUpdate.wonkiness) {
            this.updateWonkiness(item)
         }

         if (this.needsUpdate.positions) {
            this.setShapePosition(i)
         }

         if (this.needsUpdate.colors) {
            this.setShapeColor(i)
         }
      })

      this.needsUpdate.innerMaterial = false
      this.needsUpdate.outerMaterial = false
      this.needsUpdate.wonkiness = false
      this.needsUpdate.positions = false
      this.needsUpdate.colors = false
   }
}
