import EventEmitter from './event-emitter'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

export type GltfSource = { type: 'gltf'; path: string; file?: GLTF }
export type TextureSource = { type: 'texture'; path: string; file?: THREE.Texture }

export type Source = GltfSource | TextureSource
export type Sources = { [key: string]: Source }

export default class Resources extends EventEmitter {
   items: Sources
   toLoad: number
   loaded: number
   loaders = { gltfLoader: new GLTFLoader(), textureLoader: new THREE.TextureLoader() }

   constructor(sources: Sources) {
      super()

      this.items = sources
      this.toLoad = Object.keys(this.items).length
      this.loaded = 0

      this.startLoading()
   }

   startLoading() {
      for (const sourceName of Object.keys(this.items)) {
         let source = this.items[sourceName]
         if (source.type === 'gltf') {
            this.loadGltf(source)
         } else if (source.type === 'texture') {
            this.loadTexture(source)
         }
      }
   }

   loadGltf(source: GltfSource) {
      this.loaders.gltfLoader.load(source.path, (file: GLTF) => {
         source.file = file
         this.sourceLoaded()
      })
   }

   loadTexture(source: TextureSource) {
      this.loaders.textureLoader.load(source.path, (file: THREE.Texture) => {
         source.file = file
         this.sourceLoaded()
      })
   }

   sourceLoaded() {
      this.loaded++
      if (this.loaded === this.toLoad) this.trigger('ready')
   }
}
