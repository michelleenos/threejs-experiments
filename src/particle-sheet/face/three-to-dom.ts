import * as THREE from 'three'

type ThreeToDomParams = {
   object: THREE.Mesh | THREE.Points | (THREE.Mesh | THREE.Points)[]
   target: HTMLElement
   camera: THREE.PerspectiveCamera
   sizes: { width: number; height: number }
}

// both below are assuming the object has a scale and is a flat plane
export const setCameraToTarget = ({ object, target, camera, sizes }: ThreeToDomParams) => {
   const rect = target.getBoundingClientRect()

   ;(object instanceof Array ? object : [object]).forEach((obj) => {
      obj.scale.set(rect.width, rect.height, 1)
      obj.position.set(
         rect.left + rect.width * 0.5 - sizes.width * 0.5,
         -rect.top - rect.height * 0.5 + sizes.height * 0.5,
         0
      )
   })

   const fov = camera.fov
   let z = (sizes.height / Math.tan(fov * (Math.PI / 360))) * 0.5

   camera.position.set(0, 0, z)
}

export const setTargetToCamera = ({ object, target, camera, sizes }: ThreeToDomParams) => {
   const rect = target.getBoundingClientRect()

   let cameraZ = camera.position.z
   const fov = camera.fov
   let z = (sizes.height / Math.tan(fov * (Math.PI / 360))) * 0.5
   let scale = cameraZ / z

   ;(object instanceof Array ? object : [object]).forEach((obj) => {
      obj.scale.set(rect.width * scale, rect.height * scale, 1)
      obj.position.set(
         (rect.left + rect.width * 0.5 - sizes.width * 0.5) * scale,
         (-rect.top - rect.height * 0.5 + sizes.height * 0.5) * scale,
         0
      )
   })
}
