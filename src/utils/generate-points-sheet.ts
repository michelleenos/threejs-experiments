import { random } from '../utils'

export const generatePoints = (
   width: number,
   height: number,
   nx: number,
   ny: number,
   particleSize: number = 1,
   randomness: [number, number, number] = [0, 0, 0]
) => {
   const positions = new Float32Array(nx * ny * 3)
   const scales = new Float32Array(nx * ny)
   const uvs = new Float32Array(nx * ny * 2)

   let xspace = width / nx
   let yspace = height / ny
   console.log({ xspace, yspace })

   for (let ix = 0; ix < nx; ix++) {
      for (let iy = 0; iy < ny; iy++) {
         const index = ix * ny + iy

         let x = ix * xspace - width / 2 + xspace / 2
         if (randomness[0] !== 0) x += random(-randomness[0] / 2, randomness[0] / 2)
         let y = iy * yspace - height / 2 + yspace / 2
         if (randomness[1] !== 0) y += random(-randomness[1] / 2, randomness[1] / 2)
         let z = 0
         if (randomness[2] !== 0) z += random(-randomness[2] / 2, randomness[2] / 2)
         uvs[index * 2] = ix / nx
         uvs[index * 2 + 1] = iy / ny

         positions[index * 3] = x
         positions[index * 3 + 1] = y
         positions[index * 3 + 2] = z

         scales[index] = particleSize
      }
   }

   return { positions, scales, uvs }
}
