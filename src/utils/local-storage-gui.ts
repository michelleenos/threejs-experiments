import GUI from 'lil-gui'
import * as THREE from 'three'

type GuiAddParams = [
   Parameters<typeof GUI.prototype.add>[2]?,
   Parameters<typeof GUI.prototype.add>[3]?,
   Parameters<typeof GUI.prototype.add>[4]?
]

export class GuiWithLocalStorage {
   gui: GUI
   storedVals: Record<string, any> = {}
   storageKey: string
   children: GuiWithLocalStorage[] = []

   constructor(storageKey: string, gui?: GUI) {
      this.gui = gui || new GUI()
      this.storageKey = storageKey
      this.storedVals = localStorage.getItem(storageKey)
         ? JSON.parse(localStorage.getItem(storageKey)!)
         : {}

      this.gui.onChange((e) => {
         let parent = e.controller.parent
         if (parent === this.gui) {
            let lsKey = e.controller.domElement.getAttribute('data-ls-key')
            if (lsKey) {
               this.storedVals[lsKey] = e.value
               this.setStorage()
            }
         }
      })

      this.setExpandCollapse()
   }

   setExpandCollapse = () => {
      if (this.storedVals['expanded']) {
         this.gui.open()
      } else {
         this.gui.close()
      }

      this.gui.onOpenClose(() => {
         console.log('openclose')
         this.storedVals['expanded'] = !this.gui._closed
         this.setStorage()
      })
   }

   add = (
      obj: { [key: string]: any },
      key: string,
      params: GuiAddParams = [],
      lsKey: string = key
   ) => {
      if (this.storedVals.hasOwnProperty(lsKey)) {
         obj[key] = this.storedVals[lsKey]
         // if (onChange) onChange(this.storedVals[lsKey])
      } else {
         this.storedVals[lsKey] = obj[key]
         this.setStorage()
      }

      let controller = this.gui.add(obj, key, ...params).name(lsKey)
      controller.domElement.setAttribute('data-ls-key', lsKey)

      return controller
   }

   addColor = (obj: { [key: string]: any }, key: string, lsKey: string = key) => {
      if (this.storedVals.hasOwnProperty(lsKey)) {
         obj[key] = new THREE.Color(this.storedVals[lsKey])
      } else {
         this.storedVals[lsKey] = `#${obj[key].getHexString()}`
         this.setStorage()
      }

      let debg = {
         [key]: obj[key].getHexString(),
      }
      let controller = this.gui
         .addColor(debg, key)
         .name(lsKey)
         .onChange((v: string) => {
            obj[key] = new THREE.Color(v)
         })
      controller.domElement.setAttribute('data-ls-key', lsKey)
      return controller
   }

   addFolder = (title: string) => {
      let folder = this.gui.addFolder(title)
      let folderGui = new GuiWithLocalStorage(`${this.storageKey}-${title}`, folder)
      this.children.push(folderGui)
      return folderGui
   }

   setStorage = () => {
      console.log('set', this.storedVals)
      localStorage.setItem(this.storageKey, JSON.stringify(this.storedVals))
   }

   resetVals = (reload = true) => {
      this.storedVals = {}
      this.setStorage()
      this.children.forEach((child) => child.resetVals(false))
      if (reload) window.location.reload()
   }

   cameraControls = (camera: THREE.PerspectiveCamera) => {
      let folder = this.addFolder('camera')
      folder.add(camera.position, 'x', [], 'cameraX').decimals(3).listen()
      folder.add(camera.position, 'y', [], 'cameraY').decimals(3).listen()
      folder.add(camera.position, 'z', [], 'cameraZ').decimals(3).listen()
      folder
         .add(camera, 'fov', [1, 180, 1], 'fov')
         .listen()
         .name('fov')
         .onChange(() => {
            camera.updateProjectionMatrix()
         })

      return folder
   }

   exportVals = () => {
      let d = new Date()
      let dateTime = `${d.getMonth() + 1}${d.getDate()}${d.getHours()}${d.getMinutes()}`
      let saved = this.gui.save()
      let str = JSON.stringify(saved, null, 2)
      let blob = new Blob([str], { type: 'application/json' })
      let url = URL.createObjectURL(blob)
      let a = document.createElement('a')
      a.href = url
      a.download = `${this.storageKey}-${dateTime}.json`
      a.click()
   }
}
