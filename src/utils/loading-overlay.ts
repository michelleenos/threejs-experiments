import * as THREE from 'three'

const createElement = (
   tag: string,
   atts: { [key: string]: any } = {},
   children: (string | Element)[] = []
) => {
   const el = document.createElement(tag)
   Object.keys(atts).forEach((key) => {
      el.setAttribute(key, atts[key])
   })
   children.forEach((child) => {
      el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child)
   })
   return el
}

const styles = `
.loader__bar {
   position: fixed;
   z-index: 100;
   width: 100%;
   height: 10px;
   background: #ff8a2b;
   left: 0;
   bottom: 0;
   transition: transform 0.5s ease-out; 
   transform-origin: left;
   transform: scaleX(0);
}

.loader__cover {
   position: fixed;
   z-index: 99;
   width: 100%;
   height: 100%;
   background: #000;
   left: 0;
   top: 0;
   transition: opacity 0.8s ease-in-out;
}

.loader--finished .loader__bar,
.loader--finished .loader__cover {
   pointer-events: none;
}
.loader--finished .loader__bar {
   transition: transform 0.4s linear;
}
`

export default class Loader {
   manager: THREE.LoadingManager
   cover: HTMLElement
   bar: HTMLElement
   container: HTMLElement
   style: HTMLElement
   onReady?: () => any

   constructor(onReady?: () => any) {
      this.onReady = onReady
      this.manager = new THREE.LoadingManager(this.onFinished, this.onProgress)

      this.bar = createElement('div', { class: 'loader__bar' })
      this.cover = createElement('div', { class: 'loader__cover' })
      this.container = createElement('div', { class: 'loader' }, [this.bar, this.cover])
      this.style = createElement('style', {}, [styles])
      document.body.append(this.container, this.style)
   }

   onFinished = () => {
      window.setTimeout(() => {
         this.cover.style.opacity = '0'
         if (this.onReady) this.onReady()
      }, 1000)

      window.setTimeout(() => {
         this.bar.style.transform = 'scaleX(0)'
         this.bar.style.transformOrigin = 'right'
      }, 800)

      this.container.classList.add('loader--finished')
   }

   onProgress = (_: any, itemsLoaded: number, itemsTotal: number) => {
      const progress = itemsLoaded / itemsTotal
      console.log(progress)
      this.bar.style.transform = `scaleX(${progress})`
   }
}
