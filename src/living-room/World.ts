import * as THREE from 'three'
import Experience from './Experience'
import Resources from '../utils/Resources'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import GUI from 'lil-gui'

export default class World {
   experience: Experience
   scene: THREE.Scene
   floor: THREE.Mesh
   resources: Resources
   couch: Couch

   constructor(experience: Experience) {
      this.experience = experience
      this.scene = experience.scene
      this.resources = experience.resources

      this.floor = this.makeFloor()
      this.couch = new Couch(this.experience)

      this.resources.on('ready', () => {
         let couch = this.resources.items.couch.file

         if (couch && couch.hasOwnProperty('scene')) {
            this.couch.handleResources(couch as GLTF)
         }
      })
   }

   makeFloor() {
      let geometry = new THREE.CircleGeometry(5, 64)
      let material = new THREE.MeshStandardMaterial({
         color: 0x808080,
      })
      let floor = new THREE.Mesh(geometry, material)
      floor.rotation.x = -Math.PI / 2
      floor.receiveShadow = true
      this.scene.add(floor)

      return floor
   }
}

export class Couch {
   model: THREE.Group | null = null
   experience: Experience
   scene: THREE.Scene
   resources: Resources
   material: THREE.MeshStandardMaterial

   gui?: GUI

   constructor(experience: Experience) {
      this.experience = experience
      this.scene = experience.scene
      this.resources = experience.resources
      this.material = new THREE.MeshStandardMaterial({
         color: '#19316f',
      })

      if (this.experience.gui) this.gui = this.experience.gui.addFolder('couch')
   }

   handleResources(gltf: GLTF) {
      this.model = gltf.scene

      this.setMaterial()

      this.model.traverse((child) => {
         if (child instanceof THREE.Mesh) {
            child.castShadow = true
            child.receiveShadow = true
            child.material = this.material
         }
      })
      this.scene.add(this.model)
   }

   setMaterial() {
      this.material.roughness = 1.2
      if (this.gui) {
         this.gui.add(this.material, 'roughness', 0, 2, 0.001)
         this.gui.add(this.material, 'aoMapIntensity', 0, 10, 0.001)
         this.gui.add(this.material, 'metalness', 0, 1, 0.001)
      }

      this.material.needsUpdate = true
   }
}
