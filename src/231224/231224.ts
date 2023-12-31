import '../style.css'
import * as THREE from 'three'
import Sizes from '../utils/Sizes'
import Timer from '../utils/Timer'
import World from '../utils/World'
import { easing } from '../utils/easings'
import Rings, { ringsFns } from './Rings'
import GUI from 'lil-gui'
import Particles from './SpaceParticles'
import {
   getParticlesPreset,
   getRingsPreset,
   ringsPresets,
   particlesPresets,
   setParticlesFromPreset,
   setRingsFromPreset,
   PresetParticles,
   PresetRings,
} from './presets'

function lerp(start: number, end: number, amt: number) {
   return (1 - amt) * start + amt * end
}

const timer = new Timer()
const sizes = new Sizes()
const world = new World(sizes)
// const mouse = new Mouse(sizes)

const loader = new THREE.TextureLoader()
const textureSmoke1 = loader.load('/stars/smoke_01.png')
const textureSmoke2 = loader.load('/stars/smoke_02.png')
const textureStar1 = loader.load('/stars/star_01.png')
const textureStar2 = loader.load('/stars/star_04.png')
const matcapTexture = loader.load('/matcaps/blueish.png')

// ***** Init Particles ***** //
const particlesSmoke1 = new Particles(textureSmoke1)
const particlesSmoke2 = new Particles(textureSmoke2)
const particlesStar1 = new Particles(textureStar1)
const particlesStar2 = new Particles(textureStar2)
particlesStar1.rotateSpeed.set(0.001, -0.001, 0)
particlesStar2.rotateSpeed.set(0.0005, 0.0005, 0.0005)

world.scene.add(
   particlesSmoke1.mesh,
   particlesSmoke2.mesh,
   particlesStar1.mesh,
   particlesStar2.mesh
)

/**
 * Rings
 */

const rings = new Rings(world, { matcap: matcapTexture })
const rings2 = new Rings(world, { matcap: matcapTexture })

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

