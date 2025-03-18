import * as THREE from 'three'
import Sizes from './Sizes'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'

type WorldOptions = {
    controls?: boolean
    stats?: boolean
}

export default class World {
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    camera: THREE.PerspectiveCamera
    sizes: Sizes
    controls?: OrbitControls
    stats?: Stats

    constructor(sizes: Sizes, { controls = true, stats = false }: WorldOptions = {}) {
        this.sizes = sizes
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('#000')
        this.renderer.outputColorSpace = THREE.SRGBColorSpace
        document.body.appendChild(this.renderer.domElement)

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 300)
        if (controls) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement)
            this.controls.enableDamping = true
        }

        if (stats) {
            this.stats = new Stats()
            document.body.appendChild(this.stats.dom)
        }

        this.onResize()
        this.sizes.on('resize', this.onResize)
    }

    onResize = () => {
        this.camera.aspect = this.sizes.width / this.sizes.height
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(this.sizes.pixelRatio)
    }

    render = (time?: number) => {
        this.renderer.render(this.scene, this.camera)
        if (this.controls && this.controls.enabled) {
            this.controls.update()
        }
        if (this.stats) this.stats.update()
    }
}
