import {
   BaseInputParams,
   BindingApi,
   BladeApi,
   ButtonApi,
   FolderApi,
   TpChangeEvent,
} from '@tweakpane/core'
import { Pane } from 'tweakpane'
import * as TweakpaneFileImportPlugin from 'tweakpane-plugin-file-import'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import * as TweakpaneRotationInputPlugin from '@0b5vr/tweakpane-plugin-rotation'
import * as THREE from 'three'

export type AddOtherParams = [opts?: BaseInputParams, lsKey?: string | number]
export type AddNumParams = [min?: number, max?: number, step?: number, lsKey?: string | number]

type PaneLocalStorageOpts = {
   key: string
   pane?: Pane
   btnReset?: boolean
   btnExport?: boolean
   jsonInput?: boolean
   btnClearAll?: boolean
   btnsInFolder?: boolean
   onReset?: () => void
}

export class PaneFolderLocalStorage {
   folder: FolderApi
   storedVals: Record<string, any>
   storageKey: string

   constructor({ key, pane }: { key: string; pane?: FolderApi }) {
      this.storageKey = key
      this.storedVals = localStorage.getItem(this.storageKey)
         ? JSON.parse(localStorage.getItem(this.storageKey)!)
         : {}

      this.folder = pane || (new Pane({ title: this.storageKey }) as FolderApi)

      this.folder.on('change', this.onItemChange)
      this.setExpandCollapse()
   }

   onItemChange = (e: TpChangeEvent<unknown, BladeApi>) => {
      let lsKey = e.target.element.getAttribute('data-ls-key')
      if (lsKey) {
         this.storedVals[lsKey] = e.value
         this.setStorage()
      }
   }

   setStorage = () => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.storedVals))
   }

   dispose = () => {
      this.folder.children.forEach((child) => {
         if (child instanceof FolderApi) child.dispose()
      })
      this.folder.dispose()
   }

   setExpandCollapse = () => {
      if (this.storedVals['expanded']) {
         this.folder.expanded = false
      } else {
         this.folder.expanded = true
      }

      this.folder.on('fold', (e) => {
         this.storedVals['expanded'] = !e.expanded
         this.setStorage()
      })
   }

   addNum<O extends { [key: string]: any }, K extends keyof O>(
      obj: O,
      key: K,
      ...[min = 0, max = 1, step = 0.01, lsKey]: AddNumParams
   ): BindingApi {
      lsKey = String(lsKey ?? (key as string))
      if (this.storedVals.hasOwnProperty(lsKey)) {
         obj[key] = this.storedVals[lsKey]
      } else {
         this.storedVals[lsKey] = obj[key]
         this.setStorage()
      }

      let controller = this.folder.addBinding(obj, key, { min, max, step, label: lsKey })
      controller.element.setAttribute('data-ls-key', lsKey)

      return controller
   }

   addOther<O extends { [key: string]: any }, K extends keyof O>(
      obj: O,
      key: K,
      ...[opts, lsKey]: AddOtherParams
   ) {
      lsKey = String(lsKey ?? ((opts && opts.label) || key))
      if (this.storedVals.hasOwnProperty(lsKey)) {
         if (
            (obj[key] as any) instanceof THREE.Vector3 ||
            (obj[key] as any) instanceof THREE.Euler
         ) {
            obj[key].copy(this.storedVals[lsKey])
         } else {
            obj[key] = this.storedVals[lsKey]
         }
      } else {
         this.storedVals[lsKey] = obj[key]
         this.setStorage()
      }

      let controller = this.folder.addBinding(obj, key, { ...opts, label: lsKey })
      controller.element.setAttribute('data-ls-key', lsKey)

      return controller
   }

   add<O extends { [key: string]: any }, K extends keyof O>(
      obj: O,
      key: K,
      ...args: AddNumParams | AddOtherParams
   ): BindingApi {
      if (typeof args[0] === 'object') {
         return this.addOther(...([obj, key, ...args] as [O, K, ...AddOtherParams]))
      } else if (typeof args[0] === 'number') {
         return this.addNum(...([obj, key, ...args] as [O, K, ...AddNumParams]))
      } else {
         return this.addOther(...([obj, key, ...args] as [O, K, ...AddOtherParams]))
      }
   }

   resetVals = () => {
      this.storedVals = {}
      this.setStorage()
   }
}

export class PaneWithLocalStorage {
   pane: Pane
   savedFile: File | null = null
   importValsButton!: ButtonApi
   children: PaneFolderLocalStorage[] = []
   storageKey: string
   folderBtns?: FolderApi
   onReset?: () => void

