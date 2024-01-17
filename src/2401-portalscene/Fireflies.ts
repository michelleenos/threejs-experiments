import * as THREE from 'three'
import firefliesFragment from './glsl/fireflies/fragment.glsl'
import firefliesVertex from './glsl/fireflies/vertex.glsl'
import World from '../utils/World'
import Sizes from '../utils/sizes'

const getPositions = (count: number = 30) => {
   const positions = new Float32Array(count * 3)
   for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4
      positions[i * 3 + 1] = 0.25 + Math.random() * 1.25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
   }

   return positions
}

const getScales = (count: number = 30) => {
   const scales = new Float32Array(count)
   for (let i = 0; i < count; i++) {
      scales[i] = Math.random()
   }
   return scales
}

export default class Fireflies {
   world: World
   sizes: Sizes
   points: THREE.Points
   geometry: THREE.BufferGeometry
   material: THREE.ShaderMaterial

   constructor(world: World) {
      this.geometry = new THREE.BufferGeometry()
      this.geometry.setAttribute('position', new THREE.BufferAttribute(getPositions(), 3))
      this.geometry.setAttribute('aScale', new THREE.BufferAttribute(getScales(), 1))
      this.material = new THREE.ShaderMaterial({
         uniforms: {
            uPixelRatio: { value: world.sizes.pixelRatio },
            uSize: { value: 100 },
            uTime: { value: 0 },
         },
         vertexShader: firefliesVertex,
         fragmentShader: firefliesFragment,
         transparent: true,
         depthWrite: false,
         blending: THREE.AdditiveBlending,
      })

      this.points = new THREE.Points(this.geometry, this.material)

      this.world = world
      this.sizes = world.sizes
      this.world.scene.add(this.points)

      // this.scene = scene
      // this.sizes = sizes
      this.sizes.on('resize', this.onResize)
   }

   onResize = () => {
      this.material.uniforms.uPixelRatio.value = this.sizes.pixelRatio
   }

   tick = (time: number) => {
      this.material.uniforms.uTime.value = time
   }
}
