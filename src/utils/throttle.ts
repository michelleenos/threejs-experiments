// https://github.com/martinstark/throttle-ts/blob/main/src/index.ts
export const throttle = <R, A extends any[]>(
   fn: (...args: A) => R,
   delay: number = 500
): ((...args: A) => R | undefined) => {
   let wait = false
   let timeout: undefined | number
   let storedArgs: A | null = null

   function checkStoredArgs() {
      if (storedArgs === null) {
         wait = false
      } else {
         const val = fn(...storedArgs)
         storedArgs = null
         timeout = window.setTimeout(checkStoredArgs, delay)
         return val
      }
   }

   return (...args: A) => {
      if (wait) {
         storedArgs = args
         return
      }

      const val = fn(...args)
      wait = true
      timeout = window.setTimeout(checkStoredArgs, delay)

      return val
   }
   //   () => {
   //      cancelled = true
   //      clearTimeout(timeout)
   //   },
}
