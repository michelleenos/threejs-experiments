import GUI from 'lil-gui'

export class GuiWithLocalStorage {
   gui: GUI
   storedVals: Record<string, any> = {}
   storageKey: string

   constructor(storageKey: string, gui?: GUI) {
      this.gui = gui || new GUI()
      this.storageKey = storageKey
      this.storedVals = localStorage.getItem(storageKey)
         ? JSON.parse(localStorage.getItem(storageKey)!)
         : {}

      this.gui.onChange((e) => {
         let lsKey = e.controller.domElement.getAttribute('data-ls-key')
         if (lsKey) {
            this.storedVals[lsKey] = e.value
            this.setStorage()
         }
      })
   }

   add = (
      obj: { [key: string]: any },
      key: string,
      lsKey: string = key,
      onChange?: (val: any) => void
   ) => {
      if (this.storedVals.hasOwnProperty(lsKey)) {
         obj[key] = this.storedVals[lsKey]
         if (onChange) onChange(this.storedVals[lsKey])
      } else {
         this.storedVals[lsKey] = obj[key]
         this.setStorage()
      }

      let controller = this.gui.add(obj, key)
      if (onChange) controller.onChange(onChange)
      controller.domElement.setAttribute('data-ls-key', lsKey)

      return controller
   }

   setStorage = () => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.storedVals))
   }
}
