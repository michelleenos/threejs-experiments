import Sizes from './Sizes'
import EventEmitter from './event-emitter'
import * as THREE from 'three'

export default class Mouse extends EventEmitter {
   pos = new THREE.Vector2()
   screenPos = new THREE.Vector2()

   constructor(sizes: Sizes) {
      super()

      document.addEventListener('mousemove', (e: MouseEvent) => {
         this.screenPos.set(e.clientX, e.clientY)
         this.pos.set((e.clientX / sizes.width) * 2 - 1, -(e.clientY / sizes.height) * 2 + 1)

         this.trigger('mouseMove')
      })
   }
}
