export const generatePoints = (
   width: number,
   height: number,
   nx: number,
   ny: number,
   particleSize: number = 1
) => {
   const positions = new Float32Array(nx * ny * 3)
   const scales = new Float32Array(nx * ny)
   let xspace = width / nx
   let yspace = height / ny

   for (let ix = 0; ix < nx; ix++) {
      for (let iy = 0; iy < ny; iy++) {
         const index = ix * ny + iy

         const x = ix * xspace - width / 2 + xspace / 2
         const y = 0
         const z = iy * yspace - height / 2 + yspace / 2

         // console.log({ x, y, z, index })

         positions[index * 3] = x
         positions[index * 3 + 1] = z
         positions[index * 3 + 2] = y

         scales[index] = Math.min(window.devicePixelRatio, 2.0) * particleSize
      }
   }

   return { positions, scales }
}
