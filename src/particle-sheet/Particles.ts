import * as THREE from 'three'
import { generatePoints } from '../utils/generate-points-sheet'
import World from '../utils/World'
import Sizes from '../utils/sizes'
import Mouse from '../utils/Mouse'

export type ParticleSheetParams = {
   sheetWidth: number
   sheetHeight: number
   nx: number
   ny: number
   scale?: THREE.Vector3
}

export type ParticleParams = {
   world: World
   mouse: Mouse
   sheetParams: ParticleSheetParams
   vertexShader: string
   fragmentShader: string
   mouseLerp?: number
}

export class Particles extends THREE.Points {
   world: World
   mouse: Mouse
   sizes: Sizes
   raycaster = new THREE.Raycaster()
   geometry: THREE.BufferGeometry
   material: THREE.ShaderMaterial
   vertexShader: string
   fragmentShader: string
   planeHelper: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
   params: ParticleSheetParams
   mouseLerp: number = 0.1

   constructor(opts: ParticleParams) {
      super()
      this.world = opts.world
      this.sizes = opts.world.sizes
      this.mouse = opts.mouse
      this.params = opts.sheetParams
      this.vertexShader = opts.vertexShader
      this.fragmentShader = opts.fragmentShader

      this.geometry = this.createGeometry()
      this.material = this.createMaterial()
      this.planeHelper = this.createHelper()
      this.world.scene.add(this)

      if (this.params.scale) {
         this.scale.copy(this.params.scale)
      }

      if (opts.mouseLerp) this.mouseLerp = opts.mouseLerp
   }

   raycast = () => {
      this.raycaster.setFromCamera(this.mouse.pos, this.world.camera)
      const intersects = this.raycaster.intersectObjects([this.planeHelper])
      if (intersects[0] && intersects[0].uv) {
         const uvPoints = new THREE.Vector2().copy(intersects[0].uv)
         uvPoints.multiplyScalar(2)
         uvPoints.addScalar(-0.5)
         this.material.uniforms.u_mouse.value.lerp(uvPoints, this.mouseLerp)
      }
   }

   createGeometry = () => {
      const { positions, scales, uvs } = generatePoints(
         this.params.sheetWidth,
         this.params.sheetHeight,
         this.params.nx,
         this.params.ny
      )

      let geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))
      geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
      return geometry
   }

   setUniforms = (uniforms: { [key: string]: THREE.Uniform }) => {
      this.material.uniforms = {
         ...this.material.uniforms,
         ...uniforms,
      }
   }

   createMaterial = () => {
      let material = new THREE.ShaderMaterial({
         uniforms: {
            u_time: { value: 0 },
            u_mouse: new THREE.Uniform(new THREE.Vector2(0.5, 0.5)),
            u_res: new THREE.Uniform(
               new THREE.Vector2(
                  this.sizes.width * this.sizes.pixelRatio,
                  this.sizes.height * this.sizes.pixelRatio
               )
            ),
            u_planeRes: new THREE.Uniform(
               new THREE.Vector2(this.params.sheetWidth, this.params.sheetHeight)
            ),
         },
         vertexShader: this.vertexShader,
         fragmentShader: this.fragmentShader,
         transparent: true,
         depthWrite: false,
      })
      return material
   }

   createHelper = () => {
      let helper = new THREE.Mesh(
         new THREE.PlaneGeometry(this.params.sheetWidth * 2, this.params.sheetHeight * 2),
         new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide,
         })
      )
      helper.visible = true
      return helper
   }

   dispose = () => {
      this.world.scene.remove(this)
      this.geometry.dispose()
      this.material.dispose()

      if (this.planeHelper) {
         this.world.scene.remove(this.planeHelper)
         this.planeHelper.geometry.dispose()
         this.planeHelper.material.dispose()
      }
   }

   update = (time: number) => {
      this.raycast()
      this.material.uniforms.u_time.value = time
   }
}
