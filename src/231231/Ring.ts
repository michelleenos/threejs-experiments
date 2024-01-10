import * as THREE from 'three'
import { clamp, map } from '../utils'
import Mouse from '../utils/Mouse'
import WonkyShape, { WonkyShapeOptions } from './WonkyShape'

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
   metalness?: number
   roughness?: number
   outerOpacity?: number
   count?: number
   innerPosY?: number
   posY?: number
   wonkyShapeOptions?: WonkyShapeOptions
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
   outerGeometry: THREE.BufferGeometry
   outerMaterial: THREE.MeshStandardMaterial
   outerInstance: THREE.InstancedMesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>
   wonkyShapes: WonkyShape[] = []
   colorOpts: ColorCoordOpts
   camera: THREE.Camera
   mouse: Mouse
   raycaster = new THREE.Raycaster()
   intersecting: number | null = null
   _coneRadius: number
   _coneHeight: number
   _coneSegments: number
   _ringRadius: number
   _wonkyRadius: number
   _wonkyVary: number
   _wonkyMetalness: number
   _wonkyRoughness: number
   _innerPosY: number
   _wonkyShapeNoiseAmount: number
   _wonkyShapeNoiseSpeed: number

   needsUpdate = {
      innerMaterial: false,
      innerPos: false,
   }

   constructor(
      camera: THREE.Camera,
      mouse: Mouse,
      {
         innerPosY = 6,
         posY = 1,
         outerOpacity = 0.5,
         metalness = 0.5,
         roughness = 0.5,
         coneRadius = 7.6,
         coneHeight = 22,
         coneSegments = 100,
         ringRadius = 50,
         count = 14,
         colorOpts = defaultColorCoordOpts,
         wonkyShapeOptions = {},
      }: RingOptions = {}
   ) {
      super()
      this.mouse = mouse
      this.camera = camera
      this.colorOpts = colorOpts
      this._ringRadius = ringRadius
      this._coneRadius = coneRadius
      this._coneHeight = coneHeight
      this._coneSegments = coneSegments
      this._innerPosY = innerPosY

      this.position.y = posY

      this.outerGeometry = new THREE.ConeGeometry(
         this._coneRadius,
         this._coneHeight,
         this._coneSegments
      )
      this.outerGeometry.attributes.position.needsUpdate = true
      this.outerMaterial = new THREE.MeshStandardMaterial({
         color: '#fff',
         opacity: outerOpacity,
         metalness,
         roughness,
         transparent: true,
      })
      this.outerInstance = new THREE.InstancedMesh(this.outerGeometry, this.outerMaterial, count)
      this.outerInstance.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
      this.outerInstance.position.set(0, 0, 0)
      this.add(this.outerInstance)

      this._wonkyRadius = wonkyShapeOptions.radius ?? 4
      this._wonkyVary = wonkyShapeOptions.vary ?? 0.2
      this._wonkyMetalness = wonkyShapeOptions.metalness ?? 0.5
      this._wonkyRoughness = wonkyShapeOptions.roughness ?? 0.5
      this._wonkyShapeNoiseAmount = wonkyShapeOptions.noiseAmount ?? 0.3
      this._wonkyShapeNoiseSpeed = wonkyShapeOptions.noiseSpeed ?? 0.001
      this.rebuild()
   }

   rebuild = () => {
      this.wonkyShapes.forEach((item) => {
         item.dispose()
         this.remove(item)
      })
      this.wonkyShapes = []

      let opts = {
         radius: this._wonkyRadius,
         vary: this._wonkyVary,
         metalness: this._wonkyMetalness,
         roughness: this._wonkyRoughness,
         noiseAmount: this._wonkyShapeNoiseAmount,
         noiseSpeed: this._wonkyShapeNoiseSpeed,
      }

      for (let i = 0; i < this.count; i++) {
         let wonkyShape = new WonkyShape(opts)
         this.wonkyShapes.push(wonkyShape)
         this.add(wonkyShape)
      }

      this.setShapes()
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
   get wonkyMetalness() {
      return this._wonkyMetalness
   }
   get wonkyRoughness() {
      return this._wonkyRoughness
   }
   get innerPosY() {
      return this._innerPosY
   }
   get wonkyShapeNoiseAmount() {
      return this._wonkyShapeNoiseAmount
   }
   get wonkyShapeNoiseSpeed() {
      return this._wonkyShapeNoiseSpeed
   }

   set wonkyRadius(value: number) {
      this._wonkyRadius = value
      // this.rebuild()
      this.wonkyShapes.forEach((shape) => {
         shape.setScale(value)
      })
   }
   set wonkyVary(value: number) {
      this._wonkyVary = value
      this.rebuild()
   }
   set wonkyMetalness(value: number) {
      this._wonkyMetalness = value
      this.needsUpdate.innerMaterial = true
   }
   set wonkyRoughness(value: number) {
      this._wonkyRoughness = value
      this.needsUpdate.innerMaterial = true
   }
   set innerPosY(value: number) {
      this._innerPosY = value
      this.needsUpdate.innerPos = true
   }
   set wonkyShapeNoiseAmount(value: number) {
      this._wonkyShapeNoiseAmount = value
      this.wonkyShapes.forEach((shape) => (shape.noiseAmount = value))
   }
   set wonkyShapeNoiseSpeed(value: number) {
      this._wonkyShapeNoiseSpeed = value
      this.wonkyShapes.forEach((shape) => (shape.noiseSpeed = value))
   }

   /**
    * RING
    */
   get count() {
      return this.outerInstance.count
   }
   get ringRadius() {
      return this._ringRadius
   }
   set ringRadius(value: number) {
      this._ringRadius = value
      this.setShapes()
   }
   set count(value: number) {
      this.remove(this.outerInstance)
      this.outerInstance.dispose()
      this.outerInstance = new THREE.InstancedMesh(this.outerGeometry, this.outerMaterial, value)
      this.outerInstance.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
      this.outerInstance.position.set(0, 0, 0)
      this.add(this.outerInstance)
      this.rebuild()
   }

   /**
    * METHODS
    */

   updateColorOpt = (color: keyof ColorCoordOpts, opt: keyof ColorCoordOpt, value: number) => {
      this.colorOpts[color][opt] = value
      this.setShapes()
   }

   resetOuterGeometry = () => {
      let oldGeometry = this.outerGeometry
      this.outerGeometry = new THREE.ConeGeometry(
         this._coneRadius,
         this._coneHeight,
         this._coneSegments
      )

      this.outerInstance.geometry = this.outerGeometry
      oldGeometry.dispose()
   }

   getColorCoordAtIndex = (index: number, color: 'red' | 'green' | 'blue') => {
      const { offset, start, end } = this.colorOpts[color]
      let val = map(Math.sin((index / this.count + offset) * Math.PI * 2), -1, 1, start, end)
      return clamp(val, 0, 1)
   }

   setShapes = () => {
      const matrix = new THREE.Matrix4()
      const quaternion = new THREE.Quaternion()
      quaternion.setFromEuler(new THREE.Euler(Math.PI, 0, 0))

      for (let i = 0; i < this.count; i++) {
         const angle = (i / this.count) * Math.PI * 2
         const position = new THREE.Vector3(
            Math.cos(angle) * this._ringRadius,
            0,
            Math.sin(angle) * this._ringRadius
         )

         matrix.makeRotationFromQuaternion(quaternion)
         matrix.setPosition(position)
         this.outerInstance.setMatrixAt(i, matrix)
         position.y += this._innerPosY
         this.wonkyShapes[i].position.copy(position)

         let color = new THREE.Color(
            this.getColorCoordAtIndex(i, 'red'),
            this.getColorCoordAtIndex(i, 'green'),
            this.getColorCoordAtIndex(i, 'blue')
         )
         this.outerInstance.setColorAt(i, color)
         this.wonkyShapes[i].material.userData.color = color
         this.wonkyShapes[i].material.color.set(color)
      }

      this.outerInstance.instanceMatrix.needsUpdate = true
      this.outerInstance.instanceColor && (this.outerInstance.instanceColor.needsUpdate = true)
   }

   findIntersectedIndex = () => {
      this.raycaster.setFromCamera(this.mouse.pos, this.camera)
      const intersects = this.raycaster.intersectObjects(this.children)
      let intersected = intersects.find((item) => item.object === this.outerInstance)

      if (intersected) {
         let index = intersected.instanceId
         return index
      }
   }

   checkIntersects = () => {
      let index = this.findIntersectedIndex()
      if (index || index === 0) {
         if (index === this.intersecting) return
         this.resetIntersecting()
         this.setIntersecting(index)
      } else {
         this.resetIntersecting()
      }
   }

   setIntersecting = (index: number) => {
      this.wonkyShapes[index].setColor(new THREE.Color('#ffffff'))
      this.wonkyShapes[index].setScale(this._wonkyRadius * 1.25)
      this.intersecting = index
   }

   resetIntersecting = () => {
      if (!this.intersecting && this.intersecting !== 0) return

      let shape = this.wonkyShapes[this.intersecting]
      let colorToSet = new THREE.Color(
         this.getColorCoordAtIndex(this.intersecting, 'red'),
         this.getColorCoordAtIndex(this.intersecting, 'green'),
         this.getColorCoordAtIndex(this.intersecting, 'blue')
      )

      shape.setColor(colorToSet)
      shape.setScale(this._wonkyRadius)
      this.intersecting = null
   }

   tick = (time: number) => {
      this.checkIntersects()

      for (let i = 0; i < this.count; i++) {
         let shape = this.wonkyShapes[i]

         if (this.needsUpdate.innerMaterial) {
            shape.material.metalness = this._wonkyMetalness
            shape.material.roughness = this._wonkyRoughness
         }

         if (this.needsUpdate.innerPos) {
            shape.position.y = this._innerPosY
         }
         shape.tick(time)
      }

      this.needsUpdate.innerMaterial = false
      this.needsUpdate.innerPos = false
   }

   dispose = () => {
      this.wonkyShapes.forEach((item) => {
         item.dispose()
         this.remove(item)
      })
      this.outerMaterial.dispose()
      this.outerGeometry.dispose()
      this.remove(this.outerInstance)
      this.outerInstance.dispose()
   }
}
