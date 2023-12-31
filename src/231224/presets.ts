import { easing } from '../utils/easings'
import Rings, { ringsFns } from './Rings'
import Particles from './SpaceParticles'

export interface PresetParticles {
   radius: number
   opacity: number
   color: string
   size: number
   count: number
   rotateSpeed: { x: number; y: number; z: number }
   position: { x: number; y: number; z: number }
}

export interface PresetRings {
   visible: boolean
   speed: number
   radius: number
   opacity: number
   thickness: number
   count: number
   scaleVar: number
   coverAmt: number
   scaleFn: number
   posFn: number
   easingTime: string
   easingShape: string
   blending: number
   initRotation: { x: number; y: number; z: number }
   rotateSpeed: { x: number; y: number; z: number }
}

export const getParticlesPreset = (particles: Particles): PresetParticles => ({
   radius: particles.radius,
   opacity: particles.opacity,
   color: particles.color.getHexString(),
   size: particles.size,
   count: particles.count,
   rotateSpeed: particles.rotateSpeed,
   position: particles.mesh.position,
})

export const getRingsPreset = (rings: Rings): PresetRings => ({
   speed: rings.speed,
   radius: rings.radius,
   opacity: rings.opacity,
   thickness: rings.thickness,
   count: rings.count,
   scaleVar: rings.scaleVar,
   coverAmt: rings.coverAmt,
   scaleFn: ringsFns.indexOf(rings.scaleFn),
   posFn: ringsFns.indexOf(rings.posFn),
   // easing: rings.easing,
   easingTime: rings.easingTime,
   easingShape: rings.easingShape,
   blending: rings.blending,
   visible: rings.visible,
   initRotation: rings.initRotation,
   rotateSpeed: rings.rotateSpeed,
})

export const setParticlesFromPreset = (particles: Particles, preset: PresetParticles) => {
   particles.radius = preset.radius
   particles.opacity = preset.opacity
   particles.color = `#${preset.color}`
   particles.size = preset.size
   particles.count = preset.count
   particles.rotateSpeed.set(preset.rotateSpeed.x, preset.rotateSpeed.y, preset.rotateSpeed.z)
   particles.mesh.position.set(preset.position.x, preset.position.y, preset.position.z)
}

export const setRingsFromPreset = (rings: Rings, preset: PresetRings) => {
   rings.speed = preset.speed
   rings.radius = preset.radius
   rings.opacity = preset.opacity
   rings.thickness = preset.thickness
   rings.count = preset.count
   rings.scaleVar = preset.scaleVar
   rings.coverAmt = preset.coverAmt
   rings.scaleFn = ringsFns[preset.scaleFn]
   rings.posFn = ringsFns[preset.posFn]
   rings.easingTime = preset.easingTime as keyof typeof easing
   rings.easingShape = preset.easingShape as keyof typeof easing
   rings.blending = preset.blending as THREE.Blending
   rings.visible = preset.visible
   rings.initRotation.set(preset.initRotation.x, preset.initRotation.y, preset.initRotation.z)
   rings.rotateSpeed.set(preset.rotateSpeed.x, preset.rotateSpeed.y, preset.rotateSpeed.z)
}

