import Mouse from '../utils/Mouse'
import World from '../utils/World'
import Sizes from '../utils/sizes'
import * as THREE from 'three'
import { Particles, type ParticleSheetParams } from './Particles'
import { PaneWithLocalStorage } from '../utils/local-storage-pane'
import { Pane, TpChangeEvent } from 'tweakpane'
import { createElement } from '../utils/dom'
import './particle-sheet.css'
import { throttle } from '../utils/throttle'
import GUI from 'lil-gui'
import { GuiWithLocalStorage } from '../utils/local-storage-gui'
// import { EffectComposer, DepthOfFieldEffect,  } from 'postprocessing'

export type BaseOpts = {
   key?: string
   data: SheetViewData[]
}

export type MaterialData = {
   vertexShader: string
   fragmentShader: string
   uniforms: ParticleUniform[]
}

export type SheetViewData = {
   key?: string
   saveCamera?: boolean
   sheets: {
      material: MaterialData
      params: ParticleSheetParams & {
         position?: THREE.Vector3
         rotation?: THREE.Euler
         blending?: {
            default?: THREE.Blending
            controls?: boolean
         }
      }
      colors?: THREE.Color[]
   }[]
}

export type ParticleUniformNoControl = [
   key: string,
   val: number | THREE.Vector2 | THREE.Vector3 | boolean,
   control: false
]

export type ParticleUniform =
   | [
        key: string,
        val: number | THREE.Vector2 | THREE.Vector3 | boolean,
        min?: number,
        max?: number,
        step?: number,
        lsKey?: string
     ]
   | ParticleUniformNoControl

export class ParticleSheetBase {
   baseKey: string = 'particles'
   world: World
   sizes: Sizes
   mouse: Mouse
   clock = new THREE.Clock()
   defaultCameraPos = new THREE.Vector3(0, 0, 18)

   particles: Particles[] = []
   rafId: number | null = null
   viewData: SheetViewData[]
   viewDataIndex: number = -1
   viewDataCurrent!: SheetViewData
   pls: PaneWithLocalStorage | null = null
   pane: Pane | null = null
   colors: THREE.Color[] = [new THREE.Color('#FF8D25'), new THREE.Color('#0067A7')]
   viewBtns: HTMLElement[]

   useGui: boolean = false

   gui: GUI | null = null
   gls: GuiWithLocalStorage | null = null
   glsCameraControls: GuiWithLocalStorage | null = null

   cameraListening = false

   constructor(opts: BaseOpts) {
      if (opts.key) this.baseKey = opts.key
      this.sizes = new Sizes()
      this.world = new World(this.sizes)
      this.mouse = new Mouse(this.sizes)

      this.world.camera.position.copy(this.defaultCameraPos)
      this.world.camera.far = 100
      this.world.camera.fov = 35
      this.world.camera.updateProjectionMatrix()

      if (this.world.controls) this.world.controls.enableDamping = false

      this.viewData = opts.data

      this.viewBtns = this.makeViewChooser()

      let firstIndex = parseInt(localStorage.getItem(`${this.baseKey}-view`) || '0')
      this.setViewDataIndex(firstIndex)
   }

   get currentKey() {
      let data = this.viewData[this.viewDataIndex]
      return `${this.baseKey}-${data.key || this.viewDataIndex}`
   }

   setCameraVals = () => {
      let currentView = this.viewDataCurrent
      if (!currentView) {
         console.warn('no current view data')
         return
      }
      if (!currentView.saveCamera) {
         this.world.camera.position.copy(this.defaultCameraPos)
         this.cameraListening = false
      } else {
         try {
            let stored = localStorage.getItem(`${this.currentKey}-camera`)
            let obj = JSON.parse(stored!)
            if (
               obj.cameraX !== undefined &&
               obj.cameraY !== undefined &&
               obj.cameraZ !== undefined
            ) {
               this.world.camera.position.set(obj.cameraX, obj.cameraY, obj.cameraZ)
            } else {
               this.world.camera.position.copy(this.defaultCameraPos)
            }

            if (obj.fov !== undefined) {
               this.world.camera.fov = obj.fov
               this.world.camera.updateProjectionMatrix()
            }
         } catch (e) {
            this.world.camera.position.copy(this.defaultCameraPos)
         }
         this.cameraListening = true
      }

      this.world.camera.lookAt(0, 0, 0)
   }

