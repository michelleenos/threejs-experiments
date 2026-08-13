import GUI from 'lil-gui'
import * as THREE from 'three'
import { GuiExtra } from '~/utils/gui-extra'
import '../style.css'
import Sizes from '../utils/sizes'
import Timer from '../utils/timer'
import World from '../utils/World'
import Rings, { RingsOpts } from './Rings'
import Particles from './SpaceParticles'
import {
    getParticlesPreset,
    particlesPresets,
    PresetParticles,
    setParticlesFromPreset,
} from './particles-presets'
import { makeParticlesGui, makeRingsGui } from './rings-particles-gui'
import {
    getRingsPreset,
    ringsPresets,
    setRingsFromPreset,
} from './rings-presets'

THREE.ColorManagement.enabled = true
const timer = new Timer()
const sizes = new Sizes()
const world = new World(sizes, { controls: true })
// const mouse = new Mouse(sizes)

// ***** Initialize ***** //

const particles = [
    new Particles({ spriteName: 'smoke01' }, 'smoke1'),
    new Particles({ spriteName: 'smoke02' }, 'smoke2'),
    new Particles({ spriteName: 'star01' }, 'star1'),
    new Particles({ spriteName: 'star04' }, 'star2'),
]

const rings = [new Rings(), new Rings()]
world.scene.add(...particles, ...rings)

/**
 * Other World Stuff
 */

const fog = new THREE.Fog('#120b45', 0, 20)
// world.scene.fog = fog
world.camera.position.set(0, 0, 10)
// world.controls!.maxDistance = 50
// world.controls!.enablePan = false
// world.renderer.toneMapping = THREE.ACESFilmicToneMapping
// world.renderer.toneMappingExposure = 3

/**
 * GUI
 */

export const getAllPresetRings: () => RingsOpts[] = () =>
    rings.map((r) => getRingsPreset(r))

export const getAllPresetParticles: () => PresetParticles[] = () =>
    particles.map((p) => getParticlesPreset(p))

const usePresetParticles = (preset: PresetParticles[], gui?: GUI) => {
    preset.forEach((p, i) => {
        if (particles[i]) setParticlesFromPreset(particles[i], p)
    })
    requestAnimationFrame(
        () =>
            gui && gui.controllersRecursive().forEach((c) => c.updateDisplay()),
    )
}

const usePresetRings = (preset: RingsOpts[], gui?: GUI) => {
    preset.forEach((p, i) => {
        if (rings[i]) setRingsFromPreset(rings[i], p)
    })
    requestAnimationFrame(
        () =>
            gui && gui.controllersRecursive().forEach((c) => c.updateDisplay()),
    )
}

const copyJson = (json: any) =>
    navigator.clipboard.writeText(JSON.stringify(json, null, 2))

function buildGui() {
    const guiObj = {
        copyRingsPreset: () => copyJson(getAllPresetRings()),
        copyParticlesPreset: () => copyJson(getAllPresetParticles()),
        particlesPreset: 0,
        ringsPreset: 3,
    }

    const gui = new GuiExtra()
    const presetsFold = gui.addFolder('presets')
    presetsFold.add(guiObj, 'copyRingsPreset')
    presetsFold.add(guiObj, 'copyParticlesPreset')
    presetsFold
        .add(guiObj, 'ringsPreset', Object.keys(ringsPresets))
        .onChange(() => {
            const ringsPreset = ringsPresets[guiObj.ringsPreset]
            usePresetRings(ringsPreset, gui)
        })
    presetsFold
        .add(guiObj, 'particlesPreset', Object.keys(particlesPresets))
        .onChange(() => {
            const particlesPreset = particlesPresets[guiObj.particlesPreset]
            usePresetParticles(particlesPreset, gui)
        })
    const particlesGui = gui.addFolder('particles')
    particles.forEach((p) => makeParticlesGui(particlesGui, p, p.name))
    const ringsGui = gui.addFolder('rings')
    rings.forEach((r, i) => makeRingsGui(ringsGui, r, `Rings ${i}`))

    const rFold = gui.addFolder('scene/rendering')
    rFold.add(world.renderer, 'toneMappingExposure', 0, 10, 0.5)
    rFold
        .add(world.renderer, 'toneMapping', {
            None: THREE.NoToneMapping,
            Linear: THREE.LinearToneMapping,
            Reinhard: THREE.ReinhardToneMapping,
            Cineon: THREE.CineonToneMapping,
            ACESFilmic: THREE.ACESFilmicToneMapping,
        })
        .name('Tone Mapping')

    const debg = {
        fogColor: fog.color.getStyle(),
        fogEnabled: false,
    }

    rFold
        .addColor(debg, 'fogColor')
        .onChange((c: string) => fog.color.setStyle(c))
    rFold.add(fog, 'near', 0, 50, 1).name('fog near')
    rFold.add(fog, 'far', 0, 200, 1).name('fog far')
    rFold.add(debg, 'fogEnabled').onChange((v: boolean) => {
        v ? (world.scene.fog = fog) : (world.scene.fog = null)
    })

    const cf = gui.addFolder('camera')
    cf.addVec3(world.camera, 'position').listen().decimals(3)

    usePresetParticles(particlesPresets[guiObj.particlesPreset], gui)
    usePresetRings(ringsPresets[guiObj.ringsPreset], gui)
    return gui
}

buildGui()

/**
 * Animate
 */

function animate() {
    const time = timer.elapsed
    rings.forEach((r) => r.update(time))
    particles.forEach((p) => p.update(time))
    world.render()
}

timer.on('tick', animate)
