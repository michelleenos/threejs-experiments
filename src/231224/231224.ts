import '../style.css'
import * as THREE from 'three'
import Sizes from '../utils/Sizes'
import Timer from '../utils/Timer'
import World from '../utils/World'
import { fract, map } from '../utils'
import { IEasingMap, TEasing, easing } from '../utils/easings'
import GUI from 'lil-gui'

const timer = new Timer()
const sizes = new Sizes()
const world = new World(sizes)

const loader = new THREE.TextureLoader()
const textureSmoke1 = loader.load('/stars/smoke_01.png')
const textureSmoke2 = loader.load('/stars/smoke_02.png')
const textureStar1 = loader.load('/stars/star_01.png')
const matcapTexture = loader.load('/matcaps/blueish.png')

// Lights
const ambientLight = new THREE.AmbientLight('#d1ecff', 2)
const directionalLight = new THREE.DirectionalLight('#fff', 10)
world.scene.add(ambientLight, directionalLight)

/**
 * Particles
 */

type ParticlesOpts = {
   count?: number
   size?: number
   color?: string
   opacity?: number
   radius?: number
}

class Particles {
   geometry: THREE.BufferGeometry
   positions!: Float32Array
   material: THREE.PointsMaterial
   mesh: THREE.Points
   _count: number
   texture: THREE.Texture
   _color: THREE.Color
   _size: number
   _opacity: number
   _radius: number
   rotateSpeed: THREE.Vector3

   constructor(
      texture: THREE.Texture,
      { count = 100, size = 1, opacity = 0.5, color = '#fff', radius = 10 }: ParticlesOpts
   ) {
      this.texture = texture
      this._count = count
      this._size = size
      this._color = new THREE.Color(color)
      this._opacity = opacity
      this._radius = radius
      this.rotateSpeed = new THREE.Vector3(-0.0001, 0.0001, 0.0)

      this.geometry = new THREE.BufferGeometry()
      // this.positions = new Float32Array(this._count * 3)

      this.setPositions()

      this.material = new THREE.PointsMaterial()
      this.setupMaterial()
      this.mesh = new THREE.Points(this.geometry, this.material)
   }

   get radius() {
      return this._radius
   }

   set radius(value: number) {
      this._radius = value
      this.setPositions()
   }

   get opacity() {
      return this._opacity
   }

   set opacity(value: number) {
      this._opacity = value
      this.setupMaterial()
   }

   get color() {
      return this._color
   }

   set color(value: string | number | THREE.Color) {
      this._color.set(value)
      this.setupMaterial()
   }

   get size() {
      return this._size
   }

   set size(value: number) {
      this._size = value
      this.setupMaterial()
   }

   get count() {
      return this._count
   }

   set count(value: number) {
      this._count = value
      this.setPositions()
   }

   getPointInSphere() {
      let d, x, y, z
      // https://karthikkaranth.me/blog/generating-random-points-in-a-sphere/
      do {
         x = Math.random() * 2 - 1
         y = Math.random() * 2 - 1
         z = Math.random() * 2 - 1
         d = x * x + y * y + z * z
      } while (d > 1)
      return { x, y, z }
   }

   setPositions() {
      this.positions = new Float32Array(this._count * 3)
      for (let i = 0; i < this._count; i++) {
         let point = this.getPointInSphere()
         this.positions[i * 3 + 0] = point.x * this._radius
         this.positions[i * 3 + 1] = point.y * this._radius
         this.positions[i * 3 + 2] = point.z * this._radius
      }
      this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
   }

   setupMaterial() {
      this.material.size = this._size
      this.material.opacity = this._opacity
      this.material.sizeAttenuation = true
      this.material.depthWrite = false
      this.material.transparent = true
      this.material.alphaMap = this.texture

      this.material.blending = THREE.AdditiveBlending
      this.material.color = this._color

      this.material.needsUpdate = true
   }

   update() {
      this.mesh.rotateX(this.rotateSpeed.x)
      this.mesh.rotateY(this.rotateSpeed.y)
      this.mesh.rotateZ(this.rotateSpeed.z)
   }
}

// ***** Init Particles ***** //

