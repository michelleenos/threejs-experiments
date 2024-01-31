import * as THREE from 'three'
import { createElement } from './dom'

import './style-data.css'

type DataViewValue = THREE.Vector3 | THREE.Vector2 | THREE.Euler | Number
const isDataViewValue = (val: any): val is DataViewValue => {
   return (
      val instanceof THREE.Vector2 ||
      val instanceof THREE.Vector3 ||
      val instanceof THREE.Euler ||
      typeof val === 'number'
   )
}

const writeNum = (num: number) => num.toFixed(2).padStart(7, '\xa0')
const writeVal = (val: DataViewValue) => {
   if (val instanceof THREE.Vector2) {
      return `${writeNum(val.x)} ${writeNum(val.y)}`
   } else if (val instanceof THREE.Vector3 || val instanceof THREE.Euler) {
      return `${writeNum(val.x)} ${writeNum(val.y)} ${writeNum(val.z)}`
   } else {
      return val.toFixed(2).padStart(7, '\xa0')
   }
}

interface DataViewItem {
   el: HTMLElement
   titleEl: HTMLElement
   object: { [key: string | number]: any }
   key: string | number
}

class DataViewSection {
   el: HTMLElement
   dataEl: HTMLElement
   values: DataViewItem[] = []
   parent: DataView
   title?: string

   constructor(parent: DataView, title?: string) {
      this.parent = parent
      this.el = createElement('div', { class: 'data-view-section' })
      this.dataEl = createElement('div', { class: 'vectors-rows' })
      if (title) {
         this.title = title
         let titleEl = createElement('h2', {}, title)
         this.el.appendChild(titleEl)
      }
      this.el.appendChild(this.dataEl)
   }

   add = (object: any, key: string, name: string = key) => {
      let value = object[key]
      if (!isDataViewValue(value)) {
         console.warn(`DataView: value for ${key} is not a vector or number`)
         return
      }
      let titleEl = createElement('div', {}, name)
      let valueEl = createElement('div', {}, writeVal(value))
      this.dataEl.append(titleEl, valueEl)
      this.values.push({ el: valueEl, titleEl, object, key })
   }

   update = () => {
      this.values.forEach((v) => {
         v.el.innerHTML = writeVal(v.object[v.key])
      })
   }
}

export class DataView {
   el: HTMLElement
   sections: (DataViewSection | { el: HTMLElement; update: () => void })[] = []
   toggle: HTMLElement
   _visible: boolean = true

   constructor() {
      this.toggle = createElement(
         'button',
         { id: 'dataview-toggle', class: 'dataview-toggle' },
         'hide data'
      )
      this.el = createElement('div', { id: 'dataview' }, [this.toggle])
      document.body.appendChild(this.el)

      this.toggle.addEventListener('click', this.onToggle)
   }

   show = () => {
      this.toggle.innerHTML = 'hide data'
      this.el.classList.remove('hidden')
      this._visible = true
   }

   hide = () => {
      this.toggle.innerHTML = 'show data'
      this.el.classList.add('hidden')
      this._visible = false
   }

   onToggle = () => {
      if (this._visible) {
         this.hide()
      } else {
         this.show()
      }
   }

   createSection(title?: string) {
      let section = new DataViewSection(this, title)
      this.sections.push(section)
      this.el.appendChild(section.el)
      return section
   }

   update = () => {
      if (!this._visible) return
      this.sections.forEach((s) => s.update())
   }

   createCustomSection = (el: HTMLElement, onUpdate: () => void, title?: string) => {
      let div = createElement('div', { class: 'custom-section data-view-section' }, [
         title ? createElement('h2', {}, title) : null,
         el,
      ])

      this.el.appendChild(div)
      this.sections.push({
         el: div,
         update: onUpdate,
      })
   }
}
