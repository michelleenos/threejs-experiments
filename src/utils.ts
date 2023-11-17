export const random = (n1 = 1, n2?: number) => {
   if (n2) {
      return Math.random() * (n2 - n1) + n1
   } else {
      return Math.random() * n1
   }
}
