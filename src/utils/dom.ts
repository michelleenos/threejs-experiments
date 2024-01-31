export const createElement = (
   tag: string,
   attributes?: { [key: string]: any },
   content?: string | HTMLElement | (HTMLElement | null | string)[]
) => {
   const el = document.createElement(tag)
   if (attributes) {
      for (let key in attributes) {
         el.setAttribute(key, attributes[key])
      }
   }
   if (content) {
      if (typeof content === 'string') {
         el.innerHTML = content
      } else if (Array.isArray(content)) {
         content.forEach((child) => {
            if (child) {
               if (typeof child === 'string') {
                  el.appendChild(createElement('div', {}, child))
               } else {
                  el.appendChild(child)
               }
            }
         })
      } else {
         el.appendChild(content)
      }
   }
   return el
}
