import * as THREE from 'three'

const loader = new THREE.TextureLoader()
const baseUrl = import.meta.env.DEV ? '' : import.meta.env.BASE_URL

const getTex = (path: string) => {
    const t = loader.load(`${baseUrl}${path}`)
    t.colorSpace = THREE.SRGBColorSpace
    return t
}

// const blueish = loader.load(baseUrl + '/matcaps/blueish.png'),
// const iridescent = loader.load(baseUrl + '/matcaps/iridescent.png'),

export const ringsSceneAssets = {
    matcaps: {
        blueish: getTex('/matcaps/blueish.png'),
        iridescent: getTex('/matcaps/iridescent.png'),
    },
    sprites: {
        smoke01: getTex('/stars/smoke_01.png'),
        smoke02: getTex('/stars/smoke_02.png'),
        smoke03: getTex('/stars/smoke_03.png'),
        smoke04: getTex('/stars/smoke_04.png'),
        smoke05: getTex('/stars/smoke_05.png'),
        smoke06: getTex('/stars/smoke_06.png'),
        smoke07: getTex('/stars/smoke_07.png'),
        smoke08: getTex('/stars/smoke_08.png'),
        star01: getTex('/stars/star_01.png'),
        star02: getTex('/stars/star_02.png'),
        star03: getTex('/stars/star_03.png'),
        star04: getTex('/stars/star_04.png'),
        star05: getTex('/stars/star_05.png'),
        star06: getTex('/stars/star_06.png'),
        star07: getTex('/stars/star_07.png'),
        star08: getTex('/stars/star_08.png'),
        star09: getTex('/stars/star_09.png'),
    },
}
