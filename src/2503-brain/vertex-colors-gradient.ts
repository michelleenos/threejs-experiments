import * as THREE from 'three'
import { map } from '~/utils'

type ColorGradientOpts = {
   color1: string
   color2: string
   min?: number
   max?: number
   axis?: 'x' | 'y' | 'z'
}

export function vertexColorsGradient(
   geometry: THREE.BufferGeometry,
   { color1, color2, min = -1, max = 1, axis = 'x' }: ColorGradientOpts
) {
   let count = geometry.attributes.position.count
   let colors = []
   let positions = geometry.attributes.position as THREE.BufferAttribute
   let lightblue = new THREE.Color(color1)
   let darkblue = new THREE.Color(color2)

   for (let i = 0; i < count; i++) {
      let pos =
         axis === 'x' ? positions.getX(i) : axis === 'y' ? positions.getY(i) : positions.getZ(i)
      let amount = map(pos, min, max, 0, 1)
      let color = new THREE.Color().copy(lightblue).lerp(darkblue, amount)
      colors.push(color.r, color.g, color.b)
   }

   geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
}
