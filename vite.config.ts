import { defineConfig } from 'vite'
import { resolve } from 'path'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
   root: 'src',
   resolve: {
      alias: {
         '~/': `${resolve(__dirname, 'src')}/`,
      },
   },
   plugins: [glsl()],
})