   constructor({
      key,
      pane,
      btnReset = true,
      btnExport = true,
      jsonInput = true,
      btnsInFolder = false,
      onReset,
   }: PaneLocalStorageOpts) {
      this.storageKey = key
      this.pane = pane || new Pane({ title: this.storageKey })
      this.setupPane()

      if (onReset) this.onReset = onReset

      if (btnsInFolder) this.folderBtns = this.pane.addFolder({ title: 'buttons' })
      // this.pane.on('change', this.onItemChange)

      if (btnReset) this.addResetButton()
      if (btnExport) this.addExportButton()
      if (jsonInput) this.addJsonInput()
   }

   addResetButton = () => {
      ;(this.folderBtns || this.pane)
         .addButton({ title: `Reset ${this.storageKey} vals` })
         .on('click', this.resetVals)
   }
   addExportButton = () => {
      ;(this.folderBtns || this.pane)
         .addButton({ title: 'export vals' })
         .on('click', this.exportVals)
   }

   addJsonInput = () => {
      let params = { file: '' }
      ;(this.folderBtns || this.pane)
         .addBinding(params, 'file', {
            view: 'file-input',
            lineCount: 1,
            accept: '.json',
            label: 'upload vals json',
         })
         .on('change', (e) => {
            let file = e.value as any
            if (file instanceof File) {
               this.savedFile = file
               this.importValsButton.hidden = false
            } else {
               this.importValsButton.hidden = true
               this.savedFile = null
            }
         })

      this.importValsButton = this.pane
         .addButton({ title: 'import vals', hidden: true })
         .on('click', this.importVals)
   }

   addButton = (title: string) => {
      return (this.folderBtns || this.pane).addButton({ title })
   }

   resetVals = () => {
      this.children.forEach((child) => child.resetVals())
      if (this.onReset) this.onReset()
      window.location.reload()
   }

   setupPane = () => {
      if (!(this.pane instanceof Pane)) return
      if (this.pane.element.parentElement) {
         this.pane.element.parentElement.style.zIndex = '6'
         this.pane.element.parentElement.classList.add('pane-custom-parent')
      }
      this.pane.element.classList.add('pane-custom')
      this.pane.registerPlugin(EssentialsPlugin)
      this.pane.registerPlugin(TweakpaneFileImportPlugin)
      this.pane.registerPlugin(TweakpaneRotationInputPlugin)

      this.setExpandCollapse()
   }

   setExpandCollapse = () => {
      let stored = JSON.parse(localStorage.getItem(`${this.storageKey}-expanded`)!)
      if (stored) {
         this.pane.expanded = false
      } else {
         this.pane.expanded = true
      }

      this.pane.on('fold', (e) => {
         localStorage.setItem(`${this.storageKey}-expanded`, JSON.stringify(!e.expanded))
      })
   }

   importVals = () => {
      if (!this.savedFile) return
      let reader = new FileReader()
      reader.onload = (e) => {
         let json = JSON.parse(e.target!.result as string)

         if (json) {
            this.children.forEach((child) => {
               let childJson = json[child.storageKey]
               if (childJson) {
                  Object.keys(childJson).forEach((key) => {
                     if (child.storedVals.hasOwnProperty(key))
                        child.storedVals[key] = childJson[key]
                  })
                  child.setStorage()
               }
            })
         }
         window.location.reload()
      }
      reader.readAsText(this.savedFile)
   }

   exportVals = () => {
      let d = new Date()
      let dateTime = `${d.getMonth() + 1}${d.getDate()}${d.getHours()}${d.getMinutes()}`
      let childrenVals = this.children.reduce((acc, child) => {
         acc[child.storageKey] = child.storedVals
         return acc
      }, {} as { [key: string]: any })

      let str = JSON.stringify(childrenVals, null, 2)

      let blob = new Blob([str], { type: 'application/json' })
      let url = URL.createObjectURL(blob)
      let a = document.createElement('a')
      a.href = url
      a.download = `${this.storageKey}-${dateTime}.json`
      a.click()
   }

   addFolder = (key: string) => {
      let folder = new PaneFolderLocalStorage({
         key: `${this.storageKey}-${key}`,
         pane: this.pane.addFolder({ title: key }),
      })
      this.children.push(folder)
      return folder
   }

   dispose = () => {
      this.children.forEach((child) => child.dispose())
   }
}