   setViewDataIndex = (index: number) => {
      if (index >= this.viewData.length) index = 0
      if (index === this.viewDataIndex) return

      this.viewDataIndex = index
      this.viewDataCurrent = JSON.parse(JSON.stringify(this.viewData[this.viewDataIndex]))
      this.viewBtns.forEach((btn) => btn.classList.remove('active'))
      this.viewBtns[this.viewDataIndex].classList.add('active')
      localStorage.setItem(`${this.baseKey}-view`, `${this.viewDataIndex}`)
      this.getParams()
   }

   restart = () => {
      if (this.particles.length) {
         this.particles.forEach((p) => {
            p.dispose()
         })
         this.particles = []
      }

      if (this.useGui) {
         // this.gls?.dispose()
         this.gui?.destroy()
         this.gls = null
         this.gui = null
      } else {
         if (this.pls) {
            this.pls.dispose()
            this.pls = null
         }

         if (this.pane) {
            this.pane.dispose()
            this.pane = null
         }
      }
      this.stop()

      setTimeout(() => {
         this.createAll()
         this.start()
      })
   }

   makeViewChooser = () => {
      let views = createElement('div', { class: 'views' })
      let btns: HTMLElement[] = []
      this.viewData.forEach((data, i) => {
         let viewTitleEl = createElement('span', { class: 'views__title' }, data.key || `view ${i}`)
         let viewNumEl = createElement('span', { class: 'views__num' }, `${i + 1}`)
         let viewEl = createElement('button', { class: 'views__btn', 'data-index': `${i}` }, [
            viewNumEl,
            viewTitleEl,
         ])
         views.appendChild(viewEl)
         btns.push(viewEl)
      })

      document.body.appendChild(views)
      views.addEventListener('click', (e) => {
         let target = e.target as HTMLElement
         let btn = target.closest('.views__btn') as HTMLElement
         if (!btn) return
         let index = btn.dataset.index
         if (index === undefined) return

         this.setViewDataIndex(parseInt(index))
         this.restart()
      })
      return btns
   }

   createAll = () => {
      let currentView = this.viewDataCurrent
      if (!currentView) {
         console.warn('no current view data')
         return
      }

      if (this.useGui) {
         this.setupGui()
      } else {
         this.setupPane()
      }

      currentView.sheets.forEach((sheet) => {
         this.particles.push(
            new Particles({
               world: this.world,
               mouse: this.mouse,
               sheetParams: sheet['params'],
               vertexShader: sheet.material.vertexShader,
               fragmentShader: sheet.material.fragmentShader,
            })
         )
      })

      this.setCameraVals()
      this.setUniforms()
      this.setGeometryStuff()
      this.setParticlesPane()
   }

   setupGui = () => {
      this.gui = new GUI()
      this.gls = new GuiWithLocalStorage(this.currentKey, this.gui)
      this.gui.add(this, 'resetCamera')
      this.gui.add(this.gls, 'resetVals')
      this.gui.add(this.gls, 'exportVals')
      this.glsCameraControls = this.gls.cameraControls(this.world.camera)
   }

   setupPane = () => {
      this.pane = new Pane({ title: 'particles' })
      this.pls = new PaneWithLocalStorage({
         key: this.currentKey,
         pane: this.pane,
         btnsInFolder: true,
         onReset: () => {
            localStorage.removeItem(`${this.currentKey}-camera`)
         },
      })
      this.pls.addButton('reset camera').on('click', this.resetCamera)
   }

   resetCamera = () => {
      localStorage.removeItem(`${this.currentKey}-camera`)
      this.setCameraVals()
   }

   onParamsChange = (e: TpChangeEvent<unknown>) => {
      if (!this.useGui && !e.last) return

      setTimeout(() => this.restart())
   }

   setGeometryStuff = () => {
      if (!this.particles) return console.warn('no particles, cant set geometry stuff')
      let view = this.viewData[this.viewDataIndex]

      view.sheets.forEach((sheet, i) => {
         let params = sheet.params
         if (params.position) this.particles[i].position.copy(params.position)
         if (params.rotation) this.particles[i].rotation.copy(params.rotation)
         if (params.blending?.default) this.particles[i].material.blending = params.blending.default
      })
   }

