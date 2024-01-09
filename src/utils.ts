export const random = (n1 = 1, n2?: number) => {
   if (n2) {
      return Math.random() * (n2 - n1) + n1
   } else {
      return Math.random() * n1
   }
}

export const fract = (x: number) => {
   return x - Math.floor(x)
}

export const clamp = (x: number, min: number, max: number) => {
   return Math.min(Math.max(x, min), max)
}

export const lerp = (x: number, y: number, a: number) => {
   return x * (1 - a) + y * a
}

export const map = (
   value: number,
   start1: number,
   stop1: number,
   start2: number,
   stop2: number
) => {
   return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
}

export const easeInSine = (x: number) => {
   return 1 - Math.cos((x * Math.PI) / 2)
}

export const easeOutSine = (x: number): number => {
   return Math.sin((x * Math.PI) / 2)
}

export const easeOutQuad = (x: number): number => {
   return 1 - (1 - x) * (1 - x)
}

export const easeInQuart = (x: number): number => {
   return x * x * x * x
}