const particlesSmoke1 = new Particles(textureSmoke1, {
   count: 50,
   size: 10,
   color: '#4f2f63',
   opacity: 0.3,
})
const particlesSmoke2 = new Particles(textureSmoke2, {
   count: 50,
   size: 10,
   color: '#aaddff',
   opacity: 0.3,
})
particlesSmoke2.rotateSpeed.x = -0.0001
particlesSmoke2.rotateSpeed.z = -0.00018
particlesSmoke2.color = 999
const particlesStar1 = new Particles(textureStar1, {
   count: 599,
   size: 0.1,
   opacity: 1,
   color: '#fff',
   radius: 14,
})
particlesStar1.mesh.position.set(0, 0, -10)
particlesStar1.rotateSpeed.set(0, 0, 0)

world.scene.add(particlesSmoke1.mesh, particlesSmoke2.mesh, particlesStar1.mesh)

/**
 * Rings
 */

type RingsFn = (pos: number, d?: number) => number
const ringsFns: RingsFn[] = [
   (pos: number) => Math.cos(pos * 2),
   (pos: number) => Math.sin(pos * 2),
   (pos: number) => Math.sin(pos),
   (pos: number) => Math.cos(pos),
   (pos: number, d: number = 0.2) => Math.cos(Math.sin(pos) * d),
]

type RingsOpts = {
   count?: number
   space?: number
   thickness?: number
   radius?: number
   opacity?: number
   easing?: keyof typeof easing
   scaleFn?: RingsFn
   posFn?: RingsFn
   rotateSpeed?: THREE.Vector3
}

class Rings {
   meshes: THREE.Mesh[] = []
   scaleFn: RingsFn = ringsFns[0]
   posFn: RingsFn = ringsFns[2]
   maxSpace: number
   easing: keyof typeof easing
   material: THREE.MeshMatcapMaterial
   group: THREE.Group
   rotateSpeed: THREE.Vector3
   _opacity: number = 0.5
   _space = 0.03
   _thickness = 0.02
   _count = 30
   _radius = 4
   scaleVar = 2

   constructor({
      count = 30,
      space = 0.03,
      thickness = 0.02,
      radius = 4,
      opacity = 0.5,
      easing = 'inOutCubic',
      scaleFn = ringsFns[0],
      posFn = ringsFns[2],
      rotateSpeed = new THREE.Vector3(0, 0, 0),
   }: RingsOpts = {}) {
      this._count = count
      this._space = space
      this._thickness = thickness
      this._radius = radius
      this._opacity = opacity
      this.scaleFn = scaleFn
      this.posFn = posFn
      this.rotateSpeed = rotateSpeed

      this.maxSpace = this._space * this.count
      this.easing = easing

      this.group = new THREE.Group()

      this.material = new THREE.MeshMatcapMaterial({
         color: '#fff',
         matcap: matcapTexture,
         transparent: true,
         side: THREE.DoubleSide,
         opacity: this.opacity,
         blending: THREE.AdditiveBlending,
      })
      this.setupMeshes()
   }

   get opacity() {
      return this._opacity
   }

   set opacity(value: number) {
      this._opacity = value
      this.material.opacity = value
   }

   get space() {
      return this._space
   }

   set space(value: number) {
      this._space = value
      this.maxSpace = this._space * this.count
   }

   get radius() {
      return this._radius
   }

   set radius(value: number) {
      this._radius = value
      this.setupMeshes()
   }

   get count() {
      return this._count
   }

   set count(value: number) {
      this._count = value
      this.setupMeshes()
   }

   get thickness() {
      return this._thickness
   }

   set thickness(value: number) {
      this._thickness = value
      this.setupMeshes()
   }

   setupMeshes() {
      if (this.meshes.length > 0) {
         this.meshes.forEach((mesh) => {
            world.scene.remove(mesh)
            this.group.remove(mesh)
            mesh.geometry.dispose()
         })
      }

      this.meshes = []

      for (let i = 0; i < this._count; i++) {
         const geometry = new THREE.TorusGeometry(this._radius, this._thickness, 20, 100)
         const mesh = new THREE.Mesh(geometry, this.material)
         mesh.rotateX(Math.PI / 2)
         this.meshes.push(mesh)
      }

      this.group.add(...this.meshes)
      world.scene.add(this.group)
   }

   setColors() {
      this.meshes.forEach((mesh, i) => {
         const step = i / this._count
         const positions = mesh.geometry.attributes.position as THREE.BufferAttribute
         const count = positions.count
         let colors = []
         let color = new THREE.Color()

         for (let j = 0; j < count; j++) {
            let y = positions.getY(j)

            // let r = map(x, this.radius * -1, this.radius, step, 1)
            let r = step
            let g = map(y, this._radius * -1, this._radius, 0, 1)

            color.setRGB(r, g, 1 - step)
            colors.push(color.r, color.g, color.b)
         }

         mesh.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
      })
   }

