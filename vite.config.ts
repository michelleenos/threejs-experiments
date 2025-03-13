import { defineConfig } from 'vite'
import path from 'path'
import glsl from 'vite-plugin-glsl'
import getEntries from './get-entries'

let entries = await getEntries('src')

export default defineConfig({
    root: 'src',
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
        },
    },

    plugins: [glsl()],
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'src/index.html'),
                ...entries,
            },
        },
        target: 'esnext',
    },
})
