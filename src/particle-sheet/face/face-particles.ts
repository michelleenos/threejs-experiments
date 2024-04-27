import * as THREE from 'three'
import '~/style.css'
import Sizes from '../../utils/sizes'

import vertexShader from './face-vert.glsl'
import fragmentShader from './face-frag.glsl'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { faceNormalized } from './face-coords-normalized'
import World from '../../utils/World'
import { DomParticles, type PointsData } from '../ParticlesToDom'
import Mouse from '../../utils/Mouse'

THREE.ColorManagement.enabled = true

const sizes = new Sizes()
const world = new World(sizes)
const mouse = new Mouse(sizes)
world.camera.position.set(0, 0, 10)

const stats = new Stats()
document.body.appendChild(stats.dom)

const clock = new THREE.Clock()

const particles = new DomParticles({
   world,
   mouse,
   pointsData: faceNormalized as PointsData,
   vertexShader,
   fragmentShader,
   domTarget: document.querySelector('.face-box-inner') as HTMLElement,
})

const speeds = new Float32Array(faceNormalized.coords.length)
faceNormalized.coords.forEach((_, i) => {
   speeds[i] = Math.random() * 5 + 5
})
particles.geometry.setAttribute('a_speed', new THREE.Float32BufferAttribute(speeds, 1))

function tick() {
   stats.begin()

   const elapsedTime = clock.getElapsedTime()
   particles.update(elapsedTime)
   world.render()

   stats.end()
   window.requestAnimationFrame(tick)
}

window.requestAnimationFrame(tick)
