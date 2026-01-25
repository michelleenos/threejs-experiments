import Rings, { RingsOpts } from './Rings'

export const getRingsPreset = (rings: Rings): Required<RingsOpts> => ({
    count: rings.count,
    speed: rings.speed,
    radius: rings.radius,
    opacity: rings.opacity,
    thickness: rings.thickness,
    coverAmt: rings.coverAmt,
    initRotation: rings.initRotation,
    rotateSpeed: rings.rotateSpeed,
    blending: rings.blending,
    easingShape: rings.easingShape,
    scaleFn: rings.scaleFn,
    posFn: rings.posFn,
    scaleFnVar: rings.scaleFnVar,
    posFnVar: rings.posFnVar,
    matcapName: rings.matcapName,
    visible: rings.visible,
    radialSegments: rings.radialSegments,
    tubularSegments: rings.tubularSegments,
})

export const setRingsFromPreset = (rings: Rings, preset: RingsOpts) => {
    rings.setFromOpts(preset)
    // const opts = { ...ringsDefaults, ...preset }
    // rings.speed = opts.speed
    // rings.radius = opts.radius
    // rings.opacity = opts.opacity
    // rings.thickness = opts.thickness
    // rings.count = opts.count
    // rings.scaleFnVar = opts.scaleFnVar
    // rings.coverAmt = opts.coverAmt
    // rings.scaleFn = opts.scaleFn
    // rings.posFn = opts.posFn
    // rings.easingShape = opts.easingShape
    // rings.blending = opts.blending
    // rings.visible = opts.visible
    // rings.tubularSegments = opts.tubularSegments
    // rings.radialSegments = opts.radialSegments
    // rings.initRotation.set(
    //     opts.initRotation.x,
    //     opts.initRotation.y,
    //     opts.initRotation.z,
    // )
    // rings.rotateSpeed.set(
    //     opts.rotateSpeed.x,
    //     opts.rotateSpeed.y,
    //     opts.rotateSpeed.z,
    // )
}

export const ringsPresets: RingsOpts[][] = [
    [
        {
            count: 18,
            speed: 0.2,
            radius: 3,
            thickness: 0.056,
            scaleFn: 'cos-sin',
            posFn: 'sin',
            scaleFnVar: 1,
            posFnVar: 1,
            blending: 1,
        },
        {
            count: 166,
            speed: 0.4,
            radius: 5.24,
            opacity: 0.572,
            thickness: 0.005,
            coverAmt: 0.77,
            scaleFn: 'cos',
            posFn: 'sin',
            scaleFnVar: 1,
            posFnVar: 1,
            easingShape: 'outCubic',
            blending: 1,
        },
    ],
    [
        {
            count: 426,
            speed: 0.8,
            radius: 4.22,
            opacity: 0.452,
            thickness: 0.072,
            coverAmt: 0.56,
            scaleFn: 'sin',
            posFn: 'cos',
            scaleFnVar: 2,
            posFnVar: 1,
            blending: 2,
            rotateSpeed: { x: 0.05, y: 0, z: 0.05 },
        },
        {
            visible: false,
        },
    ],
    [
        {
            count: 115,
            speed: 0,
            radius: 3,
            thickness: 0.02,
            coverAmt: 1,
            scaleFn: 'cos',
            posFn: 'sin',
            posFnVar: 1,
            scaleFnVar: 2,
            easingShape: 'inOutCubic',
            blending: 1,
        },
        {
            count: 29,
            speed: 0.3,
            radius: 5,
            thickness: 0.045,
            scaleFnVar: 2,
            coverAmt: 0.5,
            scaleFn: 'cos',
            posFn: 'sin',
            posFnVar: 1,
            easingShape: 'linear',
            blending: 1,
            visible: true,
            initRotation: { x: 0, y: 0, z: 1.57 },
        },
    ],
    [
        {
            count: 64,
            speed: 0.15,
            radius: 3.68,
            opacity: 1,
            thickness: 0.045,
            coverAmt: 1,
            scaleFn: 'sin',
            posFn: 'sin',
            scaleFnVar: 2,
            posFnVar: 1,
            easingShape: 'linear',
            blending: 1,
            visible: true,
            initRotation: { x: 0.26, y: 0, z: 0.42 },
            rotateSpeed: { x: 0, y: 0, z: 0 },
        },
        {
            visible: false,
        },
    ],
]
