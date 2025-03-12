import * as THREE from 'three'
import { map } from '~/utils'
import Mouse from '~/utils/Mouse'
import Sizes from '~/utils/sizes'
import World from '~/utils/World'
import { vertexColorsGradient } from './vertex-colors-gradient'

const LIGHTBLUE = '#00c2c1'
const DARKBLUE = '#1414c2'

const dirLightInfoDefaults = [
    { x: -5, y: 1.2, z: 4, intensity: 4 },
    { x: 0, y: 1.2, z: 4.5, intensity: 5 },
    { x: 3, y: 1.2, z: -5, intensity: 5 },
]

export type BrainSceneParams = {
    world: World
    brain: THREE.BufferGeometry
    mouse: Mouse
    dirLightInfo?: { x: number; y: number; z: number; intensity: number }[]
}

export class BrainScene {
    world: World
    mouse: Mouse
    sizes: Sizes
    clock = new THREE.Clock()
    dirLights: {
        instance: THREE.DirectionalLight
        helper: THREE.DirectionalLightHelper
        helperColor: string
    }[] = []
    phongMat!: THREE.MeshPhongMaterial
    brainGeo: THREE.BufferGeometry
    brain: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhongMaterial | THREE.ShaderMaterial>
    camPos = {
        y: -0.3,
        z: 2,
        x: -0.2,
    }
    _mouseMovement = true
    moveSpeed = 0.025
    moveAmount = 0.5
    camZOffset = 0.2
    _color1 = LIGHTBLUE
    _color2 = DARKBLUE
    debg?: HTMLElement

    constructor({ world, brain, mouse, dirLightInfo }: BrainSceneParams) {
        this.world = world
        this.sizes = this.world.sizes
        this.brainGeo = brain
        this.mouse = mouse

        this.world.camera.position.set(this.camPos.x, this.camPos.y, this.camPos.z)
        this.world.renderer.setClearColor('#ffffff')

        this.createMaterials()
        this.setVertexColors()

        this.brain = new THREE.Mesh(this.brainGeo, this.phongMat)
        this.makeDirLights(dirLightInfo || dirLightInfoDefaults)

        this.world.scene.add(this.brain)
        this.setCamera()

        this.sizes.on('resize', this.setCamera)

        this.debg = document.querySelector('#debug') || undefined
    }

    get mouseMovement() {
        return this._mouseMovement
    }

    set mouseMovement(val: boolean) {
        this._mouseMovement = val
        if (!val) {
            this.world.camera.rotation.set(0, 0, 0)
        }
    }

    get color1() {
        return this._color1
    }

    set color1(val: string) {
        this._color1 = val
        this.setVertexColors()
    }

    get color2() {
        return this._color2
    }

    set color2(val: string) {
        this._color2 = val
        this.setVertexColors()
    }

    createMaterials() {
        this.phongMat = new THREE.MeshPhongMaterial({ vertexColors: true })
    }

    setVertexColors() {
        vertexColorsGradient(this.brainGeo, {
            color1: this._color1,
            color2: this._color2,
            min: -0.8,
            max: 0.8,
            axis: 'z',
        })
    }

    makeDirLights(lightInfo = dirLightInfoDefaults) {
        if (this.dirLights.length) {
            this.dirLights.forEach((light) => {
                this.world.scene.remove(light.instance)
                this.world.scene.remove(light.helper)
                light.helper.dispose()
                light.instance.dispose()
            })
        }
        this.dirLights = []
        let colors = ['#9500ff', '#00ff00', '#ff0088', '#ff9d00']
        lightInfo.forEach(({ x, y, z, intensity }, i) => {
            let light = new THREE.DirectionalLight('#ffffff', intensity)
            light.position.set(x, y, z)
            this.world.scene.add(light)
            let helperColor = colors[i % 3]

            let helper = new THREE.DirectionalLightHelper(light, 2, helperColor)
            this.world.scene.add(helper)
            helper.visible = false

            this.dirLights.push({ instance: light, helper, helperColor })
        })
    }

    setCamera = () => {
        let bbox = new THREE.Box3()
        bbox.setFromObject(this.brain)

        let size = new THREE.Vector3()
        let center = new THREE.Vector3()
        bbox.getCenter(center)
        bbox.getSize(size)

        const fov = this.world.camera.fov * (Math.PI / 180)
        const fovh = 2 * Math.atan(Math.tan(fov / 2) * this.world.camera.aspect)
        let dx = Math.abs(size.x / 2 / Math.tan(fovh / 2)) + size.z / 2
        let dy = Math.abs(size.y / 2 / Math.tan(fov / 2))

        let cameraZ = Math.max(dx, dy) * (1 + this.camZOffset)

        this.camPos.z = cameraZ

        if (this.debg) {
            this.debg.innerText = `
		 fov: ${this.world.camera.fov} fovh: ${fovh.toFixed(2)}<br/>
		 dx: ${dx.toFixed(2)} dy: ${dy.toFixed(2)} cameraZ: ${cameraZ.toFixed(2)}`
        }
    }

    tick = () => {
        this.world.render()

        if (this._mouseMovement) {
            let camZ = this.camPos.z

            let camX = this.camPos.x
            camX = map(
                this.mouse.pos.x,
                1,
                -1,
                this.camPos.x - this.moveAmount,
                this.camPos.x + this.moveAmount
            )
            let camY = this.camPos.y
            camY = map(
                this.mouse.pos.y,
                1,
                -1,
                this.camPos.y - this.moveAmount,
                this.camPos.y + this.moveAmount
            )

            this.world.camera.position.lerp(new THREE.Vector3(camX, camY, camZ), this.moveSpeed)
        } else {
            this.world.camera.position.lerp(
                new THREE.Vector3(this.camPos.x, this.camPos.y, this.camPos.z),
                this.moveSpeed
            )
        }
        this.world.camera.lookAt(0, 0, 0)
        this.world.camera.updateProjectionMatrix()

        window.requestAnimationFrame(this.tick)
    }

    animate = () => {
        window.requestAnimationFrame(this.tick)
    }
}
