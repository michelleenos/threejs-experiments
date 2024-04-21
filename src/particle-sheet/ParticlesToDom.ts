import * as THREE from 'three'
import { generatePoints } from '../utils/generate-points-sheet'
import World from '../utils/World'
import Sizes from '../utils/sizes'
import Mouse from '../utils/Mouse'
import { setTargetToCamera } from './face/three-to-dom'

export type PointsData = {
   bounds: {
      xMin: number
      xMax: number
      yMin: number
      yMax: number
   }
   width: number
   height: number
   coords: [number, number][]
}

export type ParticleParams = {
   world: World
   mouse: Mouse
   pointsData: PointsData
   vertexShader: string
   fragmentShader: string
   mouseLerp?: number
   domTarget: HTMLElement
}

export class DomParticles extends THREE.Points {
   world: World
   mouse: Mouse
   sizes: Sizes
   raycaster = new THREE.Raycaster()
   geometry: THREE.BufferGeometry
   material: THREE.ShaderMaterial
   vertexShader: string
   fragmentShader: string
   planeHelper: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
   mouseLerp: number = 0.1
   pointsData: PointsData
   domTarget: HTMLElement

   constructor(opts: ParticleParams) {
      super()
      this.world = opts.world
      this.sizes = opts.world.sizes
      this.mouse = opts.mouse
      this.pointsData = opts.pointsData
      this.vertexShader = opts.vertexShader
      this.fragmentShader = opts.fragmentShader
      this.domTarget = opts.domTarget

      this.geometry = this.createGeometry()
      this.material = this.createMaterial()
      this.planeHelper = this.createHelper()
      this.world.scene.add(this)
      this.world.scene.add(this.planeHelper)

      if (opts.mouseLerp) this.mouseLerp = opts.mouseLerp

      this.sizes.on('resize', this.onResize)
      this.onResize()
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
      let geometry = new THREE.BufferGeometry()
      let positions = new Float32Array(this.pointsData.coords.length * 3)
      this.pointsData.coords.forEach(([x, y], i) => {
         positions[i * 3] = x
         positions[i * 3 + 1] = y
         positions[i * 3 + 2] = 0
      })
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
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
               new THREE.Vector2(this.pointsData.width, this.pointsData.height)
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
         new THREE.PlaneGeometry(this.pointsData.width * 2, this.pointsData.height * 2),
         new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide,
         })
      )
      helper.visible = false
      return helper
   }

   onResize = () => {
      this.material.uniforms.u_res.value = new THREE.Vector2(
         this.sizes.width * this.sizes.pixelRatio,
         this.sizes.height * this.sizes.pixelRatio
      )

      setTargetToCamera({
         object: [this, this.planeHelper],
         target: this.domTarget,
         camera: this.world.camera,
         sizes: this.sizes,
      })
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