   setUniforms = () => {
      if (this.useGui) return this.setUniformsGui()
      let view = this.viewData[this.viewDataIndex]
      if (!this.particles) return console.warn('no particles, cant set uniforms')
      if (!this.pls) return console.warn('no pls')

      view.sheets.forEach((sheet, i) => {
         let uniforms = sheet.material.uniforms
         if (!this.particles[i]) return

         let folderTitle = this.particles.length > 1 ? `uniforms-${i}` : 'uniforms'
         let folder = this.pls!.addFolder(folderTitle)
         uniforms.forEach((uniform) => {
            let [key, val, min, max, step] = uniform
            let uKey = `u_${key}`
            this.particles[i].setUniforms({
               [uKey]: new THREE.Uniform(val),
            })
            if (min !== false) {
               folder.addNum(
                  this.particles[i].material.uniforms[uKey],
                  'value',
                  min,
                  max,
                  step,
                  key
               )
            }
         })

         let colors = sheet.colors || this.colors
         colors.forEach((color, j) => {
            this.particles[i].setUniforms({
               [`u_color${j + 1}`]: new THREE.Uniform(color),
            })
         })
      })
   }

   setUniformsGui = () => {
      let view = this.viewData[this.viewDataIndex]
      if (!this.particles) return console.warn('no particles, cant set uniforms')
      if (!this.gls) return console.warn('no gls')

      view.sheets.forEach((sheet, i) => {
         let uniforms = sheet.material.uniforms
         if (!this.particles[i]) return

         let folderTitle = this.particles.length > 1 ? `uniforms-${i}` : 'uniforms'
         let folder = this.gls!.addFolder(folderTitle)

         let material = this.particles[i].material
         uniforms.forEach((uniform) => {
            let [key, val, min, max, step] = uniform
            let uKey = `u_${key}`
            this.particles[i].setUniforms({
               [uKey]: new THREE.Uniform(val),
            })
            if (min !== false) {
               if (val instanceof THREE.Vector3) {
                  folder.add(material.uniforms[uKey].value, 'x', [min, max, step], `${key}X`)
                  folder.add(material.uniforms[uKey].value, 'y', [min, max, step], `${key}Y`)
                  folder.add(material.uniforms[uKey].value, 'z', [min, max, step], `${key}Z`)
               } else if (val instanceof THREE.Vector2) {
                  folder.add(material.uniforms[uKey].value, 'x', [min, max, step], `${key}X`)
                  folder.add(material.uniforms[uKey].value, 'y', [min, max, step], `${key}Y`)
               } else {
                  folder.add(material.uniforms[uKey], 'value', [min, max, step], key)
               }
            }
         })

         let colors = sheet.colors || this.colors
         colors.forEach((color, j) => {
            this.particles[i].setUniforms({
               [`u_color${j + 1}`]: new THREE.Uniform(color),
            })
            folder.addColor(material.uniforms[`u_color${j + 1}`], 'value', `color${j + 1}`)
         })
      })
   }

   setParticlesPane = () => {
      if (this.useGui) return this.setParticlesGui()
      if (!this.pls || !this.pane || !this.particles.length) return
      let view = this.viewDataCurrent

      view.sheets.forEach((sheet, i) => {
         if (!this.particles[i]) return
         let title = this.viewDataCurrent.sheets.length > 1 ? `params-${i}` : 'params'
         let pfolder = this.pls!.addFolder(title)
         let params = sheet.params

         pfolder
            .addNum(params, 'sheetWidth', 1, 20, 1, 'sheetWidth')
            .on('change', this.onParamsChange)
         pfolder
            .addNum(params, 'sheetHeight', 1, 20, 1, 'sheetHeight')
            .on('change', this.onParamsChange)
         pfolder.addNum(params, 'nx', 1, 500, 1, 'particlesX').on('change', this.onParamsChange)
         pfolder.addNum(params, 'ny', 1, 500, 1, 'particlesY').on('change', this.onParamsChange)

         if (params.position) pfolder.add(this.particles[i], 'position', { min: -10, max: 10 })
         if (params.rotation)
            pfolder.addOther(this.particles[i], 'rotation', {
               view: 'rotation',
               rotationMode: 'euler',
            })

         if (params.blending?.controls) {
            pfolder.addOther(this.particles[i].material, 'blending', {
               options: {
                  Normal: THREE.NormalBlending,
                  Additive: THREE.AdditiveBlending,
                  Subtractive: THREE.SubtractiveBlending,
                  Multiply: THREE.MultiplyBlending,
               },
            })
         }
      })
   }

