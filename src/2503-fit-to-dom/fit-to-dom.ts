import * as THREE from 'three'
import '../style.css'
import Sizes from '~/utils/sizes'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import GUI from 'lil-gui'
import vertexShader from './glsl/vert.glsl'
import fragmentShader from './glsl/frag.glsl'

THREE.ColorManagement.enabled = true

const sizes = new Sizes()

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.outputColorSpace = THREE.SRGBColorSpace

const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 300)
camera.position.set(0, 0, 2)
const scene = new THREE.Scene()
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

document.body.appendChild(renderer.domElement)

/**
 * Shapes
 */

let material = new THREE.ShaderMaterial({ fragmentShader, vertexShader })
let box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)
let plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
let bbox = new THREE.Box3()
let boxSize = new THREE.Vector3()
scene.add(plane, box)
plane.visible = false

// const makeShape = () => {
//     if (shape.geometry) {
//         shape.geometry.dispose()
//     }
//     const geo = new THREE.BoxGeometry(params.shapeX, params.shapeY, params.shapeZ)
//     shape.geometry = geo
//     bbox.setFromObject(shape)
//     bbox.getSize(boxSize)
// }
// makeShape()

/**
 * Resize
 */

const onResize = () => {
    console.log('on resize')
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(sizes.pixelRatio)
}

sizes.on('resize', onResize)

onResize()

/**
 * GUI
 */

let gui = new GUI()
let debg = {
    getSizes: function () {
        let shape = this.currentShape === 'box' ? box : plane
        bbox.setFromObject(shape)
        bbox.getSize(boxSize)
    },

    reset: function () {
        let shape = this.currentShape === 'box' ? box : plane

        camera.position.set(0, 0, camera.position.z > 1 ? camera.position.z : 2)
        camera.lookAt(0, 0, 0)
        camera.updateProjectionMatrix()
        shape.rotation.set(0, 0, 0)
        shape.position.set(0, 0, 0)
        shape.scale.set(1, 1, 1)
    },
    setToTarget: function () {
        let shape = this.currentShape === 'box' ? box : plane
        let el = document.querySelector('.dom-shape') as HTMLElement
        let rect = el.getBoundingClientRect()
        this.reset()
        this.getSizes()

        setTimeout(() => {
            let aspect = camera.aspect
            let camZ = camera.position.z - boxSize.z * 0.5
            // let fov = camera.fov
            // let z = (sizes.height / Math.tan(fov * (Math.PI / 360))) * 0.5
            let fov = camera.fov * (Math.PI / 180)
            let z = (sizes.height / Math.tan(fov * 0.5)) * 0.5
            let scale = camZ / z

            shape.scale.set(rect.width * scale, rect.height * scale, 1)
            shape.position.set(
                (rect.left + rect.width * 0.5 - sizes.width * 0.5) * scale,
                (-rect.top - rect.height * 0.5 + sizes.height * 0.5) * scale,
                0,
            )

            // camera.lookAt(shape.position)
            // camera.updateProjectionMatrix()
        })
    },
    setCamera: function () {
        // let shape = this.currentShape === 'box' ? box : plane
        this.reset()
        this.getSizes()

        let fov = camera.fov * (Math.PI / 180)
        let fovh = 2 * Math.atan(Math.tan(fov / 2) * camera.aspect)
        let dx = boxSize.z / 2 + Math.abs(boxSize.x / 2 / Math.tan(fovh / 2))
        let dy = boxSize.z / 2 + Math.abs(boxSize.y / 2 / Math.tan(fov / 2))
        let cameraZ = Math.max(dx, dy)

        camera.position.set(0, 0, cameraZ)
        camera.updateProjectionMatrix()
    },
    setToCamera: function () {
        let shape = this.currentShape === 'box' ? box : plane
        this.reset()
        this.getSizes()
        setTimeout(() => {
            let objectZ = Math.abs(camera.position.z - boxSize.z / 2)
            let fov = camera.fov * (Math.PI / 180)

            let objHeight = 2 * Math.tan(fov / 2) * objectZ
            let objWidth = objHeight * camera.aspect

            shape.scale.set(objWidth, objHeight, 1)
        })
    },

    setToTarget2: function () {
        let shape = this.currentShape === 'box' ? box : plane
        this.reset()
        this.getSizes()

        setTimeout(() => {
            let rect = document
                .querySelector('.dom-shape')!
                .getBoundingClientRect()
            let rectAspect = rect.width / rect.height

            let objectZ = Math.abs(camera.position.z - boxSize.z / 2)
            let fov = camera.fov * (Math.PI / 180)

            let camHeight = 2 * Math.tan(fov / 2) * objectZ
            let camWidth = camHeight * camera.aspect

            let objHeight = (camHeight * rect.height) / sizes.height
            let objWidth = objHeight * rectAspect

            let objLeft = (camWidth * (rect.left - rect.width)) / sizes.width
            shape.position.set(objLeft, 0, 0)

            // let objHeight = 2 * Math.tan(fov / 2) * objectZ
            // let objWidth = objHeight * camera.aspect

            shape.scale.set(objWidth, objHeight, 1)
        })
    },

    currentShape: 'box' as 'box' | 'plane',
}

