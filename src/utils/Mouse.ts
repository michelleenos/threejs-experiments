import Sizes from './sizes'
// import EventEmitter from './event-emitter'
import { EventEmitter } from 'tseep'
import * as THREE from 'three'

export default class Mouse extends EventEmitter<{
   mouseMove: () => void
}> {
   pos = new THREE.Vector2()
   posPrev = new THREE.Vector2()
   screenPos = new THREE.Vector2()
   posLerp = new THREE.Vector2()
   // speed = 0
   // angle = 0
   // velocity = 0
   lerpVal = 0.1
   sizes: Sizes

   constructor(sizes: Sizes) {
      super()
      this.sizes = sizes

      document.addEventListener('mousemove', this.onMouseMove)
   }

   onMouseMove = (e: MouseEvent) => {
      this.posPrev.copy(this.pos)
      this.screenPos.set(e.clientX, e.clientY)
      this.pos.set((e.clientX / this.sizes.width) * 2 - 1, -(e.clientY / this.sizes.height) * 2 + 1)
      this.posLerp.lerp(this.pos, this.lerpVal)

      this.emit('mouseMove')
   }

   update = () => {
      this.posLerp.lerp(this.pos, this.lerpVal)
   }

   // calculateMovement = () => {
   //    this.speed = this.pos.distanceTo(this.posPrev)
   //    this.velocity = lerp(this.velocity, this.speed, this.lerpVal)
   //    this.angle = Math.atan2(this.posLerp.y - this.posPrev.y, this.posLerp.x - this.posPrev.x)
   // }

   // drag = () => {
   //    if (this.velocity > 0.001) {
   //       this.velocity *= 0.99
   //    } else {
   //       this.velocity = 0
   //    }
   // }
}
