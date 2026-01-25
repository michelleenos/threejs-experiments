import Particles, { particlesDefaults, ParticlesOpts } from './SpaceParticles'

export interface PresetParticles extends ParticlesOpts {}

export const getParticlesPreset = (
    particles: Particles,
): Required<PresetParticles> => ({
    count: particles.count,
    size: particles.size,
    color: particles.color,
    opacity: particles.opacity,
    radius: particles.radius,
    spriteName: particles.spriteName,
    blending: particles.blending,
    speed: particles.speed,
    movement: particles.movement,
    rotateSprite: particles.rotateSprite,
    position: {
        x: particles.position.x,
        y: particles.position.y,
        z: particles.position.z,
    },
    visible: particles.visible,
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
    particles.blending = opts.blending
    particles.speed = opts.speed
    particles.movement = opts.movement
    particles.position.set(opts.position.x, opts.position.y, opts.position.z)
    particles.visible = opts.visible
}

export const particlesPresets: PresetParticles[][] = [
    [
        {
            count: 50,
            size: 272.5,
            color: '#4f2f63',
            opacity: 0.4,
            radius: 10,
            spriteName: 'smoke02',
            blending: 2,
            speed: 0.025,
            movement: 1.25,
            rotateSprite: true,
            visible: true,
        },
        {
            count: 50,
            size: 200,
            color: '#052057',
            opacity: 0.5,
            radius: 8,
            spriteName: 'smoke07',
            blending: 2,
            speed: 0.04,
            movement: 5,
            rotateSprite: true,
            visible: true,
        },
        {
            count: 100,
            size: 8,
            color: '#ffffff',
            opacity: 1,
            radius: 14,
            spriteName: 'star01',
            blending: 2,
            speed: 0.01,
            movement: 2.6,
            visible: true,
        },
        {
            count: 50,
            size: 15,
            color: '#ffffff',
            opacity: 0.9,
            radius: 14,
            spriteName: 'star04',
            blending: 2,
            speed: 0.02,
            movement: 4,
            visible: true,
        },
    ],

    [
        {
            count: 320,
            size: 250,
            color: '#4f2f63',
            opacity: 0.25,
            radius: 8,
            spriteName: 'smoke01',
            blending: 2,
            speed: 0.04,
            movement: 3,
            rotateSprite: true,
            visible: true,
        },
        {
            count: 345,
            size: 333.5,
            color: '#a02303',
            opacity: 0.1,
            radius: 9,
            spriteName: 'smoke02',
            blending: 2,
            speed: 0.05,
            movement: 2.5,
            rotateSprite: true,
            visible: true,
        },
        {
            count: 300,
            size: 9,
            color: '#ffffff',
            opacity: 1,
            radius: 14,
            spriteName: 'star01',
            blending: 2,
            speed: 0.002,
            movement: 8,
            rotateSprite: false,
            visible: true,
        },
        {
            count: 50,
            size: 15,
            color: '#df6262',
            opacity: 1,
            radius: 8,
            spriteName: 'star02',
            blending: 2,
            speed: 0.01,
            movement: 1,
            rotateSprite: false,
            visible: true,
        },
    ],
]
