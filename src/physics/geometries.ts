import * as THREE from 'three'
import { random } from '../utils'
import * as CANNON from 'cannon-es'
import { colors } from './setup'

export type PhysicsData = { scale: number; body: CANNON.Body }[]
type minmax = { min: number; max: number }
type positionOpts = { x: minmax; y: minmax; z: minmax }

export const setInstanceItem = (
   i: number,
   instance: THREE.InstancedMesh,
   geometry: 'sphere' | 'box',
   data: PhysicsData,
   world: CANNON.World,
   pos: THREE.Vector3 | positionOpts,
   scaleOpts: minmax = { min: 0.5, max: 1.5 }
) => {
   if (!(pos instanceof THREE.Vector3)) {
      pos = new THREE.Vector3(
         random(pos.x.min, pos.x.max),
         random(pos.y.min, pos.y.max),
         random(pos.z.min, pos.z.max)
      )
   }
   if (data[i]) world.removeBody(data[i].body)

   let scale = random(scaleOpts.min, scaleOpts.max) * 2
   const matrix = new THREE.Matrix4()

   matrix.setPosition(pos)
   matrix.scale(new THREE.Vector3(scale, scale, scale))

   instance.setMatrixAt(i, matrix)
   instance.setColorAt(i, colors[i % colors.length])

   const shape =
      geometry === 'sphere'
         ? new CANNON.Sphere(scale)
         : new CANNON.Box(new CANNON.Vec3(scale * 0.5, scale * 0.5, scale * 0.5))
   const body = new CANNON.Body({ mass: 1, shape })
   body.position.set(pos.x, pos.y, pos.z)

   world.addBody(body)
   data[i] = { scale, body }

   instance.instanceMatrix.needsUpdate = true
   instance.instanceColor && (instance.instanceColor.needsUpdate = true)
}

export const updateInstanceItem = (i: number, instance: THREE.InstancedMesh, data: PhysicsData) => {
   const matrix = new THREE.Matrix4()

   if (!data[i]) {
      console.log(`no data for index ${i} of instance`)
      return
   }

   let { body, scale } = data[i]

   let position = body.position
   let quaternion = body.quaternion

   matrix.compose(
      new THREE.Vector3(position.x, position.y, position.z),
      new THREE.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w),
      new THREE.Vector3(scale, scale, scale)
   )

   instance.setMatrixAt(i, matrix)
   instance.instanceMatrix.needsUpdate = true
}
