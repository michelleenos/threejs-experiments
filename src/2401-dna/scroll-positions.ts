import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import World from '../utils/World'
import GeoParticles from './geo-particles'
import * as THREE from 'three'
import Sizes from '../utils/sizes'

gsap.registerPlugin(ScrollTrigger)

const cameraSettings: { position: THREE.Vector3; rotation: THREE.Euler; target?: THREE.Vector3 }[] =
   [
      {
         position: new THREE.Vector3(1.86, 1.11, 1.07),
         rotation: new THREE.Euler(-0.98, 0.49, 0.61),
         target: new THREE.Vector3(-0.28, -2.18, -1.16),
      },
      {
         position: new THREE.Vector3(-5, -0.2, -0.6),
         rotation: new THREE.Euler(-1.58, -1.1, -0.16),
      },
      {
         position: new THREE.Vector3(-0.6, 2.28, -5.27),
         rotation: new THREE.Euler(-2.57, -0.09, -1.43),
      },
   ]

const particleSettings: { position: THREE.Vector3; rotation: THREE.Euler }[] = [
   {
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(Math.PI / 2, 0, Math.PI / 2),
   },
   {
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(Math.PI * 3, 0, Math.PI / 2),
   },
   {
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(Math.PI * 3, 0, Math.PI / 2),
   },
]

export class DNAScroll {
   el: HTMLElement
   sections: {
      el: HTMLElement
      height: number
      offset: number
      position: number
      duration: number
   }[]
   totalHeight: number = 0
   world: World
   sizes: Sizes
   particles: GeoParticles
   timeline!: gsap.core.Timeline

   constructor(container: HTMLElement, world: World, particles: GeoParticles) {
      this.el = container
      this.world = world
      this.sizes = world.sizes
      this.particles = particles

      this.sections = [...this.el.querySelectorAll<HTMLElement>('.section')].map((el) => ({
         el,
         position: 0,
         height: 0,
         offset: 0,
         duration: 0,
      }))

      this.getSizes()
      this.sizes.on('scroller/resize', this.onResize)
      this.setTimeline()
   }

   onResize = () => {
      this.getSizes()
      this.timeline.kill()
      this.setTimeline()
   }

   getSizes = () => {
      let rect = this.el.getBoundingClientRect()
      this.totalHeight = rect.height
      let offset = 0
      this.sections.forEach((section) => {
         section.offset = offset
         section.position = offset / this.totalHeight
         let rect = section.el.getBoundingClientRect()

         section.height = rect.height
         section.duration = section.height / this.totalHeight

         offset += section.height + section.el.offsetTop
      })
   }

   setTimeline = () => {
      gsap.set(this.world.camera.position, {
         x: cameraSettings[0].position.x,
         y: cameraSettings[0].position.y,
         z: cameraSettings[0].position.z,
      })
      gsap.set(this.world.camera.rotation, {
         x: cameraSettings[0].rotation.x,
         y: cameraSettings[0].rotation.y,
         z: cameraSettings[0].rotation.z,
      })
      this.timeline = gsap.timeline({
         scrollTrigger: {
            trigger: this.el,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            immediateRender: false,
         },
      })

      for (let i = 1; i < this.sections.length; i++) {
         this.timeline
            .to(
               this.world.camera.position,
               {
                  duration: this.sections[i - 1].duration,
                  x: cameraSettings[i].position.x,
                  y: cameraSettings[i].position.y,
                  z: cameraSettings[i].position.z,
               },
               this.sections[i - 1].position
            )
            .to(
               this.world.camera.rotation,
               {
                  duration: this.sections[i - 1].duration,
                  x: cameraSettings[i].rotation.x,
                  y: cameraSettings[i].rotation.y,
                  z: cameraSettings[i].rotation.z,
               },
               '<'
            )
         if (particleSettings[i] && particleSettings[i].rotation) {
            this.timeline.to(
               this.particles.cloud.rotation,
               {
                  duration: this.sections[i - 1].duration,
                  x: particleSettings[i].rotation.x,
               },
               '<'
            )
         }
      }
   }

   destroy = () => {
      this.sizes.off('scroller/resize')
      this.timeline.kill()
   }
}
