import Particles, { particlesDefaults, ParticlesOpts } from './SpaceParticles'

export interface PresetParticles extends ParticlesOpts {}

export const getParticlesPreset = (
    particles: Particles,
): Required<PresetParticles> => ({
    radius: particles.radius,
    opacity: particles.opacity,
    color: particles.color,
    size: particles.size,
    count: particles.count,
    rotateSpeed: particles.rotateSpeed,
    spriteName: particles.spriteName,
    blending: particles.blending,
    position: {
        x: particles.position.x,
        y: particles.position.y,
        z: particles.position.z,
    },
})

export const setParticlesFromPreset = (
    particles: Particles,
    preset: PresetParticles,
) => {
    const opts: Required<PresetParticles> = { ...particlesDefaults, ...preset }
    particles.count = opts.count
    particles.size = opts.size
    particles.color = opts.color
    particles.opacity = opts.opacity
    particles.radius = opts.radius
    particles.spriteName = opts.spriteName
    particles.position.set(opts.position.x, opts.position.y, opts.position.z)
    particles.rotateSpeed.set(
        opts.rotateSpeed.x,
        opts.rotateSpeed.y,
        opts.rotateSpeed.z,
    )
}

export const particlesPresets: PresetParticles[][] = [
    [
        {
            radius: 10,
            opacity: 0.3,
            color: '#4f2f63',
            size: 10,
            count: 50,
            spriteName: 'smoke01',
            rotateSpeed: { x: -0.0001, y: 0.0001, z: 0 },
            position: { x: 0, y: 0, z: 0 },
        },
        {
            radius: 10,
            opacity: 0.3,
            color: '#0003e7',
            spriteName: 'smoke02',
            size: 10,
            count: 50,
            rotateSpeed: { x: -0.0001, y: 0.0001, z: -0.00018 },
            position: { x: 0, y: 0, z: 0 },
        },
        {
            radius: 14,
            opacity: 1,
            color: '#ffffff',
            spriteName: 'star01',
            size: 0.1,
            count: 300,
            rotateSpeed: { x: 0.001, y: -0.001, z: 0 },
            position: { x: 0, y: 0, z: 0 },
        },
        {
            radius: 14,
            opacity: 1,
            color: '#ffffff',
            spriteName: 'star04',
            size: 0.2,
            count: 50,
            rotateSpeed: { x: 0.0005, y: 0.0005, z: 0.0005 },
            position: { x: 0, y: 0, z: 0 },
        },
    ],
    [
        {
            radius: 7.96,
            opacity: 0.411,
            color: '#4f2f63',
            spriteName: 'smoke01',
            size: 10,
            count: 320,
            rotateSpeed: { x: -0.001, y: 0.001, z: -0.0002 },
            position: { x: 2.8, y: 2, z: 0 },
        },
        {
            radius: 10,
            opacity: 0.3,
            color: '#a02303',
            spriteName: 'smoke02',
            size: 8.88,
            count: 555,
            rotateSpeed: { x: 0.002, y: -0.0015, z: 0.0004 },
            position: { x: -2, y: -2, z: 0 },
        },
        {
            radius: 14,
            opacity: 1,
            color: '#ffffff',
            size: 0.1,
            count: 300,
            rotateSpeed: { x: 0.001, y: -0.001, z: 0 },
            spriteName: 'star01',
        },
        {
            radius: 8.76,
            opacity: 1,
            color: '#df6262',
            size: 0.2,
            count: 50,
            rotateSpeed: { x: 0.0005, y: 0.0005, z: 0.0005 },
            spriteName: 'star02',
        },
    ],
]
