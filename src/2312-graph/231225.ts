import '../style.css'
import * as THREE from 'three'
import { ParametricGeometry } from 'three/examples/jsm/Addons.js'
import Sizes from '../utils/Sizes'
import Timer from '../utils/Timer'
import World from '../utils/World'
import { GUI } from 'lil-gui'
import { GuiExtra } from '~/utils/gui-extra'

const timer = new Timer()
const sizes = new Sizes()

THREE.ColorManagement.enabled = true

const world = new World(sizes)
world.renderer.shadowMap.enabled = true
world.renderer.shadowMap.type = THREE.PCFSoftShadowMap
world.camera.position.set(25, 20, 15)

const params = {
    stacks: 50,
    slices: 50,
}

// Lights
const ambientLight = new THREE.AmbientLight('#46a7ec', 1)
const dirLight1 = new THREE.DirectionalLight('#159924', 3)
const dirLight2 = new THREE.DirectionalLight('#387aff', 5)
// dirLight1.castShadow = true
world.scene.add(ambientLight, dirLight1, dirLight2)

dirLight1.position.set(32, 5, -19)
dirLight1.lookAt(new THREE.Vector3(0, 0, 0))
dirLight2.position.set(-50, 20, -9)

// dirLight1.shadow.camera.near = 11
// dirLight1.shadow.camera.far = 40
// dirLight1.shadow.camera.left = -20
// dirLight1.shadow.camera.right = 20
// dirLight1.shadow.camera.top = 20
// dirLight1.shadow.camera.bottom = -20
// dirLight1.shadow.camera.updateProjectionMatrix()

// Geometries
const material = new THREE.MeshStandardMaterial({
    color: '#eeff99',
    side: THREE.DoubleSide,
})
function makeGeometry() {
    const graphGeometry = new ParametricGeometry(
        (u, v, target) => {
            let x = u - 0.5
            let y = v - 0.5
            // const x = u * (params.xMax - params.xMin) + params.xMin
            // const y = v * (params.yMax - params.yMin) + params.yMin
            // // const z = Math.sin(x * y)
            // const z = Math.sqrt(x * x + y * y)
            target.set(x, y, Math.sqrt(x * x + y * y))
        },
        params.stacks,
        params.slices,
    )
    graphGeometry.computeVertexNormals()

    return graphGeometry
}

const graph = new THREE.Mesh(makeGeometry(), material)
graph.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
graph.scale.setScalar(10)
world.scene.add(graph)

function remakeGeometry() {
    graph.geometry.dispose()
    graph.geometry = makeGeometry()
}

// Helpers
const axesHelper = new THREE.AxesHelper(20)
world.scene.add(axesHelper)
axesHelper.visible = false

const dirLight1Helper = new THREE.DirectionalLightHelper(dirLight1, 5)
world.scene.add(dirLight1Helper)
dirLight1Helper.visible = false

const dirLight2Helper = new THREE.DirectionalLightHelper(dirLight2, 5)
world.scene.add(dirLight2Helper)
dirLight2Helper.visible = false

// GUI
const gui = new GuiExtra()
gui.add(axesHelper, 'visible').name('axes helper')
gui.addThreeColor(material, 'color')
const gf = gui.addFolder('graph')

gf.add(params, 'stacks', 0, 200).step(1).onFinishChange(remakeGeometry)
gf.add(params, 'slices', 0, 200).step(1).onFinishChange(remakeGeometry)
gf.addScale(graph, 'scale', 0, 50, 0.1)

const af = gui.addFolder('ambient')
af.addThreeColor(ambientLight, 'color')
af.add(ambientLight, 'intensity')

const lf1 = gui.addFolder('dirLight 1')

lf1.add(dirLight1Helper, 'visible').name('helper')
lf1.add(dirLight1, 'intensity', 0, 10)
lf1.addThreeColor(dirLight1, 'color')
lf1.addVec3(dirLight1, 'position', -50, 50).onChange(() => {
    dirLight1.lookAt(new THREE.Vector3(0, 0, 0))
    dirLight1Helper.update()
})

const lf2 = gui.addFolder('dirLight 2')

lf2.add(dirLight2Helper, 'visible').name('helper')
lf2.add(dirLight2, 'intensity', 0, 10)
lf2.addThreeColor(dirLight2, 'color')
lf2.addVec3(dirLight2, 'position', -50, 50).onChange(() => {
    dirLight2.lookAt(new THREE.Vector3(0, 0, 0))
    dirLight2Helper.update()
})

// const lightShadowFolder = lightFolder.addFolder('Shadow').onChange(() => {
//     dirLight1.shadow.camera.updateProjectionMatrix()
//     dirLight1CameraHelper.update()
// })
// lightShadowFolder
//     .add(dirLight1CameraHelper, 'visible')
//     .name('helper visible')
// lightShadowFolder.add(dirLight1.shadow.camera, 'near', 0, 100)
// lightShadowFolder.add(dirLight1.shadow.camera, 'far', 0, 100)
// lightShadowFolder.add(dirLight1.shadow.camera, 'left', -100, 100)
// lightShadowFolder.add(dirLight1.shadow.camera, 'right', -100, 100)
// lightShadowFolder.add(dirLight1.shadow.camera, 'top', -100, 100)
// lightShadowFolder.add(dirLight1.shadow.camera, 'bottom', -100, 100)
// lightShadowFolder
//     .add(debg, 'shadowMapSize', ['128', '256', '512', '1024', '2048', '4096'])
//     .onChange((val: string) => {
//         let num = +val
//         dirLight1.shadow.map!.dispose()
//         dirLight1.shadow.map = null
//         dirLight1.shadow.mapSize = new THREE.Vector2(num, num)
//         dirLight1.shadow.needsUpdate = true
//     })
// lightShadowFolder.add(dirLight1.shadow, 'bias', 0, 0.01, 0.0001)
// lightShadowFolder.hide()

// lightShadowFolder.add(dirLight1.shadow, 'radius', 0, 100)

function animate() {
    world.render()
}

timer.on('tick', animate)
