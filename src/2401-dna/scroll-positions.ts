import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import World from '../utils/World'
import GeoParticles from './geo-particles'
import * as THREE from 'three'

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
         position: new THREE.Vector3(0.17, -1.22, -6.3),
         rotation: new THREE.Euler(-2.88, -0.08, -1.68),
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
   // {
   //    position: new THREE.Vector3(0, 0, 0),
   //    rotation: new THREE.Euler(0, 0, 0),
   // },
]

export const scrollAnimations = (container: HTMLElement, world: World, particles: GeoParticles) => {
   let timelines: gsap.core.Timeline[] = []

   const sections = container.querySelectorAll<HTMLElement>('.section')

   gsap
      .timeline({
         scrollTrigger: {
            trigger: sections[0],
         },
      })
      .to(world.camera.position, {
         x: cameraSettings[1].position.x,
         y: cameraSettings[1].position.y,
         z: cameraSettings[1].position.z,
      })
      .to(
         world.camera.rotation,
         {
            x: cameraSettings[1].rotation.x,
            y: cameraSettings[1].rotation.y,
            z: cameraSettings[1].rotation.z,
         },
         '<'
      )
      .to(
         particles.cloud.rotation,
         {
            x: particleSettings[1].rotation.x,
         },
         '<'
      )

   gsap
      .timeline({
         scrollTrigger: {
            trigger: sections[1],
         },
      })
      .to(world.camera.position, {
         x: cameraSettings[2].position.x,
         y: cameraSettings[2].position.y,
         z: cameraSettings[2].position.z,
      })
      .to(
         world.camera.rotation,
         {
            x: cameraSettings[2].rotation.x,
            y: cameraSettings[2].rotation.y,
            z: cameraSettings[2].rotation.z,
         },
         '<'
      )

   return timelines
}

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
   particles: GeoParticles
   timeline!: gsap.core.Timeline

   constructor(container: HTMLElement, world: World, particles: GeoParticles) {
      this.el = container
      this.world = world
      this.particles = particles

      this.sections = [...this.el.querySelectorAll<HTMLElement>('.section')].map((el) => ({
         el,
         position: 0,
         height: 0,
         offset: 0,
         duration: 0,
      }))

      this.getSizes()
      this.setTimeline()
   }

   getSizes = () => {
      this.totalHeight = this.el.getBoundingClientRect().height
      let offset = 0
      this.sections.forEach((section) => {
         section.offset = offset
         section.position = offset / this.totalHeight
         section.height = section.el.getBoundingClientRect().height
         section.duration = section.height / this.totalHeight
         offset += section.height
      })
   }

   setTimeline = () => {
      this.timeline = gsap.timeline({
         scrollTrigger: {
            trigger: this.el,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            markers: true,
            immediateRender: false,
         },
      })

      for (let i = 1; i < this.sections.length; i++) {
         this.timeline
            .to(
               this.world.camera.position,
               {
                  duration: this.sections[i].duration,
                  x: cameraSettings[i].position.x,
                  y: cameraSettings[i].position.y,
                  z: cameraSettings[i].position.z,
               },
               this.sections[i - 1].position
            )
            .to(
               this.world.camera.rotation,
               {
                  duration: this.sections[i].duration,
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
                  duration: this.sections[i].duration,
                  x: particleSettings[i].rotation.x,
               },
               '<'
            )
         }
      }
   }
}
