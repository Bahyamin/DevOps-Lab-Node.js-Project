import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import express from 'express'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const pkgPath = join(__dirname, '../../../package.json')
const pkg = JSON.parse(readFileSync(pkgPath,'utf8'))

router.get('/version', (req, res) => {
  res.json({
    version: pkg.version
  })
})

export default router

