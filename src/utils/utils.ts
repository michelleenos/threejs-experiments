function random(): number
function random(max: number): number
function random(minOrMax: number, max: number): number
function random<T>(array: T[]): T

function random<T>(numOrArray?: number | T[], max?: number) {
   if (Array.isArray(numOrArray)) {
      return numOrArray[Math.floor(Math.random() * numOrArray.length)]
   }
   if (numOrArray === undefined) {
      return Math.random()
   }
   if (max === undefined) {
      return Math.random() * numOrArray
   }
   return Math.random() * (max - numOrArray) + numOrArray
}

export { random }