export const ringsPresets: PresetRings[][] = [
   [
      {
         speed: 0,
         radius: 3,
         opacity: 1,
         thickness: 0.027,
         count: 29,
         scaleVar: 2,
         coverAmt: 1,
         scaleFn: 2,
         posFn: 1,
         easingShape: 'linear',
         easingTime: 'linear',
         blending: 1,
         visible: true,
         initRotation: {
            x: 0.26,
            y: 0,
            z: 0.42,
         },
         rotateSpeed: {
            x: 0.0003,
            y: 0,
            z: 0,
         },
      },
      {
         speed: 0.4,
         radius: 5.24,
         opacity: 1,
         thickness: 0.005,
         count: 41,
         scaleVar: 2,
         coverAmt: 0.07,
         scaleFn: 0,
         posFn: 2,
         easingShape: 'outCubic',
         easingTime: 'linear',
         blending: 1,
         visible: true,
         initRotation: {
            x: 0.58,
            y: 0.07,
            z: -0.61,
         },
         rotateSpeed: {
            x: 0,
            y: 0,
            z: 0,
         },
      },
   ],
   [
      {
         speed: 0.8,
         radius: 4.22,
         opacity: 0.3,
         thickness: 0.144,
         count: 164,
         scaleVar: 2,
         coverAmt: 0.15,
         scaleFn: 1,
         posFn: 3,
         easingShape: 'inCubic',
         easingTime: 'linear',
         blending: 2,
         visible: true,
         initRotation: {
            x: 0,
            y: 0,
            z: 0,
         },
         rotateSpeed: {
            x: 0,
            y: 0,
            z: 0,
         },
      },
      {
         speed: 0.4,
         radius: 5.74,
         opacity: 0.447,
         thickness: 0.057,
         count: 17,
         scaleVar: -2.05,
         coverAmt: 0.2,
         scaleFn: 4,
         posFn: 0,
         easingShape: 'outCubic',
         easingTime: 'linear',
         blending: 1,
         visible: false,
         initRotation: {
            x: 0,
            y: 0,
            z: 0,
         },
         rotateSpeed: {
            x: 0,
            y: 0,
            z: 0,
         },
      },
   ],
   [
      {
         speed: 0,
         radius: 3,
         opacity: 1,
         thickness: 0.02,
         count: 115,
         scaleVar: 2,
         coverAmt: 1,
         scaleFn: 0,
         posFn: 2,
         easingShape: 'inOutCubic',
         easingTime: 'linear',
         blending: 1,
         visible: true,
         initRotation: {
            x: 0,
            y: 0,
            z: 0,
         },
         rotateSpeed: {
            x: 0,
            y: 0,
            z: 0,
         },
      },
      {
         speed: 0.3,
         radius: 5,
         opacity: 1,
         thickness: 0.045,
         count: 29,
         scaleVar: 2,
         coverAmt: 0.5,
         scaleFn: 0,
         posFn: 2,
         easingTime: 'linear',
         easingShape: 'linear',
         blending: 1,
         visible: true,
         initRotation: {
            x: 0,
            y: 0,
            z: 1.57,
         },
         rotateSpeed: {
            x: 0,
            y: 0,
            z: 0,
         },
      },
   ],
   [
      {
         speed: 1.6,
         radius: 4.26,
         opacity: 1,
         thickness: 0.018,
         count: 46,
         scaleVar: 2,
         coverAmt: 0.3,
         scaleFn: 0,
         posFn: 3,
         easingTime: 'linear',
         easingShape: 'quadratic',
         blending: 1,
         visible: true,
         initRotation: {
            x: -0.64,
            y: 0.02,
            z: 0,
         },
         rotateSpeed: {
            x: 0,
            y: 0,
            z: 0,
         },
      },
      {
         speed: 0.4,
         radius: 3.52,
         opacity: 1,
         thickness: 0.005,
         count: 41,
         scaleVar: 2,
         coverAmt: 0.07,
         scaleFn: 0,
         posFn: 2,
         easingTime: 'linear',
         easingShape: 'outCubic',
         blending: 1,
         visible: false,
         initRotation: {
            x: 0.58,
            y: 0.07,
            z: -0.61,
         },
         rotateSpeed: {
            x: 0,
            y: 0,
            z: 0,
         },
      },
   ],
]

export const particlesPresets: PresetParticles[][] = [
   [
      {
         radius: 10,
         opacity: 0.3,
         color: '4f2f63',
         size: 10,
         count: 50,
         rotateSpeed: {
            x: -0.0001,
            y: 0.0001,
            z: 0,
         },
         position: {
            x: 0,
            y: 0,
            z: 0,
         },
      },
      {
         radius: 10,
         opacity: 0.3,
         color: '0003e7',
         size: 10,
         count: 50,
         rotateSpeed: {
            x: -0.0001,
            y: 0.0001,
            z: -0.00018,
         },
         position: {
            x: 0,
            y: 0,
            z: 0,
         },
      },
      {
         radius: 14,
         opacity: 1,
         color: 'ffffff',
         size: 0.1,
         count: 300,
         rotateSpeed: {
            x: 0.001,
            y: -0.001,
            z: 0,
         },
         position: {
            x: 0,
            y: 0,
            z: 0,
         },
      },
      {
         radius: 14,
         opacity: 1,
         color: 'ffffff',
         size: 0.2,
         count: 50,
         rotateSpeed: {
            x: 0.0005,
            y: 0.0005,
            z: 0.0005,
         },
         position: {
            x: 0,
            y: 0,
            z: 0,
         },
      },
   ],
]
