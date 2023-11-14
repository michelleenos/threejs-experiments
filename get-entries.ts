import fs from 'fs/promises'
import path from 'path'

const getEntries = async (dirName) => {
   let entries = {}
   const items = await fs.readdir(dirName, { withFileTypes: true })

   for (const item of items) {
      if (item.isDirectory()) {
         entries = {
            ...entries,
            ...(await getEntries(`${dirName}/${item.name}`)),
         }
      } else if (item.name.endsWith('.html')) {
         // entries.push(`${dirName}/${item.name}`)
         entries[`${dirName}/${item.name}`] = path.resolve(__dirname, `${dirName}/${item.name}`)
      }
   }

   return entries
}

export default getEntries
