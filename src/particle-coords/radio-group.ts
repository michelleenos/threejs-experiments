import { createElement } from '../utils/dom'

export class RadioGroup {
   btn: HTMLElement
   el: HTMLElement
   inputs: HTMLInputElement[] = []
   uniforms: THREE.ShaderMaterial['uniforms']
   currentShowVal: string | null = null
   currentToggle = false
   shownValueEl: HTMLElement

   constructor(uniforms: THREE.ShaderMaterial['uniforms']) {
      this.uniforms = uniforms

      let shownLabel = createElement('div', { class: 'shown-label' }, 'Shown value:')
      this.shownValueEl = createElement('div', { class: 'shown-val' })
      this.btn = createElement('button', { class: 'group-btn' }, 'toggle')
      let top = createElement('div', { class: 'rgroup-top' }, [
         this.btn,
         createElement('div', { class: 'rgroup-top-label' }, [shownLabel, this.shownValueEl]),
      ])

      this.el = createElement('div', { class: 'radio-controls' }, [top])
      document.body.append(this.el)

      let shown = window.localStorage.getItem('showed_val')
      if (shown) this.setValue(shown)

      let toggled = window.localStorage.getItem('toggled')
      if (toggled) this.currentToggle = toggled === 'true'
      if (this.currentToggle) this.el.classList.add('collapsed')

      this.btn.addEventListener('click', () => {
         this.currentToggle = !this.currentToggle
         window.localStorage.setItem('toggled', this.currentToggle.toString())
         if (this.currentToggle) {
            this.el.classList.add('collapsed')
         } else {
            this.el.classList.remove('collapsed')
         }
      })
   }

   addRadio = (label: string, value: string) => {
      const labelEl = createElement('label', { for: value }, label)
      const input = createElement('input', {
         type: 'radio',
         name: 'rgroup',
         value,
         id: value,
      }) as HTMLInputElement
      const wrap = createElement('div', { class: 'radio-wrap' }, [labelEl, input])
      this.el.append(wrap)
      this.inputs.push(input)

      if (this.currentShowVal === value) {
         input.checked = true
         this.uniforms[value].value = true
      }

      input.addEventListener('change', (e) => {
         this.setValue(value)
         // this.setFalseExcept(value)
         // this.uniforms[value].value = input.checked
         // window.localStorage.setItem('showed_val', value)
      })

      return input
   }

   setValue = (value: string) => {
      this.uniforms[value].value = true
      this.currentShowVal = value
      this.inputs.forEach((input) => {
         if (input.value === value) {
            this.uniforms[input.value].value = true
            input.checked = true
         } else {
            this.uniforms[input.value].value = false
            input.checked = false
         }
      })
      window.localStorage.setItem('showed_val', value)
      this.shownValueEl.textContent = value
   }

   addInfo = (content: string) => {
      const el = createElement('div', { class: 'control-info' }, content)
      console.log(el)
      this.el.append(el)
   }

   setFalseExcept = (value: string) => {
      this.inputs.forEach((input) => {
         if (input.value !== value) this.uniforms[input.value].value = false
      })
   }
}