gui.add(debg, 'setToTarget')
gui.add(debg, 'setToCamera')
gui.add(debg, 'setToTarget2')
// gui.add(debg, 'setCamera')
let boxFolder = gui.addFolder('bounding box')
boxFolder.add(boxSize, 'x').listen().decimals(2).disable()
boxFolder.add(boxSize, 'y').listen().decimals(2).disable()
boxFolder.add(boxSize, 'z').listen().decimals(2).disable()

let shapeFolder = gui.addFolder('shape')
shapeFolder.add(box.scale, 'x').listen().decimals(2).disable()
shapeFolder.add(box.scale, 'y').listen().decimals(2).disable()
shapeFolder.add(box.scale, 'z').listen().decimals(2).disable()
shapeFolder
    .add(box.position, 'x')
    .listen()
    .decimals(2)
    .disable()
    .name('position x')
shapeFolder
    .add(box.position, 'y')
    .listen()
    .decimals(2)
    .disable()
    .name('position y')
shapeFolder
    .add(box.position, 'z')
    .listen()
    .decimals(2)
    .disable()
    .name('position z')

let camFolder = gui.addFolder('camera')
camFolder.add(camera.position, 'x').listen().decimals(2).disable()
camFolder.add(camera.position, 'y').listen().decimals(2).disable()
camFolder.add(camera.position, 'z').listen().decimals(2).disable()
camFolder.add(camera, 'fov', 1, 180).onChange(() => {
    camera.updateProjectionMatrix()
})
camFolder
    .add(camera.rotation, 'x')
    .listen()
    .decimals(2)
    .disable()
    .name('rotation x')
camFolder
    .add(camera.rotation, 'y')
    .listen()
    .decimals(2)
    .disable()
    .name('rotation y')
camFolder
    .add(camera.rotation, 'z')
    .listen()
    .decimals(2)
    .disable()
    .name('rotation z')

gui.add(debg, 'currentShape', ['box', 'plane']).onChange(() => {
    let shape = debg.currentShape === 'box' ? box : plane
    let other = debg.currentShape === 'box' ? plane : box
    shape.visible = true
    other.visible = false
    debg.getSizes()
})

// let shapeFolder = gui.addFolder('shape size').onChange(makeShape)
// shapeFolder.add(params, 'shapeX', 0.1, 10, 0.1)
// shapeFolder.add(params, 'shapeY', 0.1, 10, 0.1)
// shapeFolder.add(params, 'shapeZ', 0.1, 10, 0.1)
/**
 * Animation
 */

const animate = () => {
    renderer.render(scene, camera)
    controls.update()

    requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
