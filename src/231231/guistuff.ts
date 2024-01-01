import { GUI } from 'lil-gui'
import * as THREE from 'three'

export const lightGui = (
   light: THREE.AmbientLight | THREE.DirectionalLight | THREE.PointLight,
   gui: GUI,
   helper?: THREE.DirectionalLightHelper | THREE.PointLightHelper
) => {
   const folder = gui.addFolder(light.type)
   folder.addColor(light, 'color').onChange((val: string) => light.color.set(val))
   folder.add(light, 'intensity', 0, 100, 0.1)
   folder.add(light, 'visible')

   if (light instanceof THREE.AmbientLight) {
      return
   }

   folder.add(light.position, 'x', -100, 100, 1)
   folder.add(light.position, 'y', -100, 100, 1)
   folder.add(light.position, 'z', -100, 100, 1)

   if (light instanceof THREE.PointLight) {
      folder.add(light, 'distance', 0, 5000, 1)
      folder.add(light, 'decay', 0, 5, 0.1)
   }

   if (helper) {
      folder.add(helper, 'visible').name('helper')
   }

   folder.onChange(() => {
      if (helper) helper.update()
   })

   folder.close()
}
