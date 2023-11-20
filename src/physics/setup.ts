import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import GUI from 'lil-gui'

export const gray = '#262837'
export const hexColors = ['#00ffc8', '#ff5e00', '#ff009d', '#ff00f2', '#5900ff']
export const colors = hexColors.map((c) => new THREE.Color(c))

export const setup = (fogColor = gray) => {
   const sizes = new THREE.Vector2(window.innerWidth, window.innerHeight)

   const scene = new THREE.Scene()

   const renderer = new THREE.WebGLRenderer({ antialias: true })
   renderer.shadowMap.enabled = true
   renderer.shadowMap.type = THREE.PCFSoftShadowMap
   renderer.setSize(sizes.x, sizes.y)
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
   document.body.appendChild(renderer.domElement)

   scene.fog = new THREE.Fog(fogColor, 15, 20)
   renderer.setClearColor(fogColor)

   const camera = new THREE.PerspectiveCamera(75, sizes.x / sizes.y, 0.1, 60)
   camera.lookAt(scene.position)
   scene.add(camera)

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

   return { sizes, scene, renderer, camera, clock, stats, resize }
}

export type LightParams = { intensity?: number; color?: THREE.ColorRepresentation }
export type HemiLightParams = {
   intensity?: number
   color?: THREE.ColorRepresentation
   groundColor?: THREE.ColorRepresentation
}

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

   // const hemisphereLight = new THREE.HemisphereLight(
   //    hemiLightParams.color ?? 0xff0000, // sky color
   //    hemiLightParams.groundColor ?? 0x0000ff, // ground color
   //    hemiLightParams.intensity ?? 1 // intensity
   // )

   directionalLight.castShadow = true
   directionalLight.shadow.mapSize.set(512, 512)
   directionalLight.shadow.camera.far = 30
   directionalLight.shadow.camera.left = -16
   directionalLight.shadow.camera.top = 10
   directionalLight.shadow.camera.right = 16
   directionalLight.shadow.camera.bottom = -10

   directionalLight.position.set(15, 7, 5)

   scene.add(ambientLight, directionalLight)

   return { ambientLight, directionalLight }
}

export const makeFloor = (
   scene: THREE.Scene,
   color: THREE.ColorRepresentation = 0xffdada,
   width: number = 10,
   depth: number = 10
) => {
   const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(width, depth),
      new THREE.MeshStandardMaterial({
         color,
      })
   )
   plane.rotation.x = -Math.PI / 2
   plane.position.y = -2
   plane.receiveShadow = true
   scene.add(plane)

   return plane
}

const isHemisphereLight = (light: THREE.Light): light is THREE.HemisphereLight => {
   return light.hasOwnProperty('isHemisphereLight')
}

export const guiLightFolder = (
   gui: GUI,
   light: THREE.Light,
   params: LightParams | HemiLightParams,
   name: string,
   position = false
) => {
   let folder = gui.addFolder(name)
   folder.close()
   params.intensity &&
      folder.add(params, 'intensity', 0, 4, 0.01).onChange((val: number) => (light.intensity = val))

   params.color &&
      folder
         .addColor(params, 'color')
         .onChange((val: string) => light.color.set(new THREE.Color(val)))

   if (params.hasOwnProperty('groundColor') && isHemisphereLight(light)) {
      folder
         .addColor(params, 'groundColor')
         .onChange((val: string) => light.groundColor.set(new THREE.Color(val)))
   }

   if (position) {
      let posFolder = folder.addFolder('Position')
      posFolder.add(light.position, 'x', -10, 10)
      posFolder.add(light.position, 'y', -10, 10)
      posFolder.add(light.position, 'z', -10, 10)
      posFolder.onChange(() => light.shadow.camera.updateMatrix())
   }
   return folder
}
