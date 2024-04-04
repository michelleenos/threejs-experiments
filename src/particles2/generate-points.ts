export const generatePoints = (
   width: number,
   height: number,
   nx: number,
   ny: number,
   particleSize: number = 1
) => {
   const positions = new Float32Array(nx * ny * 3)
   const scales = new Float32Array(nx * ny)

   for (let ix = 0; ix < nx; ix++) {
      for (let iy = 0; iy < ny; iy++) {
         const index = ix * nx + iy

         const x = ix * (width / nx) - width / 2
         const y = 0
         const z = iy * (height / ny) - height / 2

         positions[index * 3] = x
         positions[index * 3 + 1] = y
         positions[index * 3 + 2] = z

         scales[index] = Math.min(window.devicePixelRatio, 2.0) * particleSize
      }
   }

   return { positions, scales }
}
