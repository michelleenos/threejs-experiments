import '../style.css'
import * as THREE from 'three'
import { clamp, map, round } from '../utils'
import GUI from 'lil-gui'

const sizes = {
   width: 800,
   height: 600,
   pixelRatio: window.devicePixelRatio,
}

const params = {
   steps: 10,
   circleBreak: 2,
}

export type ColorCoordOpt = {
   start: number
   end: number
   offset: number
}

export type ColorCoordOpts = {
   red: ColorCoordOpt
   green: ColorCoordOpt
   blue: ColorCoordOpt
}

const colorOpts: ColorCoordOpts = {
   red: {
      start: 0.0,
      end: 0.5,
      offset: 0,
   },
   green: {
      // start: -0.62,
      // end: 0.23,
      start: 0,
      end: 0,
      offset: 0,
   },
   blue: {
      start: 0,
      // end: 1.04,
      // offset: 0.25,
      end: 0,
      offset: 0,
   },
}

const getColorCoordAtPos = (pos: number, opts: ColorCoordOpt) => {
   let { start, end, offset } = opts

   let amt = Math.sin((pos + offset) * Math.PI * 2)
   let val = map(amt, -1, 1, start, end)
   return clamp(val, 0, 1)
}

const getColorAtPos = (pos: number, opts: ColorCoordOpts) => {
   let { red, green, blue } = opts
   return new THREE.Color(
      getColorCoordAtPos(pos, red),
      getColorCoordAtPos(pos, green),
      getColorCoordAtPos(pos, blue)
   ).getHexString()
}

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')!
let resolution = sizes.pixelRatio
canvas.width = sizes.width * resolution
canvas.height = sizes.height * resolution
ctx.scale(resolution, resolution)
canvas.style.width = `${sizes.width}px`
canvas.style.height = `${sizes.height}px`
document.body.appendChild(canvas)

let rectwidthstart = 360
let rectheight = sizes.height * 0.07
let sectionheight = sizes.height * 0.17

const roundToNearestPointFive = (x: number) => {
   return Math.round(x * 2) / 2
}

function makeColorBox(color: 'red' | 'green' | 'blue', step: number) {
   const { steps } = params
   let innerwidth = rectwidthstart / steps
   innerwidth = roundToNearestPointFive(innerwidth)

   let rectwidth = innerwidth * steps
   ctx.save()
   ctx.translate(sizes.width * 0.05, sectionheight * step)

   ctx.beginPath()

   ctx.fillStyle = '#000'
   ctx.font = '20px sans-serif'
   ctx.fillText(color, 0, -25)
   ctx.font = '12px sans-serif'
   ctx.fillText(`start: ${colorOpts[color].start}`, 0, -10, rectwidth * 0.3)
   ctx.fillText(`end: ${colorOpts[color].end}`, rectwidth * 0.4, -10, rectwidth * 0.3)
   ctx.fillText(`offset: ${colorOpts[color].offset}`, rectwidth * 0.8, -10, rectwidth * 0.3)
   ctx.fill()

   ctx.beginPath()
   ctx.strokeStyle = '#000'
   ctx.rect(0, 0, rectwidth, rectheight)
   ctx.stroke()

   for (let i = 0; i < steps; i++) {
      let pos = i / steps
      let x = i * innerwidth

      let amt = getColorCoordAtPos(pos, colorOpts[color])
      ctx.fillStyle =
         color === 'red'
            ? `rgba(255, 0, 0, ${amt})`
            : color === 'green'
            ? `rgba(0, 255, 0, ${amt})`
            : `rgba(0, 0, 255, ${amt})`

      ctx.fillRect(x, 0, innerwidth, rectheight)
   }

   ctx.restore()
}

const makeColorBoxAll = (posY: number) => {
   const { steps } = params
   let innerwidth = rectwidthstart / steps
   innerwidth = roundToNearestPointFive(innerwidth)
   let rectwidth = innerwidth * steps
   ctx.save()
   ctx.translate(sizes.width * 0.05, sectionheight * posY)

   ctx.beginPath()

   ctx.beginPath()
   ctx.strokeStyle = '#000'
   ctx.rect(0, 0, rectwidth, rectheight)
   ctx.stroke()

   for (let i = 0; i < steps; i++) {
      let pos = i / steps
      let x = i * innerwidth

      let colorVal = getColorAtPos(pos, colorOpts)
      ctx.fillStyle = `#${colorVal}`

      ctx.fillRect(x, 0, innerwidth, rectheight)
   }

   ctx.restore()
}

function makeColorCircle() {
   const { steps, circleBreak } = params
   ctx.save()
   ctx.translate(sizes.width * 0.75, sizes.height * 0.6)
   let radius = sizes.width * 0.2
   let circumference = Math.PI * 2 * radius
   let segment = Math.ceil(circumference / steps) - circleBreak

   let innerRadius = radius * 0.5
   let innerCircumference = Math.PI * 2 * innerRadius
   let innerSegment = Math.ceil(innerCircumference / steps) - circleBreak

   for (let i = 0; i < steps; i++) {
      ctx.save()
      let pos = i / steps
      let angle = pos * Math.PI * 2
      ctx.rotate(angle)

      let color = getColorAtPos(pos, colorOpts)
      ctx.fillStyle = `#${color}`

      ctx.beginPath()
      ctx.moveTo(innerSegment * -0.5, innerRadius)
      ctx.lineTo(segment * -0.5, radius)
      ctx.lineTo(segment * 0.5, radius)
      ctx.lineTo(innerSegment * 0.5, innerRadius)
      ctx.fill()

      if (steps < 20) {
         ctx.fillStyle = '#000'
         ctx.fillText(`${round(pos, 2)}`, 0, radius + 10)
      }
      ctx.restore()
   }

   ctx.restore()
}

function draw() {
   ctx.clearRect(0, 0, sizes.width, sizes.height)
   ctx.fillStyle = '#fff'
   ctx.fillRect(0, 0, sizes.width, sizes.height)
   makeColorBox('red', 1)
   makeColorBox('green', 2)
   makeColorBox('blue', 3)
   makeColorBoxAll(4)

   makeColorCircle()
}

draw()

const gui = new GUI()
const f = gui.addFolder('Colors').open()
f.add(colorOpts.red, 'start', -5, 5, 0.01).name('red start')
f.add(colorOpts.red, 'end', -5, 5, 0.01).name('red end')
f.add(colorOpts.red, 'offset', 0, 1, 0.01).name('red offset')
f.add(colorOpts.green, 'start', -5, 5, 0.01).name('green start')
f.add(colorOpts.green, 'end', -5, 5, 0.01).name('green end')
f.add(colorOpts.green, 'offset', 0, 1, 0.01).name('green offset')
f.add(colorOpts.blue, 'start', -5, 5, 0.01).name('blue start')
f.add(colorOpts.blue, 'end', -5, 5, 0.01).name('blue end')
f.add(colorOpts.blue, 'offset', 0, 1, 0.01).name('blue offset')

const f2 = gui.addFolder('etc')
f2.add(params, 'steps', 1, 400, 1)
f2.add(params, 'circleBreak', 0, 10, 0.5)

gui.onChange(() => draw())
