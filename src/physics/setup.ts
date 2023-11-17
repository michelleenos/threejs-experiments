import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import GUI from 'lil-gui'

export const hexColors = ['#00ffc8', '#ff5e00', '#ff009d', '#ff00f2', '#5900ff']
export const colors = hexColors.map((c) => new THREE.Color(c))

export const setup = () => {
   const sizes = new THREE.Vector2(window.innerWidth, window.innerHeight)

   const scene = new THREE.Scene()

   const renderer = new THREE.WebGLRenderer({ antialias: true })
   renderer.shadowMap.enabled = true
   renderer.shadowMap.type = THREE.PCFSoftShadowMap
   renderer.setSize(sizes.x, sizes.y)
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
   document.body.appendChild(renderer.domElement)

   scene.fog = new THREE.Fog('#262837', 20, 100)
   renderer.setClearColor(scene.fog.color)

   const camera = new THREE.PerspectiveCamera(75, sizes.x / sizes.y, 0.1, 100)
   camera.position.set(-5, 6, 12)
   scene.add(camera)

   const controls = new OrbitControls(camera, renderer.domElement)
   const clock = new THREE.Clock()

   const stats = new Stats()
   document.body.appendChild(stats.dom)

   const resize = () => {
      sizes.set(window.innerWidth, window.innerHeight)
      camera.aspect = sizes.x / sizes.y
      camera.updateProjectionMatrix()
      renderer.setSize(sizes.x, sizes.y)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
   }

   return { sizes, scene, renderer, camera, controls, clock, stats, resize }
}

export type LightParams = { intensity?: number; color?: THREE.ColorRepresentation }

export const makeLights = (
   scene: THREE.Scene,
   ambientLightParams: LightParams = {},
   directionalLightParams: LightParams = {}
) => {
   const ambientLight = new THREE.AmbientLight(
      ambientLightParams.color,
      ambientLightParams.intensity ?? 2
   )
   const directionalLight = new THREE.DirectionalLight(
      directionalLightParams.color,
      directionalLightParams.intensity ?? 0.6
   )

   directionalLight.castShadow = true
   directionalLight.shadow.mapSize.set(512, 512)
   directionalLight.shadow.camera.far = 15
   directionalLight.shadow.camera.left = -7
   directionalLight.shadow.camera.top = 7
   directionalLight.shadow.camera.right = 7
   directionalLight.shadow.camera.bottom = -7
   directionalLight.position.set(5, 5, 5)

   scene.add(ambientLight, directionalLight)

   return { ambientLight, directionalLight }
}

export const makeFloor = (
   scene: THREE.Scene,
   color: THREE.ColorRepresentation = 0xffdada,
   size: number = 10
) => {
   const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshStandardMaterial({
         color,
      })
   )
   plane.rotation.x = -Math.PI / 2
   plane.receiveShadow = true
   scene.add(plane)

   return plane
}

export const guiLightFolder = (
   gui: GUI,
   light: THREE.Light,
   params: LightParams,
   name: string,
   position = false
) => {
   let folder = gui.addFolder(name)
   params.intensity &&
      folder.add(params, 'intensity', 0, 4, 0.01).onChange((val: number) => (light.intensity = val))
   params.color &&
      folder
         .addColor(params, 'color')
         .onChange((val: string) => light.color.set(new THREE.Color(val)))

   if (position) {
      let posFolder = folder.addFolder('Position')
      posFolder.add(light.position, 'x', -10, 10)
      posFolder.add(light.position, 'y', -10, 10)
      posFolder.add(light.position, 'z', -10, 10)
      posFolder.onChange(() => light.shadow.camera.updateMatrix())
   }
   return folder
}
