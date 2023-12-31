import Sizes from './Sizes'
import EventEmitter from './event-emitter'

export default class Mouse extends EventEmitter {
   x = 0
   y = 0

   constructor(sizes: Sizes) {
      super()

      document.addEventListener('mousemove', (e: MouseEvent) => {
         this.x = (e.clientX / sizes.width) * 2 - 1
         this.y = -(e.clientY / sizes.height) * 2 + 1

         this.trigger('mouseMove')
      })
   }
}
