import '../style.css'
import * as THREE from 'three'
import { GUI } from 'lil-gui'
import Experience from './Experience'

const experience = new Experience(true)

const light = new THREE.AmbientLight(0x404040, 3) // soft white light
experience.scene.add(light)

const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
directionalLight.castShadow = true
directionalLight.position.set(0, 1, 0)
experience.scene.add(directionalLight)

experience.camera.position.z = 5

window.experience = experience

// let cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// let cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
// let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// experience.scene.add(cube)