   setParticlesGui = () => {
      if (!this.gls || !this.gui || !this.particles.length) return
      let view = this.viewDataCurrent

      view.sheets.forEach((sheet, i) => {
         if (!this.particles[i]) return
         let title = this.viewDataCurrent.sheets.length > 1 ? `params-${i}` : 'params'
         let pfolder = this.gls!.addFolder(title)
         let params = sheet.params

         pfolder
            .add(params, 'sheetWidth', [1, 20, 1], 'sheetWidth')
            .onFinishChange(this.onParamsChange)
         pfolder
            .add(params, 'sheetHeight', [1, 20, 1], 'sheetHeight')
            .onFinishChange(this.onParamsChange)

         pfolder.add(params, 'nx', [1, 500, 1], 'particlesX').onFinishChange(this.onParamsChange)
         pfolder.add(params, 'ny', [1, 500, 1], 'particlesY').onFinishChange(this.onParamsChange)

         if (params.position) {
            pfolder.add(this.particles[i].position, 'x', [-10, 10, 0.1], 'posX')
            pfolder.add(this.particles[i].position, 'y', [-10, 10, 0.1], 'posY')
            pfolder.add(this.particles[i].position, 'z', [-10, 10, 0.1], 'posZ')
         }
         if (params.rotation) {
            pfolder.add(this.particles[i].rotation, 'x', [-Math.PI, Math.PI, 0.01], 'rotX')
            pfolder.add(this.particles[i].rotation, 'y', [-Math.PI, Math.PI, 0.01], 'rotY')
            pfolder.add(this.particles[i].rotation, 'z', [-Math.PI, Math.PI, 0.01], 'rotZ')
         }

         if (params.blending?.controls) {
            pfolder.add(this.particles[i].material, 'blending', [
               {
                  normal: THREE.NormalBlending,
                  additive: THREE.AdditiveBlending,
                  subtractive: THREE.SubtractiveBlending,
                  multiply: THREE.MultiplyBlending,
               },
            ])
         }
      })
   }

   getParams = () => {
      let view = this.viewDataCurrent
      view.sheets.forEach((sheet, i) => {
         let title = view.sheets.length > 1 ? `params-${i}` : 'params'
         let storedParams = JSON.parse(localStorage.getItem(`${this.currentKey}-${title}`)!)
         let params = sheet.params
         if (storedParams) {
            if (storedParams.sheetWidth) params.sheetWidth = storedParams.sheetWidth
            if (storedParams.sheetHeight) params.sheetHeight = storedParams.sheetHeight
            if (storedParams.particlesX) params.nx = storedParams.particlesX
            if (storedParams.particlesY) params.ny = storedParams.particlesY
            if (params.position && storedParams.position)
               params.position = new THREE.Vector3().copy(storedParams.position)
            if (params.rotation && storedParams.rotation)
               params.rotation = new THREE.Euler().copy(storedParams.rotation)
            // if (params.blending?.controls && storedParams.blending)
            // this.particles[i].material.blending = storedParams.blending
         }
      })
   }

   tick = () => {
      let time = this.clock.getElapsedTime()
      if (this.particles.length) this.particles.forEach((p) => p.update(time))
      this.world.render()

      // let cameraPos = this.world.camera.position

      if (this.cameraListening && this.glsCameraControls) {
         let vals = this.glsCameraControls.gui.save() as { controllers: { [key: string]: any } }
         let cameraCurrent = localStorage.getItem(`${this.currentKey}-camera`)
         let storedCamera = cameraCurrent ? JSON.parse(cameraCurrent) : {}
         storedCamera.cameraX = vals.controllers.cameraX
         storedCamera.cameraY = vals.controllers.cameraY
         storedCamera.cameraZ = vals.controllers.cameraZ
         localStorage.setItem(`${this.currentKey}-camera`, JSON.stringify(storedCamera))
      }

      this.rafId = requestAnimationFrame(this.tick)
   }

   start = () => {
      if (this.rafId) cancelAnimationFrame(this.rafId)
      this.rafId = requestAnimationFrame(this.tick)
   }

   stop = () => {
      if (this.rafId) cancelAnimationFrame(this.rafId)
      this.rafId = null
   }
}
