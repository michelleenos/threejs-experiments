import Sizes from './Sizes'
import EventEmitter from './event-emitter'
import * as THREE from 'three'

export default class Mouse extends EventEmitter {
   pos = new THREE.Vector2()

   constructor(sizes: Sizes) {
      super()

      document.addEventListener('mousemove', (e: MouseEvent) => {
         this.pos.x = (e.clientX / sizes.width) * 2 - 1
         this.pos.y = -(e.clientY / sizes.height) * 2 + 1

         this.trigger('mouseMove')
      })
   }
}
