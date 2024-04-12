import fs from 'fs'
import path from 'path'

export const writeFile = (data: any, pathToFile: string, mini = false) => {
  fs.writeFileSync(
    path.join(pathToFile),
    mini ? JSON.stringify(data) : JSON.stringify(data, null, 2)
  )
}

export const readFile = (pathToFile: string) => {
  const fileBuffer = fs.readFileSync(path.join(pathToFile)) as any as string
  return JSON.parse(fileBuffer)
}
