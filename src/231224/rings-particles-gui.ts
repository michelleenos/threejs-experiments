import GUI from 'lil-gui'
import Particles from './SpaceParticles'
import Rings from './Rings'
import * as THREE from 'three'
import { easing } from '~/utils/easings'
import { ringsSceneAssets } from './assets'
import { GuiExtra } from '~/utils/gui-extra'

const { matcaps } = ringsSceneAssets

const blendings = {
    Normal: THREE.NormalBlending,
    Additive: THREE.AdditiveBlending,
    Multiply: THREE.MultiplyBlending,
    Subtractive: THREE.SubtractiveBlending,
}

export function makeParticlesGui(gui: GUI, particles: Particles, name: string) {
    const f = gui.addFolder(name)
    f.add(particles, 'radius', 0, 20)
    f.add(particles, 'opacity', 0, 1)
    f.addColor(particles, 'color')
    f.add(particles, 'size', 0, 500, 1)
    f.add(particles, 'count', 0, 5000)
    f.add(particles, 'spriteName', Object.keys(ringsSceneAssets.sprites))
    f.add(particles, 'blending', blendings)
    f.add(particles, 'speed', 0, 0.2, 0.001)
    f.add(particles, 'movement', 0, 10, 0.01)
    f.add(particles, 'rotateSprite')
    f.add(particles, 'visible')

    const positionFolder = f.addFolder('Position').close()
    positionFolder.add(particles.position, 'x', -20, 20)
    positionFolder.add(particles.position, 'y', -20, 20)
    positionFolder.add(particles.position, 'z', -20, 20)

    f.close()
    return f
}

export function makeRingsGui(gui: GuiExtra, rings: Rings, name: string) {
    const f = gui.addFolder(name)
    f.add(rings, 'speed', 0, 1, 0.01)
    f.add(rings, 'radius', 0, 10)
    f.add(rings, 'opacity', 0, 1)
    f.add(rings, 'thickness', 0, 0.2, 0.001)
    f.add(rings, 'count', 0, 500, 1)
    f.add(rings, 'coverAmt', 0, 1, 0.01)
    f.add(rings, 'scaleFn', ['cos', 'sin', 'cos-sin'])
    f.add(rings, 'posFn', ['cos', 'sin', 'cos-sin'])
    f.add(rings, 'posFnVar', -4, 4, 1)
    f.add(rings, 'scaleFnVar', -4, 4, 1)
    f.add(rings, 'easingShape', Object.keys(easing))
    f.add(rings, 'blending', blendings)
    f.add(rings, 'matcapName', Object.keys(matcaps))
    f.add(rings, 'visible')
    const p = f.addFolder('precision')
    p.add(rings, 'tubularSegments', 3, 100, 1)
    p.add(rings, 'radialSegments', 3, 30, 1)

    f.addVec3(rings, 'rotation', -Math.PI, Math.PI, 0.01).close()
    f.addVec3(rings, 'rotateSpeed', -3, 3, 0.01).close()
    // const rotationFolder = f.addFolder('Rotation').close()
    f.close()

    return f
}
