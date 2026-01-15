import '../style.css'
import * as THREE from 'three'
import Sizes from '~/utils/Sizes'

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
// renderer.setClearColor('#000')
renderer.outputColorSpace = THREE.SRGBColorSpace
document.body.appendChild(renderer.domElement)

const sizes = new Sizes()

const scene = new THREE.Scene()

const round = (num: number, places: number) => {
    const mult = Math.pow(10, places)
    return Math.round(num * mult) / mult
}

class TheCamera extends THREE.OrthographicCamera {
    // camWidth = 10
    // camHeight = sizes.height
    camHeight = 100
    aspect = sizes.width / sizes.height
    camWidth = this.camHeight * this.aspect
    camToWindowHeight = sizes.height / this.camHeight
    scrollY = 0
    scrollHeight = 0
    maxScrollY = 0
    maxCamScrollY = 0
    camScrollHeight = 0

    constructor() {
        super()
        this.near = 0.1
        this.far = this.camWidth * 2
        this.onResize()

        window.addEventListener('scroll', this.onScroll)
    }

    onScroll = () => {
        this.scrollY = window.scrollY
        // this.position.y = -this.scrollY
        this.position.y = -this.scrollY / this.camToWindowHeight
    }

    onResize = () => {
        // this.camHeight = sizes.height
        this.aspect = sizes.width / sizes.height
        this.camWidth = this.camHeight * this.aspect
        this.camToWindowHeight = sizes.height / this.camHeight
        this.scrollHeight = document.body.scrollHeight
        this.maxScrollY = this.scrollHeight - sizes.height
        this.maxCamScrollY = this.maxScrollY / this.camToWindowHeight
        this.camScrollHeight = this.scrollHeight / this.camToWindowHeight

        this.left = -this.camWidth / 2
        this.right = this.camWidth / 2
        this.top = this.camHeight / 2
        this.bottom = -this.camHeight / 2
        this.updateProjectionMatrix()
    }
}

const cam = new TheCamera()
cam.position.set(0, 0, cam.camWidth)
scene.add(cam)

const clrs = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
class Boxes {
    count = 6
    step = 0
    boxes: THREE.Mesh[] = []
    // useWindow = false
    constructor() {
        for (let i = 0; i < this.count; i++) {
            const box = createBox(clrs[i % clrs.length])
            this.boxes.push(box)
        }

        this.onResize()
    }

    onResize = () => {
        // if (this.useWindow) {
        //     this.step = sizes.height / this.count
        //     this.boxes.forEach((box, i) => {
        //         box.position.y = sizes.height / 2 - this.step / 2 - this.step * i
        //         box.scale.setScalar(this.step * 0.8)
        //     })
        //     return
        // }
        // this.step = cam.scrollHeight / this.count
        this.step = cam.camScrollHeight / this.count
        this.boxes.forEach((box, i) => {
            // box.position.y = -this.step * i + this.step / 2 - cam.camHeight / 2
            // box.position.x = sizes.width * 0.25
            box.position.y = cam.camHeight / 2 - this.step / 2 - this.step * i
            box.scale.setScalar(50)
        })
    }
}

const createBox = (clr?: string) => {
    const boxGeo = new THREE.BoxGeometry(1, 1, 1)
    const boxMat = new THREE.MeshBasicMaterial({ color: clr || Math.random() * 0xffffff })
    return new THREE.Mesh(boxGeo, boxMat)
}

const boxes = new Boxes()
scene.add(...boxes.boxes)

const infoEl = document.createElement('pre')
infoEl.classList.add('info')
document.body.appendChild(infoEl)

const setInfo = () => {
    infoEl.innerHTML = `
			camWidth: ${round(cam.camWidth, 3)}
			camHeight: ${round(cam.camHeight, 3)}
			windowW: ${sizes.width}
			windowH: ${sizes.height}
			aspect: ${round(cam.aspect, 3)}

			camY: ${round(cam.position.y, 3)}

			camToWindowHeight: ${round(cam.camToWindowHeight, 3)}
			scrollY: ${round(cam.scrollY, 3)}
			scrollHeight: ${round(cam.scrollHeight, 3)}
			maxScrollY: ${round(cam.maxScrollY, 3)}
			camScrollHeight: ${round(cam.camScrollHeight, 3)}
			maxCamScrollY: ${round(cam.maxCamScrollY, 3)}

			boxesCount: ${boxes.count}
			boxesStep: ${round(boxes.step, 3)}
			${boxes.boxes.map((b) => b.position.y).join(', ')}
		`
}

const onResize = () => {
    cam.onResize()
    boxes.onResize()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    setInfo()
}

sizes.on('resize', onResize)

window.addEventListener('scroll', setInfo)

function animate() {
    renderer.render(scene, cam)
    requestAnimationFrame(animate)
}

onResize()
animate()

function ruler(step = 100) {
    let object = new THREE.Object3D()
    var lineMtr = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3, opacity: 1 })

    const points: THREE.Vector3[] = []
    points.push(new THREE.Vector3(-100, 0, 0))
    points.push(new THREE.Vector3(100, 0, 0))

    var geo = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geo, lineMtr)

    var i = 0,
        l = 100
    // object.add(line)
    while (i <= l) {
        // var geoSegm = new THREE.BufferGeometry()
        // geoSegm.vertices.push(new THREE.Vector3(0.1, i, 3))
        // geoSegm.vertices.push(new THREE.Vector3(0, i, 3))
        // var lineSegm = new THREE.Line(geoSegm, lineMtr)
        // object.add(lineSegm)

        let geoSgm = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-100, i * -step, 1),
            new THREE.Vector3(100, i * -step, 1),
        ])
        let lineSgm = new THREE.Line(geoSgm, lineMtr)
        var textSprite = makeTextSprite(
            (i * -step).toString(),
            new THREE.Vector3(0.2, i * -step, 1),
            Math.PI
        )

        let oppGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-100, i * step, 1),
            new THREE.Vector3(100, i * step, 1),
        ])
        var oppSprite = makeTextSprite(
            (i * step).toString(),
            new THREE.Vector3(0.2, i * step, 1),
            Math.PI
        )
        let oppLine = new THREE.Line(oppGeo, lineMtr)

        object.add(lineSgm, textSprite, oppLine, oppSprite)
        i++
    }

    scene.add(line, object)
}
function makeTextSprite(label: string, pos: THREE.Vector3, rot: number) {
    var fontface = 'Arial'
    var fontsize = 100
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')!
    context.font = 'Bold ' + fontsize.toString() + 'px ' + fontface
    var metrics = context.measureText(label)
    // context.rotate(-Math.PI)
    // context.translate(-canvas.width, -canvas.height)
    context.fillStyle = '#fff'
    context.fillText(label, 0, 100)

    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true
    texture.center = new THREE.Vector2(0.5, 0.5)
    // texture.rotation = Math.PI

    var spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        color: 0xffffff,
    })
    var sprite = new THREE.Sprite(spriteMaterial)
    sprite.scale.set(50, 50, 50)
    sprite.position.set(pos.x, pos.y, pos.z)
    return sprite
}

ruler(50)
