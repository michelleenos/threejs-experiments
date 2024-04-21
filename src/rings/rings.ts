import * as THREE from 'three'
import '~/style.css'
import World from '../utils/World'
import Sizes from '../utils/sizes'
import vertexShader from './vert.glsl'
import fragmentShader from './frag.glsl'

const sizes = new Sizes()
const world = new World(sizes)

type RingSegmentOpts = {
   innerRadius?: number
   outerRadius?: number
   phiSegments?: number
   thetaStart?: number
   thetaLength?: number
   thetaSegmentsStep?: number
   thetaSegmentsStart?: number
}

const createRingSegment = ({
   innerRadius = 1,
   outerRadius = 2,
   phiSegments = 3,
   thetaStart = 0,
   thetaLength = Math.PI,
   thetaSegmentsStep = 10,
   thetaSegmentsStart = 10,
}: RingSegmentOpts = {}) => {
   let positions = []

   let thetaMid = thetaStart + thetaLength / 2

   for (let ri = 0; ri < phiSegments; ri++) {
      let thetaSegments = thetaSegmentsStart + ri * thetaSegmentsStep
      let radius = innerRadius + ((outerRadius - innerRadius) * ri) / phiSegments
      let thetaStep = thetaLength / (thetaSegments - 1)
      for (let ti = 0; ti < thetaSegments; ti++) {
         let theta = thetaStart + ti * thetaStep
         let x = Math.cos(theta) * radius
         let y = Math.sin(theta) * radius
         let z = 0

         x -= Math.cos(thetaMid) * (innerRadius + (outerRadius - innerRadius) / 2)
         y -= Math.sin(thetaMid) * (innerRadius + (outerRadius - innerRadius) / 2)
         // x += innerRadius / 2
         // y -= innerRadius / 2
         positions.push(x, y, z)
      }
   }

   return new Float32Array(positions)
}

const getPoints = () => {
   let circ = {
      cx: 1,
      cy: 3,
      r: 7,
   }

   let rect = {
      w: 4,
      h: 2,
   }

   let rings = 50
   let minRingPoints = 50

   let points: number[] = []
   let scales: number[] = []

   // for (let i = 1; i < rings; i++) {
   //    let ringPoints = minRingPoints + i * 30
   //    let angleStep = (Math.PI * 2) / ringPoints

   //    for (let j = 0; j < ringPoints; j++) {
   //       let angle = j * angleStep
   //       let r = (i / rings) * circ.r
   //       let x = circ.cx + r * Math.cos(angle)
   //       let y = circ.cy + r * Math.sin(angle)

   //       if (x > -rect.w / 2 && x < rect.w / 2 && y < rect.h / 2 && y > -rect.h / 2) {
   //          points.push(x, y, 0)
   //          scales.push(1)
   //       }
   //    }
   // }

   let rStart = 2
   let rEnd = 7
   let rStep = 0.1

   for (let r = rStart; r < rEnd; r += rStep) {
      let ringPoints = 50 * r
      let slice = (Math.PI * 0.5) / ringPoints
      for (let i = 0; i < ringPoints; i++) {
         let angle = slice * i
         let x = r * Math.cos(angle)
         let y = r * Math.sin(angle)
         points.push(x, y, 0)
         scales.push(1)
      }
   }

   return {
      positions: new Float32Array(points),
      scales: new Float32Array(scales),
   }
}

// let { positions, scales } = getPoints()
const positions = createRingSegment({
   innerRadius: 30,
   outerRadius: 40,
   thetaSegmentsStart: 20,
   thetaSegmentsStep: 0.6,
   phiSegments: 40,
   thetaLength: Math.PI * 0.2,
})
let geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

const axesHelper = new THREE.AxesHelper(10)
world.scene.add(axesHelper)
// geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

// const geometry = new THREE.RingGeometry(9, 12, 50, 7, 0, Math.PI * 0.3)

let material = new THREE.ShaderMaterial({
   uniforms: {
      u_time: new THREE.Uniform(0),
      u_res: new THREE.Uniform(new THREE.Vector2(sizes.width, sizes.height)),
   },
   vertexShader,
   fragmentShader,
   transparent: true,
   depthWrite: false,
})
let pointsObj = new THREE.Points(geometry, material)
world.scene.add(pointsObj)

world.camera.position.set(0, 0, 10)
world.camera.updateProjectionMatrix()

const animate = () => {
   requestAnimationFrame(animate)
   world.renderer.render(world.scene, world.camera)
}

animate()
