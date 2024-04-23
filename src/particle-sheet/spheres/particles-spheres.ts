import { ParticleSheetBase } from '../particle-sheet-base'
import * as THREE from 'three'
import '../../style.css'

const getGlsl = async (folder: string, file: string) => {
   return await import(`../glsl/${folder}/${file}.glsl`).then((m) => m.default)
}

const experience = new ParticleSheetBase({
   key: 'particles-spheres',
   data: [
      {
         key: 'psp',
         sheets: [
            {
               params: {
                  sheetWidth: 10,
                  sheetHeight: 4,
                  nx: 150,
                  ny: 50,
               },
               material: {
                  vertexShader: await getGlsl('spheres', 'vert'),
                  fragmentShader: await getGlsl('spheres', 'frag'),
                  uniforms: [],
               },
            },
         ],
      },
   ],
})

const { world, clock } = experience

const sphere1 = new THREE.Mesh(
   new THREE.SphereGeometry(1, 32, 32),
   new THREE.MeshBasicMaterial({ color: 0xff0000 })
)

const sphere2 = new THREE.Mesh(
   new THREE.SphereGeometry(1, 32, 32),
   new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
sphere1.position.set(-5, 3, 0)
sphere1.visible = false
sphere2.position.set(5, 3, 0)

world.scene.add(sphere1, sphere2)

experience.createAll()
let particles = experience.particles[0]
particles.setUniforms({
   u_c1: new THREE.Uniform(sphere1.position),
   u_c2: new THREE.Uniform(sphere2.position),
})

const animate = () => {
   let time = clock.getElapsedTime()
   experience.update(time)
   sphere2.position.x = Math.cos(time * 0.2) * 3 - 1
   sphere2.position.y = Math.sin(time * 0.88 + Math.cos(time * 0.3)) * 2
   sphere1.position.x = Math.sin(time * 0.7) * 2 + Math.cos(time * 0.25) * 2
   sphere1.position.y = Math.cos(time * 0.4) * 1.5

   requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
