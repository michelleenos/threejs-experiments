import '../style.css'
import * as THREE from 'three'
import { Scene } from '../utils/scene'
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js'

class RayScene extends Scene {
   // geo = new THREE.BoxGeometry(10, 10, 10)
   geo = new THREE.SphereGeometry(10, 32, 32)
   pointer = new THREE.Vector2()
   raycaster = new THREE.Raycaster()
   intersected: THREE.Mesh | null = null

   constructor(
      pane = true,
      { controls = true, fov = 70, clearColor = 0x333333, mouse = true, rendererAlpha = true } = {}
   ) {
      super(pane, { controls, fov, clearColor, mouse, rendererAlpha })

      this.camera.position.z = 200
      this.camera.far = 3000

      if (this.controls) this.controls.autoRotate = true

      this.dirLight()
      this.createObjects()
      // this.lensFlares()

      this.addToDom()
      this.animate()
   }

   lensFlares() {
      const loader = new THREE.TextureLoader()
      const textureFlare0 = loader.load('/lensflare0.png')

      const light = new THREE.PointLight(0xffffff, 1, 2000)
      light.color.setHSL(0.55, 0.9, 0.5)
      light.position.set(0, 0, -100)
      this.scene.add(light)

      const lensflare = new Lensflare()
      lensflare.addElement(new LensflareElement(textureFlare0, 600, 0, light.color))
      lensflare.addElement(new LensflareElement(textureFlare0, 30, 0.2))
      light.add(lensflare)
   }

   createObjects() {
      for (let i = 0; i < 100; i++) {
         let object = new THREE.Mesh(this.geo, new THREE.MeshLambertMaterial({ color: 0x646cff }))

         object.position.x = Math.random() * 200 - 100
         object.position.y = Math.random() * 200 - 100
         object.position.z = Math.random() * 200 - 100

         object.rotation.x = Math.random() * 2 * Math.PI
         object.rotation.y = Math.random() * 2 * Math.PI
         object.rotation.z = Math.random() * 2 * Math.PI

         // object.scale.x = Math.random() + 0.5
         // object.scale.y = Math.random() + 0.5
         // object.scale.z = Math.random() + 0.5

         this.scene.add(object)
      }
   }

   render() {
      if (this.controls) this.controls.update()
      this.checkIntersects()

      this.renderer.render(this.scene, this.camera)
   }

   checkIntersects() {
      this.raycaster.setFromCamera(this.pointer, this.camera)
      const intersects = this.raycaster.intersectObjects(this.scene.children)

      if (intersects.length > 0) {
         let obj = intersects[0].object
         if (this.intersected === obj) return

         this.resetIntersected()
         if (obj instanceof THREE.Mesh) this.setIntersected(obj)
      } else {
         this.resetIntersected()
      }
   }

   setIntersected(obj: THREE.Mesh) {
      let material = obj.material
      if (material instanceof THREE.MeshLambertMaterial) {
         material.emissive.setHex(0xff0000)
      }
      this.intersected = obj
   }

   resetIntersected() {
      if (!this.intersected) return
      let material = this.intersected.material
      if (material instanceof THREE.MeshLambertMaterial) {
         material.emissive.setHex(0x000000)
      }
      this.intersected = null
   }
}

new RayScene()
