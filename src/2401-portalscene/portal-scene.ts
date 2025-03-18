import '../style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import World from '../utils/World'
import Sizes from '../utils/Sizes'
import GUI from 'lil-gui'
import portalVertex from './glsl/portal/vertex.glsl'
import portalFragment from './glsl/portal/fragment.glsl'
import Loader from '../utils/loading-overlay'
import Fireflies from './Fireflies'

THREE.ColorManagement.enabled = true

const sizes = new Sizes()
const world = new World(sizes)
const clock = new THREE.Clock()
const gui = new GUI()

world.camera.near = 0.1
world.camera.far = 100
world.camera.position.set(-0.7, 2, -3.5)
world.camera.updateProjectionMatrix()
world.renderer.outputColorSpace = THREE.SRGBColorSpace

if (world.controls) {
    world.controls.minPolarAngle = 0
    world.controls.maxPolarAngle = Math.PI / 2 - 0.1
    world.controls.maxDistance = 20
    world.controls.minDistance = 1
}

/**
 * Loaders
 */

const loader = new Loader()

const textureLoader = new THREE.TextureLoader(loader.manager)
const gltfLoader = new GLTFLoader(loader.manager)

/**
 * Textures & Materials
 */

const baseUrl = import.meta.env.DEV ? '' : import.meta.env.BASE_URL
const bakedTexture = textureLoader.load(baseUrl + '/scenes/portal/baked.jpg')
bakedTexture.flipY = false
bakedTexture.colorSpace = THREE.SRGBColorSpace
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

const poleLightMaterial = new THREE.MeshBasicMaterial({ color: '#ffe3d1' })
const portalLightMaterial = new THREE.ShaderMaterial({
    vertexShader: portalVertex,
    fragmentShader: portalFragment,
    uniforms: {
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color('#ffbdc2') },
        uColorEnd: { value: new THREE.Color('#fffaff') },
        uSpiralTightness: { value: 0.45 },
        uWaveSpeed: { value: 0.2 },
        uSpiralSpeed: { value: 0.45 },
        uBlur: { value: 0.43 },
        uGlowStart: { value: 0.29 },
        uGlowEnd: { value: 0.95 },
        uDiv: { value: 0.34 },
    },
})

/**
 * Fireflies
 */

const fireflies = new Fireflies(world)

/**
 * Model
 */
gltfLoader.load(baseUrl + '/scenes/portal/portal-merged.glb', (gltf) => {
    const portalScene = gltf.scene

    portalScene.traverse((child) => {
        child instanceof THREE.Mesh && (child.material = bakedMaterial)
    })

    const poleLightAMesh = portalScene.children.find((child) => child.name === 'poleLightA')
    const poleLightBMesh = portalScene.children.find((child) => child.name === 'poleLightB')
    const portalLightMesh = portalScene.children.find((child) => child.name === 'portalLight')

    poleLightAMesh instanceof THREE.Mesh && (poleLightAMesh.material = poleLightMaterial)
    poleLightBMesh instanceof THREE.Mesh && (poleLightBMesh.material = poleLightMaterial)
    portalLightMesh instanceof THREE.Mesh && (portalLightMesh.material = portalLightMaterial)

    world.scene.add(portalScene)
})

/**
 * GUI
 */

const debg = {
    poleLightColor: poleLightMaterial.color.getHexString(),
    clearColor: '#160e14',
    portalColorStart: portalLightMaterial.uniforms.uColorStart.value.getHexString(),
    portalColorEnd: portalLightMaterial.uniforms.uColorEnd.value.getHexString(),
}
world.renderer.setClearColor(debg.clearColor)
gui.addColor(debg, 'clearColor').onChange((val: string) => {
    world.renderer.setClearColor(val)
})
gui.add(fireflies.material.uniforms.uSize, 'value', 0, 500, 1).name('firefliesSize')
gui.addColor(debg, 'poleLightColor').onChange((val: string) => {
    poleLightMaterial.color.set(val)
})

let portalFolder = gui.addFolder('portal')

portalFolder.addColor(debg, 'portalColorStart').onChange((val: string) => {
    portalLightMaterial.uniforms.uColorStart.value.set(val)
})
portalFolder.addColor(debg, 'portalColorEnd').onChange((val: string) => {
    portalLightMaterial.uniforms.uColorEnd.value.set(val)
})

portalFolder
    .add(portalLightMaterial.uniforms.uSpiralTightness, 'value', 0, 1, 0.01)
    .name('spiralTightness')
portalFolder.add(portalLightMaterial.uniforms.uWaveSpeed, 'value', 0, 2, 0.01).name('waveSpeed')
portalFolder.add(portalLightMaterial.uniforms.uSpiralSpeed, 'value', 0, 2, 0.01).name('spiralSpeed')
portalFolder.add(portalLightMaterial.uniforms.uBlur, 'value', 0, 1, 0.01).name('blur')
portalFolder.add(portalLightMaterial.uniforms.uGlowStart, 'value', 0, 1, 0.01).name('glowStart')
portalFolder.add(portalLightMaterial.uniforms.uGlowEnd, 'value', 0, 1, 0.01).name('glowEnd')
portalFolder.add(portalLightMaterial.uniforms.uDiv, 'value', 0.01, 1, 0.01).name('div')

gui.close()

const animate = () => {
    const time = clock.getElapsedTime()

    portalLightMaterial.uniforms.uTime.value = time
    fireflies.tick(time)
    world.render()

    window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)
