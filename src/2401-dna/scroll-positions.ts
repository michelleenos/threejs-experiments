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

export const scrollAnimations = (
   sections: HTMLElement[],
   world: World,
   particles: GeoParticles
) => {
   let timelines: gsap.core.Timeline[] = []

   ScrollTrigger.defaults({
      immediateRender: false,
      markers: true,
      scrub: 1,
      start: 'top top',
      end: 'bottom top',
   })

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
