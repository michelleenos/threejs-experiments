import { map } from '../../utils'
import { face } from './face-coords'

type Points = {
   bounds: {
      xMin: number
      xMax: number
      yMin: number
      yMax: number
   }
   width: number
   height: number
   coords: [number, number][]
}

const sortPoints = (points: Points, yFirst: boolean = true) => {
   let sorted = [...points.coords]
   sorted.sort((a, b) => {
      if (yFirst) {
         if (a[1] === b[1]) {
            return a[0] - b[0]
         } else {
            return a[1] - b[1]
         }
      } else {
         if (a[0] === b[0]) {
            return a[1] - b[1]
         } else {
            return a[0] - b[0]
         }
      }
   })
   return { ...points, coords: sorted }
}

const removeDuplicates = (points: Points) => {
   let coords: [number, number][] = []
   let prev: [number, number] = [0, 0]

   points.coords.forEach(([x, y], i) => {
      let xPer = map(x, -0.5, 0.5, 0, 1)
      let eased = 1 - Math.pow(1 - xPer, 3)
      let curThreshold = map(eased, 0, 1, 0.01, 0.005)
      if (i === 0) {
         coords.push([x, y])
         prev = [x, y]
      } else {
         if (Math.abs(x - prev[0]) > curThreshold || Math.abs(y - prev[1]) > curThreshold) {
            coords.push([x, y])
         }
         prev = [x, y]
      }
   })
   return { ...points, coords }
}

const mapPoints = (points: Points, newWidth: number) => {
   const { width, height } = points
   const scale = newWidth / width
   let newHeight = height * scale
   let yMin = Infinity
   let yMax = -Infinity
   let xMin = Infinity
   let xMax = -Infinity
   let coords: [number, number][] = []

   points.coords.forEach(([x, y]) => {
      let newX = x * scale - newWidth / 2
      let flipY = height - y
      let newY = flipY * scale - newHeight / 2

      if (newY < yMin) yMin = newY
      if (newY > yMax) yMax = newY
      if (newX < xMin) xMin = newX
      if (newX > xMax) xMax = newX
      coords.push([newX, newY])
   })

   return {
      bounds: {
         xMin,
         xMax,
         yMin,
         yMax,
      },
      width: newWidth,
      height: newHeight,
      coords,
   }
}

const normalizePoints = (points: Points) => {
   const { xMin, xMax, yMin, yMax } = points.bounds
   let coords: [number, number][] = []
   points.coords.forEach(([x, y]) => {
      // let newX = (x - xMin) / (xMax - xMin) + 0.5
      let newY = map(y, yMin, yMax, -0.5, 0.5)
      coords.push([x, newY])
   })

   return {
      ...points,
      bounds: {
         xMin: -0.5,
         xMax: 0.5,
         yMin: -0.5,
         yMax: 0.5,
      },
      coords,
   }
}

let sorted = sortPoints(face, false)
let faceScaled = mapPoints(sorted, 1)
// let noDupes = removeDuplicates(faceScaled)
let normalized = normalizePoints(faceScaled)
