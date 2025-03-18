import { GUI } from 'lil-gui'
import * as THREE from 'three'
import { BrainScene } from './brain-scene'

export class BrainGui {
    br: BrainScene
    debg: {
        clearColor: string
        lightHelpers: boolean
        phongSpecular: string
        lightsCastShadow: boolean
        phongColor: string
        phongEmissive: string
    }
    folders: { [key: string]: GUI } = {}
    gui: GUI

    constructor(br: BrainScene, gui: GUI) {
        this.br = br
        this.gui = gui

        let clear = new THREE.Color()
        this.br.world.renderer.getClearColor(clear)

        this.debg = {
            clearColor: clear.getHexString(),
            lightHelpers: false,
            lightsCastShadow: true,
            phongSpecular: this.br.phongMat.specular.getHexString(),
            phongColor: this.br.phongMat.color.getHexString(),
            phongEmissive: this.br.phongMat.emissive.getHexString(),
        }
    }

    init() {
        this.gui.addColor(this.debg, 'clearColor').onChange((val: string) => {
            this.br.world.renderer.setClearColor(val)
        })

        this.folders['movement'] = this.makeMoveFolder()
        this.folders['cam'] = this.makeCamFolder()
        this.folders['phong'] = this.makePhongFolder()
        this.folders['lights'] = this.makeLightFolder()
    }

    foldersShowHide = (show: string[], hide: string[]) => {
        show.forEach((name) => this.folders[name]?.show())
        hide.forEach((name) => this.folders[name]?.hide())
    }

    makeMoveFolder() {
        let fold = this.gui.addFolder('Movement')
        fold.add(this.br, 'mouseMovement')
        fold.add(this.br, 'moveSpeed', 0, 0.3, 0.001)
        fold.add(this.br, 'moveAmount', 0, 3, 0.01)
        return fold
    }

    makeCamFolder() {
        let fold = this.gui.addFolder('camera')

        fold.add(this.br.world.camera, 'fov', 0, 180, 1)
            .onChange(this.br.setCamera)
            .listen()
            .decimals(0)

        fold.add(this.br, 'camZOffset', -2, 2, 0.1).onChange(this.br.setCamera)
        fold.add(this.br.camPos, 'x', -10, 10, 0.1).name('camera x')
        fold.add(this.br.camPos, 'y', -10, 10, 0.1).name('camera y')

        return fold
    }

    makePhongFolder() {
        let mat = this.br.phongMat
        let phFold = this.gui.addFolder('Material').close()
        phFold.add(this.br.brain.material, 'vertexColors').onChange((val: boolean) => {
            if (!val) {
                v1.hide()
                v2.hide()
            } else {
                v1.show()
                v2.show()
                mat.color.set('#ffffff')
                this.debg.phongColor = '#ffffff'
            }
        })
        let v1 = phFold.addColor(this.br, 'color1').name('vertex color 1')
        let v2 = phFold.addColor(this.br, 'color2').name('vertex color 2')

        phFold.onChange(() => (mat.needsUpdate = true))
        phFold.addColor(this.debg, 'phongSpecular').onChange((val: string) => mat.specular.set(val))
        phFold
            .addColor(this.debg, 'phongColor')
            .onChange((val: string) => mat.color.set(val))
            .listen()
        phFold.addColor(this.debg, 'phongEmissive').onChange((val: string) => mat.emissive.set(val))
        phFold.add(mat, 'shininess', 0, 100, 1).onChange(() => (mat.needsUpdate = true))
        return phFold
    }

    makeLightFolder() {
        let lFold = this.gui.addFolder('Lights').close()

        lFold
            .add(this.debg, 'lightHelpers')
            .onChange((val: boolean) => {
                this.br.dirLights.forEach((l) => (l.helper.visible = val))
            })
            .name('show helpers')

        lFold.add(this.debg, 'lightsCastShadow').onChange((val: boolean) => {
            this.br.dirLights.forEach((l) => {
                l.instance.castShadow = val
            })
        })

        this.br.dirLights.forEach((l, i) => {
            let folder = lFold.addFolder(`light ${i + 1}`)

            folder.$title.style.borderLeft = `5px solid ${l.helperColor}`

            folder.onChange(() => l.helper.update())
            folder.add(l.instance.position, 'x', -10, 10)
            folder.add(l.instance.position, 'y', -10, 10)
            folder.add(l.instance.position, 'z', -10, 10)
            folder.add(l.instance, 'intensity', 0, 10)
        })
        return lFold
    }
}