   update(time: number) {
      time *= 0.0001

      const a = map(fract(time), 0, 1, -1, 1)

      this.meshes.forEach((mesh, i) => {
         const spaceVal = easing[this.easing](i / this.count) * this.maxSpace
         const pos = ((spaceVal + a) * Math.PI) % (Math.PI * 2)

         mesh.position.y = this.posFn(pos) * this.radius

         // const scale = map(Math.cos(Math.sin(pos) * i * 0.5), -1, 1, 0.1, 1)
         const scale = map(this.scaleFn(pos, this.scaleVar), -1, 1, 0.1, 1)
         mesh.scale.set(scale, scale, scale)
      })

      this.group.rotateX(this.rotateSpeed.x)
      this.group.rotateY(this.rotateSpeed.y)
      this.group.rotateZ(this.rotateSpeed.z)
   }
}

const rings = new Rings({
   count: 100,
   space: 0.015,
   thickness: 0.02,
   radius: 3,
   easing: 'inSine',
   posFn: ringsFns[3],
})
const rings2 = new Rings({
   count: 30,
   space: 0.01,
   radius: 6,
})

// world.scene.add(groupRings1, groupRings2)

/**
 * Helpers
 */

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
// world.scene.add(directionalLightHelper)

/**
 * Other World Stuff
 */

world.camera.position.set(0, 0, 10)
world.controls.maxDistance = 50
world.controls.enablePan = false
world.scene.fog = new THREE.Fog('#120b45', 0, 20)

/**
 * GUI
 */

const gui = new GUI()

const makeGuiFolderForParticles = (particles: Particles, name: string) => {
   const folder = gui.addFolder(name)
   folder.add(particles, 'radius', 0, 20)
   folder.add(particles, 'opacity', 0, 1)
   folder.addColor(particles, 'color')
   folder.add(particles, 'size', 0, 20)
   folder.add(particles, 'count', 0, 5000)

   const rotateFolder = folder.addFolder('Rotate Speed').close()
   rotateFolder.add(particles.rotateSpeed, 'x', -0.02, 0.02, 0.0001)
   rotateFolder.add(particles.rotateSpeed, 'y', -0.02, 0.02, 0.0001)
   rotateFolder.add(particles.rotateSpeed, 'z', -0.02, 0.02, 0.0001)

   const positionFolder = folder.addFolder('Position').close()
   positionFolder.add(particles.mesh.position, 'x', -20, 20)
   positionFolder.add(particles.mesh.position, 'y', -20, 20)
   positionFolder.add(particles.mesh.position, 'z', -20, 20)

   folder.close()
}

const makeGuiFolderForRings = (rings: Rings, name: string) => {
   const folder = gui.addFolder(name)
   folder.add(rings, 'radius', 0, 20)
   folder.add(rings, 'opacity', 0, 1)
   folder.add(rings, 'thickness', 0, 1)
   folder.add(rings, 'count', 0, 1000, 1)
   folder.add(rings, 'space', 0, 0.5)
   folder.add(rings, 'scaleVar', -10, 10, 0.01)
   folder.add(rings, 'scaleFn', ringsFns)
   folder.add(rings, 'posFn', ringsFns)
   folder.add(rings, 'easing', Object.keys(easing))
   const rotateSpeedFolder = folder.addFolder('Rotate Speed').close()
   rotateSpeedFolder.add(rings.rotateSpeed, 'x', -0.02, 0.02, 0.0001)
   rotateSpeedFolder.add(rings.rotateSpeed, 'y', -0.02, 0.02, 0.0001)
   rotateSpeedFolder.add(rings.rotateSpeed, 'z', -0.02, 0.02, 0.0001)
   folder.close()
}

makeGuiFolderForParticles(particlesSmoke1, 'Smoke 1')
makeGuiFolderForParticles(particlesSmoke2, 'Smoke 2')
makeGuiFolderForParticles(particlesStar1, 'Star 1')

makeGuiFolderForRings(rings, 'Rings 1')
makeGuiFolderForRings(rings2, 'Rings 2')

/**
 * Animate
 */

function animate() {
   rings.update(timer.elapsed)
   rings2.update(timer.elapsed)

   // groupRings1.rotateY(0.01)
   // groupRings1.rotateZ(0.01)

   particlesSmoke1.update()
   particlesSmoke2.update()
   particlesStar1.update()
   world.render()
}

timer.on('tick', animate)