const makeGuiFolderForParticles = (gui: GUI, particles: Particles, name: string) => {
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

const makeGuiFolderForRings = (gui: GUI, rings: Rings, name: string) => {
   const folder = gui.addFolder(name)
   folder.add(rings, 'speed', 0, 4, 0.1)
   folder.add(rings, 'radius', 0, 20)
   folder.add(rings, 'opacity', 0, 1)
   folder.add(rings, 'thickness', 0, 0.5, 0.001)
   folder.add(rings, 'count', 0, 1000, 1)
   folder.add(rings, 'scaleVar', -10, 10, 0.01)
   folder.add(rings, 'coverAmt', 0, 1, 0.01)
   folder.add(rings, 'scaleFn', ringsFns)
   folder.add(rings, 'posFn', ringsFns)
   folder.add(rings, 'easingTime', Object.keys(easing))
   folder.add(rings, 'easingShape', Object.keys(easing))
   folder.add(rings, 'blending', {
      Normal: THREE.NormalBlending,
      Additive: THREE.AdditiveBlending,
   })
   folder.add(rings, 'visible')
   const rotationFolder = folder.addFolder('Rotation').close()
   rotationFolder.add(rings.initRotation, 'x', -Math.PI, Math.PI, 0.01)
   rotationFolder.add(rings.initRotation, 'y', -Math.PI, Math.PI, 0.01)
   rotationFolder.add(rings.initRotation, 'z', -Math.PI, Math.PI, 0.01)
   rotationFolder.add(rings.rotateSpeed, 'x', -0.02, 0.02, 0.0001).name('speed x')
   rotationFolder.add(rings.rotateSpeed, 'y', -0.02, 0.02, 0.0001).name('speed y')
   rotationFolder.add(rings.rotateSpeed, 'z', -0.02, 0.02, 0.0001).name('speed z')
   folder.close()
}

export const getPresetRings: () => PresetRings[] = () => [
   getRingsPreset(rings),
   getRingsPreset(rings2),
]

export const getPresetParticles: () => PresetParticles[] = () => [
   getParticlesPreset(particlesSmoke1),
   getParticlesPreset(particlesSmoke2),
   getParticlesPreset(particlesStar1),
   getParticlesPreset(particlesStar2),
]

const usePresetParticles = (preset: PresetParticles[], gui?: GUI) => {
   setParticlesFromPreset(particlesSmoke1, preset[0])
   setParticlesFromPreset(particlesSmoke2, preset[1])
   setParticlesFromPreset(particlesStar1, preset[2])
   setParticlesFromPreset(particlesStar2, preset[3])
   gui && gui.controllersRecursive().forEach((c) => c.updateDisplay())
}

const usePresetRings = (preset: PresetRings[], gui?: GUI) => {
   setRingsFromPreset(rings, preset[0])
   setRingsFromPreset(rings2, preset[1])
   gui && gui.controllersRecursive().forEach((c) => c.updateDisplay())
}

const gui = new GUI()
makeGuiFolderForParticles(gui, particlesSmoke1, 'Smoke 1')
makeGuiFolderForParticles(gui, particlesSmoke2, 'Smoke 2')
makeGuiFolderForParticles(gui, particlesStar1, 'Star 1')
makeGuiFolderForParticles(gui, particlesStar2, 'Star 2')
makeGuiFolderForRings(gui, rings, 'Rings 1')
makeGuiFolderForRings(gui, rings2, 'Rings 2')
// gui.add(afterimagePass.uniforms.damp, 'value', 0, 1, 0.01).name('damp')

const guiObj = {
   copyPresetRings: () => navigator.clipboard.writeText(JSON.stringify(getPresetRings(), null, 2)),
   copyPresetParticles: () =>
      navigator.clipboard.writeText(JSON.stringify(getPresetParticles(), null, 2)),
   particlesPreset: 0,
   ringsPreset: 0,
}

gui.add(guiObj, 'copyPresetRings')
gui.add(guiObj, 'copyPresetParticles')
gui.add(guiObj, 'ringsPreset', Object.keys(ringsPresets)).onChange(() => {
   const ringsPreset = ringsPresets[guiObj.ringsPreset]
   usePresetRings(ringsPreset, gui)
})
gui.add(guiObj, 'particlesPreset', Object.keys(particlesPresets)).onChange(() => {
   const particlesPreset = particlesPresets[guiObj.particlesPreset]
   usePresetParticles(particlesPreset, gui)
})

gui.add(world.renderer, 'toneMappingExposure', 0, 10, 0.5).name('Exposure')
gui.add(world.renderer, 'toneMapping', {
   None: THREE.NoToneMapping,
   Linear: THREE.LinearToneMapping,
   Reinhard: THREE.ReinhardToneMapping,
   Cineon: THREE.CineonToneMapping,
   ACESFilmic: THREE.ACESFilmicToneMapping,
}).name('Tone Mapping')

usePresetParticles(particlesPresets[guiObj.particlesPreset])
usePresetRings(ringsPresets[guiObj.ringsPreset])

// world.renderer.toneMapping = THREE.ACESFilmicToneMapping
// world.renderer.toneMappingExposure = 3

/**
 * Animate
 */

function animate() {
   rings.update(timer.elapsed)
   rings2.update(timer.elapsed)

   particlesSmoke1.update()
   particlesSmoke2.update()
   particlesStar1.update()
   particlesStar2.update()

   // let newCamX = mouse.x * 5
   // let newCamY = mouse.y * 5
   // let newCamZ = 10 + mouse.y * 3
   // world.camera.position.x = lerp(world.camera.position.x, newCamX, 0.05)
   // world.camera.position.y = lerp(world.camera.position.y, newCamY, 0.05)
   // world.camera.position.z = lerp(world.camera.position.z, newCamZ, 0.05)
   // world.camera.lookAt(0, 0, 0)

   world.render()
}

timer.on('tick', animate)
